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
      
      // Skip cache for debugging - get fresh data
      // const cached = await storage.getCachedVideoData(url);
      // if (cached) {
      //   return res.json(cached);
      // }

      // Extract video data using TikTok API - try multiple versions for best compatibility
      let result;
      let data;
      
      try {
        // Try v2 first for more complete metadata
        result = await TikTokScraper.Downloader(url, {
          version: "v2"
        });
        
        if (!result.status || !result.result) {
          // Fallback to v3 if v2 fails
          result = await TikTokScraper.Downloader(url, {
            version: "v3"
          });
        }
      } catch (error) {
        // Last fallback to v1
        result = await TikTokScraper.Downloader(url, {
          version: "v1"
        });
      }

      if (!result.status || !result.result) {
        return res.status(400).json({ 
          error: "Failed to extract video data. Please check the URL and try again." 
        });
      }

      data = result.result as any;

      // Extract video URLs - support multiple API versions
      let hdUrl = "";
      let sdUrl = "";
      let audioUrl = "";
      let thumbnail = "";
      let duration = "";
      let views = "";

      // Handle different API response formats
      if (data.videoHD || data.videoSD) {
        // v3 format
        hdUrl = data.videoHD || "";
        sdUrl = data.videoSD || data.videoHD || "";
        audioUrl = data.audio || data.music || "";
        thumbnail = data.cover || data.thumbnail || data.author?.avatar || "";
      } else if (data.video) {
        // v2/v1 format
        if (Array.isArray(data.video)) {
          hdUrl = data.video[0] || "";
          sdUrl = data.video[1] || data.video[0] || "";
        } else {
          hdUrl = data.video.playAddr || data.video || "";
          sdUrl = data.video.downloadAddr || hdUrl;
        }
        audioUrl = data.music?.playUrl || data.music || "";
        thumbnail = data.cover || data.thumbnail || data.video?.cover || data.video?.originCover || data.origin_cover || "";
      }

      // Extract duration properly - TikTok API often provides duration in milliseconds
      if (data.duration) {
        const durationSeconds = data.duration > 1000 ? Math.floor(data.duration / 1000) : Math.floor(data.duration);
        duration = `${Math.floor(durationSeconds / 60)}:${(durationSeconds % 60).toString().padStart(2, '0')}`;
      } else if (data.video_duration) {
        const durationSeconds = data.video_duration > 1000 ? Math.floor(data.video_duration / 1000) : Math.floor(data.video_duration);
        duration = `${Math.floor(durationSeconds / 60)}:${(durationSeconds % 60).toString().padStart(2, '0')}`;
      } else if (data.music?.duration) {
        const durationSeconds = data.music.duration > 1000 ? Math.floor(data.music.duration / 1000) : Math.floor(data.music.duration);
        duration = `${Math.floor(durationSeconds / 60)}:${(durationSeconds % 60).toString().padStart(2, '0')}`;
      } else {
        duration = "0:15"; // Default TikTok length
      }

      // Extract view count properly - try multiple possible fields
      const viewCount = data.statistics?.play_count || 
                       data.play_count || 
                       data.stats?.playCount || 
                       data.stats?.play_count ||
                       data.playCount ||
                       data.view_count ||
                       data.viewCount ||
                       0;
      
      if (viewCount > 0) {
        views = formatViews(viewCount);
      } else {
        views = "0";
      }

      const videoData = {
        id: String(data.aweme_id || data.id || Date.now()),
        title: String(data.desc || data.title || data.description || "TikTok Video"),
        author: String(data.author?.nickname || data.author?.unique_id || data.author?.username || data.nickname || "Unknown").replace('@', ''),
        duration: duration,
        views: views,
        thumbnail: thumbnail,
        downloadUrls: {
          hd: String(hdUrl),
          sd: String(sdUrl),
          audio: String(audioUrl)
        }
      };

      // Validate and cache the data
      const validatedData = videoDataSchema.parse(videoData);
      await storage.cacheVideoData(url, validatedData);

      res.json(validatedData);
    } catch (error) {
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

      // Return direct download URL for instant downloads
      res.json({
        downloadUrl: downloadUrl,
        filename: filename,
        contentType: contentType
      });

    } catch (error) {
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
