import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { videoDataSchema, downloadRequestSchema } from "@shared/schema";
import { z } from "zod";
import fetch from "node-fetch";
import { execFile } from "child_process";
import util from "util"; // For promisify

// Promisify execFile for async/await usage
const execFilePromise = util.promisify(execFile);

// Helper to safely get nested property with a default value
const getProp = (obj: any, path: string, defaultValue: any = undefined) => {
  const parts = path.split(".");
  let current = obj;
  for (const part of parts) {
    if (current === null || typeof current === "undefined") {
      return defaultValue;
    }
    current = current[part];
  }
  return current === null || typeof current === "undefined"
    ? defaultValue
    : current;
};

// Helper function to extract thumbnail URL from yt-dlp output
const getThumbnail = (data: any): string => {
  if (
    data.thumbnails &&
    Array.isArray(data.thumbnails) &&
    data.thumbnails.length > 0
  ) {
    // yt-dlp usually provides multiple thumbnails, often sorted by quality/size.
    // Try to get a reasonably sized one, or the last (often highest res)
    const bestThumbnail =
      data.thumbnails.find((t: any) => t.width && t.width >= 720) ||
      data.thumbnails.find((t: any) => t.width && t.width >= 480) ||
      data.thumbnails[data.thumbnails.length - 1]; // Fallback to the largest available
    if (bestThumbnail && bestThumbnail.url) {
      return bestThumbnail.url;
    }
  }
  // Fallback to a generic 'thumbnail' or 'cover' if present at the top level
  const directThumbnail =
    getProp(data, "thumbnail", "") || getProp(data, "cover", "");
  if (
    directThumbnail &&
    typeof directThumbnail === "string" &&
    directThumbnail.startsWith("http")
  ) {
    return directThumbnail;
  }
  return "";
};

// Helper function to extract duration from yt-dlp output and format it
const getDuration = (data: any): string => {
  const durationSeconds = getProp(data, "duration", 0); // yt-dlp duration is in seconds
  if (durationSeconds > 0) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = (durationSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }
  return "0:15"; // Default TikTok length if no duration found
};

// Helper function to extract view count from yt-dlp output and format it
const getViews = (data: any): string => {
  const viewCount = getProp(data, "view_count", 0); // yt-dlp view_count is direct
  if (viewCount > 0) {
    return formatViews(viewCount);
  }
  return "0";
};

