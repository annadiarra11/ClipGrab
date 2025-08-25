import { useState } from "react";
import { Download, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { VideoData } from "@shared/schema";

interface VideoDownloaderProps {
  onVideoExtracted: (data: VideoData, url: string) => void;
}

export function VideoDownloader({ onVideoExtracted }: VideoDownloaderProps) {
  const [url, setUrl] = useState("");
  const { t } = useLanguage();
  const { toast } = useToast();

  const extractMutation = useMutation({
    mutationFn: async (videoUrl: string) => {
      const response = await apiRequest("POST", "/api/extract", { url: videoUrl });
      return response.json();
    },
    onSuccess: (data: VideoData) => {
      onVideoExtracted(data, url);
      toast({
        title: "Video extracted successfully!",
        description: "Choose your preferred quality to download.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to extract video. Please check the URL and try again.",
        variant: "destructive",
      });
    },
  });

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a TikTok URL",
        variant: "destructive",
      });
      return;
    }

    if (!url.includes('tiktok.com')) {
      toast({
        title: "Error",
        description: "Please enter a valid TikTok URL",
        variant: "destructive",
      });
      return;
    }

    extractMutation.mutate(url.trim());
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-tiktok-dark mb-6">
          {t.heroTitle.split('Without Watermark')[0]}
          <span className="gradient-text">Without Watermark</span>
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          {t.heroSubtitle}
        </p>
        
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardContent className="p-8">
            <form onSubmit={handleDownload} className="space-y-6">
              <div className="relative">
                <Input
                  type="url"
                  placeholder={t.urlPlaceholder}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="text-lg py-4 pr-32 border-2 focus:border-tiktok-pink"
                  disabled={extractMutation.isPending}
                  data-testid="url-input"
                />
                <Button
                  type="submit"
                  disabled={extractMutation.isPending}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 gradient-tiktok text-white font-semibold hover:shadow-lg transition-all duration-300"
                  data-testid="download-button"
                >
                  {extractMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  {t.download}
                </Button>
              </div>
              
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-tiktok-success" />
                  <span>{t.noWatermark}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-tiktok-success" />
                  <span>{t.hdQuality}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-tiktok-success" />
                  <span>{t.free}</span>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
