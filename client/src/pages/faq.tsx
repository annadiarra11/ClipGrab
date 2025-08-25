import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/hooks/use-language";

export default function FAQ() {
  const { t } = useLanguage();

  const additionalFaqs = [
    {
      question: "How fast is the download process?",
      answer: "Our TikTok downloader is optimized for speed. Most videos are processed and ready for download within 10-30 seconds, depending on the video length and your internet connection."
    },
    {
      question: "Can I download private TikTok videos?",
      answer: "No, you can only download public TikTok videos. Private videos are protected by TikTok's privacy settings and cannot be accessed through our downloader."
    },
    {
      question: "What devices are supported?",
      answer: "Our TikTok downloader works on all devices with a web browser, including computers, smartphones, and tablets. It's compatible with Windows, Mac, iOS, Android, and Linux."
    },
    {
      question: "Is my data safe when using the downloader?",
      answer: "Yes, we prioritize your privacy and security. We don't store your personal information or the videos you download. All processing is done securely and temporarily."
    },
    {
      question: "Why isn't my video downloading?",
      answer: "If a video isn't downloading, it might be private, deleted, or have restricted access. Also ensure you're using a valid TikTok URL. Try copying the URL again from the TikTok app or website."
    },
    {
      question: "Can I download TikTok live streams?",
      answer: "No, live streams cannot be downloaded as they are real-time broadcasts. You can only download regular TikTok videos that have been posted to the platform."
    }
  ];

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-tiktok-dark mb-4">
            {t.faqTitle}
          </h1>
          <p className="text-xl text-gray-600">
            {t.faqSubtitle}
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-tiktok-dark">Common Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left font-semibold">
                  {t.faq1Question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {t.faq1Answer}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left font-semibold">
                  {t.faq2Question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {t.faq2Answer}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left font-semibold">
                  {t.faq3Question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {t.faq3Answer}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left font-semibold">
                  {t.faq4Question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {t.faq4Answer}
                </AccordionContent>
              </AccordionItem>

              {additionalFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`additional-${index}`}>
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card className="bg-tiktok-neutral">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-4">
              Can't find the answer you're looking for? Feel free to contact our support team.
            </p>
            <button className="gradient-tiktok text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
              Contact Support
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
