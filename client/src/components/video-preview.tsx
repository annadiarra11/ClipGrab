import { useState } from "react";
import { Download, Play, Video, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import type { VideoData } from "@shared/schema";

interface VideoPreviewProps {
  videoData: VideoData;
  originalUrl: string;
}

export function VideoPreview({ videoData, originalUrl }: VideoPreviewProps) {
  const [downloading, setDownloading] = useState<string | null>(null);
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleDownload = async (quality: 'hd' | 'sd' | 'audio') => {
    try {
      setDownloading(quality);
      
      const response = await fetch(`/api/download?url=${encodeURIComponent(originalUrl)}&quality=${quality}`);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Download failed');
      }

      const data = await response.json();
      
      // Create direct download link
      const a = document.createElement('a');
      a.href = data.downloadUrl;
      a.download = data.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast({
        title: "Download started!",
        description: "Your video is being downloaded.",
      });
    } catch (error: any) {
      toast({
        title: "Download failed",
        description: error.message || "Failed to download video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDownloading(null);
    }
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8" data-testid="video-preview">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl overflow-hidden">
          <div className="aspect-video bg-gray-100 relative">
            {videoData.thumbnail ? (
              <img 
                src={videoData.thumbnail}
                alt="TikTok video thumbnail" 
                className="w-full h-full object-cover"
                data-testid="video-thumbnail"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <Video className="h-16 w-16 text-gray-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                <Play className="h-6 w-6 text-tiktok-pink ml-1" />
              </div>
            </div>
          </div>
          
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg text-tiktok-dark mb-2" data-testid="video-title">
              {videoData.title}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
              <span data-testid="video-author">@{videoData.author}</span>
              <span data-testid="video-duration">{videoData.duration}</span>
              <span data-testid="video-views">{videoData.views} {t.views}</span>
            </div>
            
            <div className="space-y-3">
              {videoData.downloadUrls.hd && (
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Video className="h-5 w-5 text-tiktok-pink" />
                    <div>
                      <div className="font-medium">{t.hdVideo}</div>
                      <div className="text-sm text-gray-500">HD • MP4</div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDownload('hd')}
                    disabled={downloading === 'hd'}
                    className="bg-tiktok-pink text-white font-semibold hover:bg-opacity-90 transition-colors"
                    data-testid="download-hd"
                  >
                    {downloading === 'hd' ? 'Downloading...' : t.download}
                  </Button>
                </div>
              )}
              
              {videoData.downloadUrls.sd && (
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Video className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium">{t.standardVideo}</div>
                      <div className="text-sm text-gray-500">SD • MP4</div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDownload('sd')}
                    disabled={downloading === 'sd'}
                    variant="outline"
                    className="font-semibold hover:bg-gray-100 transition-colors"
                    data-testid="download-sd"
                  >
                    {downloading === 'sd' ? 'Downloading...' : t.download}
                  </Button>
                </div>
              )}
              
              {videoData.downloadUrls.audio ? (
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Music className="h-5 w-5 text-tiktok-cyan" />
                    <div>
                      <div className="font-medium">{t.audioOnly}</div>
                      <div className="text-sm text-gray-500">MP3 • 128kbps</div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDownload('audio')}
                    disabled={downloading === 'audio'}
                    className="bg-tiktok-cyan text-white font-semibold hover:bg-opacity-90 transition-colors"
                    data-testid="download-audio"
                  >
                    {downloading === 'audio' ? 'Downloading...' : t.download}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg opacity-50">
                  <div className="flex items-center space-x-3">
                    <Music className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium">{t.audioOnly}</div>
                      <div className="text-sm text-gray-500">Not available</div>
                    </div>
                  </div>
                  <Button
                    disabled={true}
                    variant="outline"
                    className="font-semibold"
                    data-testid="download-audio-disabled"
                  >
                    Not Available
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
