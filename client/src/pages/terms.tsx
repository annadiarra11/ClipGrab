import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-tiktok-dark mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: August 25, 2024
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                By accessing and using TikDownloader, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Use License</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Permission is granted to temporarily download one copy of TikDownloader service for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 mt-4">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained on the website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Content Download Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                TikDownloader is a tool that allows users to download publicly available TikTok videos. 
                Users are responsible for ensuring they have the right to download and use the content:
              </p>
              <ul className="list-disc pl-6 mt-4">
                <li>Only download content you have permission to use</li>
                <li>Respect copyright laws and creators' rights</li>
                <li>Do not use downloaded content for commercial purposes without proper authorization</li>
                <li>We do not claim ownership of any content downloaded through our service</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Prohibited Uses</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>You may not use our service:</p>
              <ul className="list-disc pl-6 mt-4">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Service Availability</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                We strive to keep our service available 24/7, but we cannot guarantee uninterrupted service. 
                We reserve the right to suspend, discontinue, or restrict access to all or any part of our service without notice.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, 
                this Company excludes all representations, warranties, conditions and terms including but not limited to 
                implied warranties and conditions of merchantability, fitness for a particular purpose and non-infringement.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Limitations</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                In no event shall TikDownloader or its suppliers be liable for any damages (including, without limitation, 
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
                to use the materials on TikDownloader's website.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Revisions and Errata</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                The materials appearing on TikDownloader's website could include technical, typographical, or photographic errors. 
                TikDownloader does not warrant that any of the materials on its website are accurate, complete, or current.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Site Terms of Use Modifications</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                TikDownloader may revise these terms of service for its website at any time without notice. 
                By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                If you have any questions about these Terms of Service, please contact us through our support channels.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
