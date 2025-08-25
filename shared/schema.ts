import { z } from "zod";

export const videoDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  duration: z.string(),
  views: z.string(),
  thumbnail: z.string(),
  downloadUrls: z.object({
    hd: z.string().optional(),
    sd: z.string().optional(),
    audio: z.string().optional(),
  }),
});

export const downloadRequestSchema = z.object({
  url: z.string().url(),
  quality: z.enum(['hd', 'sd', 'audio']).default('hd'),
});

export type VideoData = z.infer<typeof videoDataSchema>;
export type DownloadRequest = z.infer<typeof downloadRequestSchema>;
