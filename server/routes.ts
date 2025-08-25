import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { videoDataSchema, downloadRequestSchema } from "@shared/schema";
import { z } from "zod";

// TikTok API library
import TikTokScraper from "@tobyg74/tiktok-api-dl";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Extract TikTok video data
  app.post("/api/extract", async (req: Request, res: Response) => {
    try {
      const { url } = downloadRequestSchema.pick({ url: true }).parse(req.body);
      
      // Check cache first
      const cached = await storage.getCachedVideoData(url);
      if (cached) {
        return res.json(cached);
      }

      // Extract video data using TikTok API
      const result = await TikTokScraper.Downloader(url, {
        version: "v3" // Try v3 for better metadata
      });

      if (!result.status || !result.result) {
        return res.status(400).json({ 
          error: "Failed to extract video data. Please check the URL and try again." 
        });
      }

      const data = result.result as any;
      
      // Helper function to get string from array or string
      const getStringFromArrayOrString = (value: any): string => {
        if (Array.isArray(value)) {
          return value[0] || "";
        }
        return value || "";
      };

      // Extract video URLs properly
      const hdUrl = getStringFromArrayOrString(data.video?.playAddr) || getStringFromArrayOrString(data.video) || "";
      const sdUrl = getStringFromArrayOrString(data.video?.playAddr) || getStringFromArrayOrString(data.video) || hdUrl;
      const audioUrl = getStringFromArrayOrString(data.music?.playUrl) || getStringFromArrayOrString(data.music) || "";

      console.log("Full API response structure:", JSON.stringify(data, null, 2));

      const videoData = {
        id: String(data.aweme_id || data.id || Date.now()),
        title: String(data.desc || data.title || data.description || "TikTok Video"),
        author: String(data.author?.nickname || data.author?.unique_id || data.author?.username || data.nickname || "Unknown"),
        duration: data.duration ? `${Math.floor(data.duration / 60)}:${(data.duration % 60).toString().padStart(2, '0')}` : (data.video_duration ? `${Math.floor(data.video_duration / 60)}:${(data.video_duration % 60).toString().padStart(2, '0')}` : "0:00"),
        views: String(data.statistics?.play_count ? formatViews(data.statistics.play_count) : (data.play_count ? formatViews(data.play_count) : (data.view_count ? formatViews(data.view_count) : "0"))),
        thumbnail: String(data.cover || data.thumbnail || data.video?.cover || data.video?.originCover || data.origin_cover || ""),
        downloadUrls: {
          hd: String(hdUrl),
          sd: String(sdUrl || hdUrl),
          audio: String(audioUrl)
        }
      };

      // Validate and cache the data
      const validatedData = videoDataSchema.parse(videoData);
      await storage.cacheVideoData(url, validatedData);

      res.json(validatedData);
    } catch (error) {
      console.error("Video extraction error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Invalid request data", 
          details: error.errors 
        });
      }
      res.status(500).json({ 
        error: "Failed to process video. Please ensure the URL is a valid TikTok video link." 
      });
    }
  });

  // Download video file
  app.get("/api/download", async (req: Request, res: Response) => {
    try {
      const { url, quality = 'hd' } = req.query;
      
      if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: "Video URL is required" });
      }

      // Get cached video data
      const videoData = await storage.getCachedVideoData(url as string);
      if (!videoData) {
        return res.status(404).json({ 
          error: "Video data not found. Please extract the video first." 
        });
      }

      let downloadUrl: string | undefined;
      let filename: string;
      let contentType: string;

      switch (quality) {
        case 'hd':
          downloadUrl = videoData.downloadUrls.hd;
          filename = `${videoData.id}_hd.mp4`;
          contentType = 'video/mp4';
          break;
        case 'sd':
          downloadUrl = videoData.downloadUrls.sd || videoData.downloadUrls.hd;
          filename = `${videoData.id}_sd.mp4`;
          contentType = 'video/mp4';
          break;
        case 'audio':
          downloadUrl = videoData.downloadUrls.audio;
          filename = `${videoData.id}_audio.mp3`;
          contentType = 'audio/mpeg';
          break;
        default:
          return res.status(400).json({ error: "Invalid quality option" });
      }

      if (!downloadUrl) {
        return res.status(404).json({ 
          error: `${quality.toUpperCase()} quality not available for this video` 
        });
      }

      // Stream the video file
      const fetch = (await import('node-fetch')).default;
      const response = await fetch(downloadUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch video: ${response.statusText}`);
      }

      // Set appropriate headers for download
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');

      // Stream the response
      if (response.body) {
        response.body.pipe(res);
      } else {
        throw new Error('No response body');
      }

    } catch (error) {
      console.error("Download error:", error);
      res.status(500).json({ 
        error: "Failed to download video. Please try again." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function formatViews(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K';
  }
  return count.toString();
}
