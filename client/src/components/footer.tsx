import { Link } from "wouter";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-tiktok-dark text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 gradient-tiktok rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </div>
              <h4 className="text-xl font-bold">TikDownloader</h4>
            </div>
            <p className="text-gray-300 mb-4">
              {t.footerDesc}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-tiktok-pink transition-colors" data-testid="social-facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-tiktok-cyan transition-colors" data-testid="social-twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-tiktok-pink transition-colors" data-testid="social-instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">{t.product}</h5>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-link-downloader">TikTok Downloader</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-link-converter">Video Converter</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-link-audio">Audio Extractor</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-link-batch">Batch Download</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">{t.support}</h5>
            <ul className="space-y-3">
              <li><Link href="/faq" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-link-faq">FAQ</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-link-help">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-link-contact">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-link-report">Report Issue</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">{t.legal}</h5>
            <ul className="space-y-3">
              <li><Link href="/terms" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-link-terms">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-link-privacy">Privacy Policy</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-link-cookies">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-link-dmca">DMCA</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