// Function to get fresh video data (metadata and direct download URLs) using yt-dlp
async function getFreshVideoData(tiktokUrl: string) {
  let ytDlpOutput;
  try {
    const { stdout } = await execFilePromise(
      "yt-dlp",
      ["--no-warnings", "--dump-json", tiktokUrl],
      { maxBuffer: 1024 * 1024 * 10 },
    ); // 10MB buffer
    ytDlpOutput = JSON.parse(stdout);
  } catch (execError: any) {
    console.error(
      "Error running yt-dlp to get fresh data:",
      execError.message,
      execError.stderr,
    );
    throw new Error(`yt-dlp failed: ${execError.stderr || execError.message}`);
  }

  const data = ytDlpOutput;

  let hdUrl = "";
  let sdUrl = "";
  let audioUrl = "";

  if (data.formats && Array.isArray(data.formats)) {
    // Filter for video streams (vcodec not 'none' and preferable without DRM)
    // Also, prioritize formats that explicitly state 'no_watermark' or are combined.
    const videoFormats = data.formats
      .filter(
        (f: any) =>
          f.vcodec !== "none" &&
          f.url &&
          !f.protocol.startsWith("m3u8") &&
          !f.protocol.startsWith("dash") &&
          !f.format_note?.toLowerCase().includes("drm"),
      )
      .sort((a: any, b: any) => {
        // Custom sort: Prioritize formats without watermark, then by height
        const aNoWatermark =
          a.format_note?.toLowerCase().includes("watermark") === false ||
          a.format_note === null ||
          a.format_id?.toLowerCase().includes("nowm");
        const bNoWatermark =
          b.format_note?.toLowerCase().includes("watermark") === false ||
          b.format_note === null ||
          b.format_id?.toLowerCase().includes("nowm");

        if (aNoWatermark && !bNoWatermark) return -1;
        if (!aNoWatermark && bNoWatermark) return 1;

        return (b.height || 0) - (a.height || 0); // Then by height
      });

    // Filter for audio-only streams (acodec not 'none' and vcodec is 'none')
    const audioOnlyFormats = data.formats
      .filter(
        (f: any) =>
          f.acodec !== "none" &&
          f.vcodec === "none" &&
          f.url &&
          !f.protocol.startsWith("m3u8") &&
          !f.protocol.startsWith("dash"),
      )
      .sort((a: any, b: any) => (b.abr || 0) - (a.abr || 0));

    // Get HD URL: Highest resolution video format
    if (videoFormats.length > 0) {
      hdUrl = videoFormats[0].url;

      // Get SD URL: Find a format around 480p/360p, distinct from HD if possible
      const sdFormat = videoFormats.find(
        (f: any) =>
          (f.height || 0) <= 720 && (f.height || 0) >= 360 && f.url !== hdUrl,
      );
      sdUrl = (sdFormat && sdFormat.url) || hdUrl; // Fallback to HD if no distinct SD found
    }

    // Get Audio URL: Best quality audio-only format
    if (audioOnlyFormats.length > 0) {
      audioUrl = audioOnlyFormats[0].url;
    }
  }

  const thumbnail = getThumbnail(data);
  const duration = getDuration(data);
  const views = getViews(data);

  return {
    id: String(data.id || Date.now()), // yt-dlp provides 'id'
    title: String(data.title || "TikTok Video"), // yt-dlp provides 'title'
    author: String(data.uploader || data.uploader_id || "Unknown").replace(
      "@",
      "",
    ),
    duration: duration,
    views: views,
    thumbnail: thumbnail,
    downloadUrls: {
      hd: String(hdUrl),
      sd: String(sdUrl),
      audio: String(audioUrl),
    },
    // downloadHeaders are NOT returned here as we are not proxying
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Extract TikTok video data - This endpoint gets fresh metadata and download URLs
  app.post("/api/extract", async (req: Request, res: Response) => {
    try {
      const { url } = downloadRequestSchema.pick({ url: true }).parse(req.body);

      // Try to get cached data first for quicker response on initial display
      const cached = await storage.getCachedVideoData(url);
      if (cached) {
        return res.json(cached);
      }

      // If not cached, get fresh data from yt-dlp
      const videoData = await getFreshVideoData(url);

      // Validate and cache the data
      const validatedData = videoDataSchema.parse(videoData);
      await storage.cacheVideoData(url, validatedData);

      res.json(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid request data",
          details: error.errors,
        });
      }
      console.error("Full error during /api/extract:", error);
      res.status(500).json({
        error:
          "Failed to process video. Please ensure the URL is a valid TikTok video link and yt-dlp is correctly configured. Detailed error: " +
          (error instanceof Error ? error.message : String(error)),
      });
    }
  });

  // Download video file - This endpoint will return the direct download URL in JSON for client-side download
  app.get("/api/download", async (req: Request, res: Response) => {
    try {
      const { url, quality = "hd" } = req.query;

      if (!url || typeof url !== "string") {
        return res.status(400).json({ error: "Video URL is required" });
      }

      let freshVideoData;
      try {
        // IMPORTANT: Get fresh video data with latest download URLs right before download request
        freshVideoData = await getFreshVideoData(url);
      } catch (error: any) {
        console.error(
          "Error getting fresh video data for download:",
          error.message,
        );
        return res.status(500).json({
          error:
            "Failed to fetch up-to-date video information for download. Please try again.",
          details: error.message,
        });
      }

      let downloadUrl: string | undefined;
      let filename: string;
      let contentType: string;

      switch (quality) {
        case "hd":
          downloadUrl = freshVideoData.downloadUrls.hd;
          filename = `${freshVideoData.id}_hd.mp4`;
          contentType = "video/mp4";
          break;
        case "sd":
          downloadUrl =
            freshVideoData.downloadUrls.sd || freshVideoData.downloadUrls.hd;
          filename = `${freshVideoData.id}_sd.mp4`;
          contentType = "video/mp4";
          break;
        case "audio":
          downloadUrl = freshVideoData.downloadUrls.audio;
          filename = `${freshVideoData.id}_audio.mp3`;
          contentType = "audio/mpeg";
          break;
        default:
          return res.status(400).json({ error: "Invalid quality option" });
      }

      if (!downloadUrl) {
        return res.status(404).json({
          error: `${quality.toUpperCase()} quality not available for this video`,
        });
      }

      // Stream the video content with proper download headers
      try {
        const videoResponse = await fetch(downloadUrl);
        
        if (!videoResponse.ok) {
          throw new Error(`Failed to fetch video: ${videoResponse.status}`);
        }

        // Set proper headers to force download
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', contentType);
        
        // Set content length if available
        const contentLength = videoResponse.headers.get('content-length');
        if (contentLength) {
          res.setHeader('Content-Length', contentLength);
        }

        // Stream the video content directly to the response
        if (videoResponse.body) {
          videoResponse.body.pipe(res);
        } else {
          throw new Error('No video content received');
        }
      } catch (streamError) {
        console.error("Error streaming video:", streamError);
        res.status(500).json({
          error: "Failed to stream video content. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error in /api/download route (outer try-catch):", error);
      res.status(500).json({
        error:
          "An unexpected error occurred during download processing. Please try again. Detailed error: " +
          (error instanceof Error ? error.message : String(error)),
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function formatViews(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M";
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K";
  }
  return count.toString();
}
