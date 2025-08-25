import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-tiktok-dark mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: August 25, 2024
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                We are committed to protecting your privacy. TikDownloader collects minimal information to provide our service:
              </p>
              <ul className="list-disc pl-6 mt-4">
                <li><strong>Video URLs:</strong> We temporarily process TikTok URLs you submit to extract video information</li>
                <li><strong>Technical Data:</strong> Basic server logs including IP addresses, browser types, and timestamps for security and performance</li>
                <li><strong>Cookies:</strong> We use essential cookies for language preferences and basic functionality</li>
              </ul>
              <p className="mt-4">
                <strong>We do NOT collect:</strong> Personal information, account details, downloaded videos, or any content you access through our service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>The limited information we collect is used solely to:</p>
              <ul className="list-disc pl-6 mt-4">
                <li>Process your video download requests</li>
                <li>Maintain and improve our service performance</li>
                <li>Ensure security and prevent abuse</li>
                <li>Remember your language preferences</li>
              </ul>
              <p className="mt-4">
                We do not use your information for marketing, advertising, or any commercial purposes beyond providing our free service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Data Storage and Retention</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                We practice data minimization and temporary storage:
              </p>
              <ul className="list-disc pl-6 mt-4">
                <li>Video URLs and metadata are cached temporarily (1 hour maximum) to improve performance</li>
                <li>Server logs are retained for 30 days for security purposes</li>
                <li>No downloaded videos are stored on our servers</li>
                <li>All processing is done in real-time and data is automatically purged</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Our service may interact with third-party services:
              </p>
              <ul className="list-disc pl-6 mt-4">
                <li><strong>TikTok:</strong> We retrieve publicly available video data from TikTok's platform</li>
                <li><strong>CDN Services:</strong> We may use content delivery networks to improve service performance</li>
                <li><strong>Analytics:</strong> We may use privacy-focused analytics to understand service usage</li>
              </ul>
              <p className="mt-4">
                We do not share your personal information with any third parties for marketing or commercial purposes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Cookies and Local Storage</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                We use cookies and local storage minimally:
              </p>
              <ul className="list-disc pl-6 mt-4">
                <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                <li><strong>Preference Cookies:</strong> To remember your language selection</li>
                <li><strong>No Tracking:</strong> We do not use tracking cookies or advertising cookies</li>
              </ul>
              <p className="mt-4">
                You can disable cookies in your browser settings, though this may affect some functionality.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Security</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your information:
              </p>
              <ul className="list-disc pl-6 mt-4">
                <li>HTTPS encryption for all communications</li>
                <li>Secure server configurations</li>
                <li>Regular security updates and monitoring</li>
                <li>Limited data retention policies</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                You have the right to:
              </p>
              <ul className="list-disc pl-6 mt-4">
                <li>Know what information we collect and how it's used</li>
                <li>Request deletion of any personal information we may have</li>
                <li>Opt-out of any non-essential data collection</li>
                <li>Contact us with privacy-related questions or concerns</li>
              </ul>
              <p className="mt-4">
                Since we collect minimal personal information, most data is automatically deleted within hours of your visit.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. International Users</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Our service is available globally. By using our service, you consent to the processing of your information 
                as described in this privacy policy. We comply with applicable privacy laws including GDPR for EU users 
                and CCPA for California residents.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Our service is not directed to children under 13. We do not knowingly collect personal information from 
                children under 13. If we become aware that we have collected personal information from a child under 13, 
                we will take steps to delete such information immediately.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                We may update this privacy policy from time to time. We will notify users of any material changes by 
                posting the new privacy policy on this page and updating the "Last updated" date. Your continued use 
                of the service after any changes constitutes acceptance of the new privacy policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us through 
                our support channels. We are committed to addressing any concerns about your privacy and data protection.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
