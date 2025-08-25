import { useState } from "react";
import { Download, Video, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { VideoDownloader } from "@/components/video-downloader";
import { VideoPreview } from "@/components/video-preview";
import { useLanguage } from "@/hooks/use-language";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { VideoData } from "@shared/schema";

export default function Home() {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [originalUrl, setOriginalUrl] = useState("");
  const { t } = useLanguage();

  const handleVideoExtracted = (data: VideoData, url: string) => {
    setVideoData(data);
    setOriginalUrl(url);
  };

  return (
    <div className="min-h-screen bg-white">
      <VideoDownloader 
        onVideoExtracted={handleVideoExtracted} 
      />
      
      {videoData && (
        <VideoPreview videoData={videoData} originalUrl={originalUrl} />
      )}

      {/* Features Section */}
      <section className="py-16 bg-tiktok-neutral">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-tiktok-dark mb-4">
              {t.featuresTitle}
            </h3>
            <p className="text-xl text-gray-600">{t.featuresSubtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center shadow-sm">
              <CardContent className="p-6">
                <div className="w-16 h-16 gradient-tiktok rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3">{t.featureNoWatermark}</h4>
                <p className="text-gray-600">{t.featureNoWatermarkDesc}</p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-sm">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-tiktok-cyan to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3">{t.featureHdQuality}</h4>
                <p className="text-gray-600">{t.featureHdQualityDesc}</p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-sm">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-tiktok-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3">{t.featureFast}</h4>
                <p className="text-gray-600">{t.featureFastDesc}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-tiktok-dark mb-4">
              {t.howItWorksTitle}
            </h3>
            <p className="text-xl text-gray-600">{t.howItWorksSubtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-tiktok-pink text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="text-lg font-semibold mb-3">{t.step1}</h4>
              <p className="text-gray-600">{t.step1Desc}</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-tiktok-cyan text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="text-lg font-semibold mb-3">{t.step2}</h4>
              <p className="text-gray-600">{t.step2Desc}</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-tiktok-success text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="text-lg font-semibold mb-3">{t.step3}</h4>
              <p className="text-gray-600">{t.step3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-tiktok-dark mb-4">
              {t.faqTitle}
            </h3>
            <p className="text-xl text-gray-600">{t.faqSubtitle}</p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg shadow-sm px-6">
              <AccordionTrigger className="text-left font-semibold text-lg">
                {t.faq1Question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                {t.faq1Answer}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-white rounded-lg shadow-sm px-6">
              <AccordionTrigger className="text-left font-semibold text-lg">
                {t.faq2Question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                {t.faq2Answer}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-white rounded-lg shadow-sm px-6">
              <AccordionTrigger className="text-left font-semibold text-lg">
                {t.faq3Question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                {t.faq3Answer}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="bg-white rounded-lg shadow-sm px-6">
              <AccordionTrigger className="text-left font-semibold text-lg">
                {t.faq4Question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                {t.faq4Answer}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
