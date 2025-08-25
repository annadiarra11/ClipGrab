import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { videoDataSchema, downloadRequestSchema } from "@shared/schema";
import { z } from "zod";

// TikTok API library - Using '@tobyg74/tiktok-api-dl'
import { Downloader } from "@tobyg74/tiktok-api-dl";

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

// Helper function to extract thumbnail URL robustly
// Adjusted to tiktok-dl's common output structure
const getThumbnail = (data: any): string => {
  // Prioritize video cover URLs
  const coverUrls =
    getProp(data, "cover", []) || getProp(data, "thumbnail", []);
  if (Array.isArray(coverUrls) && coverUrls.length > 0) {
    return coverUrls[0]; // Take the first available cover URL
  }

  // tiktok-dl often provides a single 'cover_url' or similar directly
  const directCover =
    getProp(data, "cover_url", "") || getProp(data, "display_url", "");
  if (
    directCover &&
    typeof directCover === "string" &&
    directCover.startsWith("http")
  ) {
    return directCover;
  }

  // Fallback to author avatar if no video cover is found (less ideal)
  const authorAvatar = getProp(data, "author.avatar", "");
  if (
    authorAvatar &&
    typeof authorAvatar === "string" &&
    authorAvatar.startsWith("http")
  ) {
    return authorAvatar;
  }

  return ""; // Return empty string if no suitable thumbnail is found
};

// Helper function to extract duration and format it
// Adjusted to tiktok-dl's common output structure
const getDuration = (data: any): string => {
  let durationSeconds = 0;

  // tiktok-dl often provides duration in seconds directly or in milliseconds under 'duration' or 'video_info.duration'
  durationSeconds =
    getProp(data, "duration", 0) || getProp(data, "video_info.duration", 0); // Check for nested duration

  // If the value is very large, it's likely milliseconds, convert to seconds
  if (durationSeconds > 10000) {
    // Using a higher threshold to avoid converting already-seconds values
    durationSeconds = Math.floor(durationSeconds / 1000);
  } else {
    durationSeconds = Math.floor(durationSeconds); // Assume it's already in seconds or small value
  }

  if (durationSeconds > 0) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = (durationSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }
  return "0:15"; // Default TikTok length if no duration found
};

// Helper function to extract view count and format it
// Adjusted to tiktok-dl's common output structure
const getViews = (data: any): string => {
  let viewCount = 0;

  // tiktok-dl often provides stats directly or nested
  viewCount =
    getProp(data, "stats.playCount", 0) || // Primary for tiktok-dl
    getProp(data, "play_count", 0) ||
    getProp(data, "viewCount", 0);

  // Ensure viewCount is a number
  if (typeof viewCount === "string") {
    viewCount = parseInt(viewCount, 10) || 0;
  }

  if (viewCount > 0) {
    return formatViews(viewCount);
  }
  return "0"; // Default to "0" if no views found
};

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

      // Use the new Downloader library
      let result;
      try {
        result = await Downloader(url, {
          version: "v1", // Required for this API
        });
      } catch (error) {
        console.error("Error from Downloader library:", error);
        return res.status(500).json({
          error:
            "Failed to communicate with TikTok API. Please try again later.",
        });
      }

      if (!result || !result.result) {
        return res.status(400).json({
          error:
            "Failed to extract video data. Please check the URL and try again. (No results from API)",
        });
      }

      // The Downloader API returns a different structure
      const data = result.result as any;

      // Extract video URLs - tiktok-dl often provides direct URLs
      let hdUrl =
        getProp(data, "video.noWatermark", "") || getProp(data, "video.hd", ""); // Prioritize no watermark HD
      let sdUrl =
        getProp(data, "video.noWatermark", "") ||
        getProp(data, "video.sd", "") ||
        getProp(data, "video.hd", ""); // Fallback for SD
      let audioUrl =
        getProp(data, "music.url", "") || getProp(data, "audio", ""); // Direct audio URL

      // If no noWatermark/hd/sd is found, check for a generic 'video' URL
      if (!hdUrl && getProp(data, "video")) {
        hdUrl = getProp(data, "video", "");
        sdUrl = getProp(data, "video", "");
      }

      // Use the new robust helper functions for thumbnail, duration, and views
      const thumbnail = getThumbnail(data);
      const duration = getDuration(data);
      const views = getViews(data);

      const videoData = {
        id: String(data.id || Date.now()), // tiktok-dl uses 'id'
        title: String(data.description || data.title || "TikTok Video"), // tiktok-dl uses 'description'
        author: String(
          data.author?.unique_id || data.author?.nickname || "Unknown",
        ).replace("@", ""),
        duration: duration,
        views: views,
        thumbnail: thumbnail,
        downloadUrls: {
          hd: String(hdUrl),
          sd: String(sdUrl),
          audio: String(audioUrl),
        },
      };

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
      console.error("Full error during /api/extract:", error); // Log the full error for debugging
      res.status(500).json({
        error:
          "Failed to process video. Please ensure the URL is a valid TikTok video link. " +
          (error as Error).message,
      });
    }
  });

  // Download video file
  app.get("/api/download", async (req: Request, res: Response) => {
    try {
      const { url, quality = "hd" } = req.query;

      if (!url || typeof url !== "string") {
        return res.status(400).json({ error: "Video URL is required" });
      }

      // Get cached video data
      const videoData = await storage.getCachedVideoData(url as string);
      if (!videoData) {
        return res.status(404).json({
          error: "Video data not found. Please extract the video first.",
        });
      }

      let downloadUrl: string | undefined;
      let filename: string;
      let contentType: string;

      switch (quality) {
        case "hd":
          downloadUrl = videoData.downloadUrls.hd;
          filename = `${videoData.id}_hd.mp4`;
          contentType = "video/mp4";
          break;
        case "sd":
          downloadUrl = videoData.downloadUrls.sd || videoData.downloadUrls.hd;
          filename = `${videoData.id}_sd.mp4`;
          contentType = "video/mp4";
          break;
        case "audio":
          downloadUrl = videoData.downloadUrls.audio;
          filename = `${videoData.id}_audio.mp3`;
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

      // Return direct download URL for instant downloads
      res.json({
        downloadUrl: downloadUrl,
        filename: filename,
        contentType: contentType,
      });
    } catch (error) {
      console.error("Error downloading video:", error); // Log the full error for debugging
      res.status(500).json({
        error: "Failed to download video. Please try again.",
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
