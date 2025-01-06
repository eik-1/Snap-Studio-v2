import {  AlertCircle} from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen  py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">SnapStudio Terms of Service</h1>
            <p className="text-gray-600">Last Updated: January 5, 2025</p>
          </div>

          {/* Important Notice Alert */}
          <div className="mb-8 border-blue-200 border-[1px] bg-blue-50 h-max w-full p-4 rounded-md">
            <div className='flex items-center space-x-2'>
            <AlertCircle className="h-4 w-4" />
            <h2>Important Notice</h2>
            </div>
            
            <p>
              By using SnapStudio, you acknowledge that you are at least 18 years of age and agree to these terms of service. Please read them carefully before proceeding.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {/* Eligibility and Age Requirements */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Eligibility and Age Requirements</h2>
              <div className="prose text-gray-700 space-y-4">
                <p>
                  SnapStudio services are strictly available only to individuals who are 18 years of age or older. By using our service, you represent and warrant that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You are at least 18 years old</li>
                  <li>You possess the legal capacity to enter into binding contracts</li>
                  <li>You are using the service in compliance with all applicable laws and regulations</li>
                </ul>
                <p>
                  We reserve the right to terminate accounts if we discover users are under 18 or have misrepresented their age.
                </p>
              </div>
            </section>

            {/* Service Description */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
              <div className="prose text-gray-700 space-y-4">
                <p>
                  SnapStudio is an AI-powered image generation platform that creates photorealistic images of users based on text prompts.</p> 
                <p>
                  Our service requires:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Initial photographs for model training (minimum requirements specified in our guidelines)</li>
                  <li>Clear text prompts that comply with our content policies</li>
                  <li>Active subscription or appropriate credit package</li>
                </ul>
                <p>
                  Generation times may vary based on system load and complexity of requests. We do not guarantee specific turnaround times but strive to process all requests efficiently.
                </p>
              </div>
            </section>

            {/* Usage Rights and Restrictions */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Usage Rights and Restrictions</h2>
              <div className="prose text-gray-700 space-y-4">
              <p>
  Users retain rights to their original uploaded images used for training purposes. For generated images, SnapStudio grants you a worldwide, non-exclusive license to use, download, copy, and modify the generated images for both personal and commercial purposes. This license remains valid as long as you maintain an active subscription and comply with these terms of service.
</p>

<p>
  Please note that this license:
</p>
<ul className="list-disc pl-6 space-y-2">
  <li>Is non-transferable and cannot be sublicensed to others</li>
  <li>Requires adherence to all usage restrictions outlined in these terms</li>
  <li>May be revoked if you violate these terms of service</li>
  <li>Does not transfer ownership of the generated images to you</li>
</ul>



                <p className="font-semibold mt-6">Prohibited Uses and Content Restrictions</p>
                <p>
                  SnapStudio's image generation functionality is strictly for lawful and ethical purposes. By using our service, you expressly agree NOT to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Impersonate real individuals without their explicit consent</li>
                  <li>Engage in or promote scams, fraud, or other misleading activities</li>
                  <li>Promote or sell illegal products, services, or content</li>
                  <li>Engage in political campaigning, advocacy, or misinformation</li>
                  <li>Produce deepfake content with the intent to deceive, defraud, or mislead others</li>
                  <li>Create content that violates privacy or portrays individuals in a harmful or false light</li>
                  <li>Distribute violent, hateful, or discriminatory content of any kind</li>
                  <li>Create false photography or documents to breach people's accounts</li>
                  <li>Generate sexually explicit or adult content of any nature</li>
                  <li>Generate images of minors</li>
                </ul>

                <p className="font-semibold mt-6">Permitted Uses</p>
                <p>
                  You agree to only use the image generation functionality for positive and lawful purposes, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Creating advertisements for legitimate products and services</li>
                  <li>Marketing campaigns that promote legal and ethical businesses</li>
                  <li>Explainer images or tutorials to educate viewers</li>
                  <li>Educational content for personal or commercial use</li>
                  <li>Any other purpose that complies with applicable laws and this Terms of Service</li>
                </ul>

                <p className="mt-4">
                  Violation of these restrictions will result in immediate account termination and may be reported to relevant authorities. We reserve the right to review and reject any content that we determine, in our sole discretion, violates these terms.
                </p>
              </div>
            </section>

            {/* Payment and Subscription */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment and Subscription</h2>
              <div className="prose text-gray-700 space-y-4">
                <p>
                  SnapStudio operates on a subscription-based model with the following terms:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All fees are non-refundable unless required by applicable law</li>
                  <li>Subscription periods begin on the date of initial payment</li>
                  <li>Automatic renewal occurs unless cancelled 24 hours before renewal date</li>
                  <li>Price changes will be notified 30 days in advance</li>
                  <li>Failed payments may result in immediate service suspension</li>
                </ul>
                <p>
                  Credits and subscription features expire at the end of the billing cycle and do not roll over.
                </p>
              </div>
            </section>

            {/* DMCA and Copyright */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. DMCA and Copyright Policy</h2>
              <div className="prose text-gray-700 space-y-4">
                <p>
                  SnapStudio respects intellectual property rights and complies with the Digital Millennium Copyright Act (DMCA). Our copyright policy includes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Prompt response to DMCA takedown notices</li>
                  <li>Removal of infringing content within 24 hours of verified notices</li>
                  <li>Termination of repeat infringers' accounts</li>
                  <li>Protection of fair use rights</li>
                </ul>
                <p className="mt-4">
                  DMCA notices must be submitted to our designated copyright agent with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Physical/electronic signature of copyright owner or authorized agent</li>
                  <li>Description of copyrighted work claimed to be infringed</li>
                  <li>Description of where the infringing material is located</li>
                  <li>Contact information of the complaining party</li>
                  <li>Statement of good faith belief in infringement</li>
                  <li>Statement of accuracy and authority under penalty of perjury</li>
                </ul>
              </div>
            </section>

            {/* Data Usage and Privacy */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Usage and Privacy</h2>
              <div className="prose text-gray-700 space-y-4">
                <p>
                  We implement comprehensive data protection measures, for detailed information, please refer to our <Link to="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>.
                </p>
              
              </div>
            </section>

            {/* Limitations and Disclaimers */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitations and Disclaimers</h2>
              <div className="prose text-gray-700 space-y-4">
                <p>
                  SnapStudio provides its service "as is" with the following disclaimers:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>No guarantee of specific results or image quality</li>
                  <li>No warranty of uninterrupted or error-free service</li>
                  <li>No liability for consequential damages or lost profits</li>
                  <li>Maximum liability limited to fees paid in last 12 months</li>
                </ul>
                <p>
                  Users acknowledge that AI-generated results may vary and accept inherent limitations of the technology.
                </p>
              </div>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Termination</h2>
              <div className="prose text-gray-700 space-y-4">
                <p>
                  Account termination may occur under these circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violation of any terms of service</li>
                  <li>Generation or attempted generation of prohibited content</li>
                  <li>Payment failures or chargebacks</li>
                  <li>Fraudulent or deceptive practices</li>
                  <li>Legal requirements or court orders</li>
                </ul>
                <p>
                  Upon termination:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All user data and training models will be deleted</li>
                  <li>Access to generated images will be revoked</li>
                  <li>Unused credits or subscription time will be forfeited</li>
                  <li>Users may not create new accounts without permission</li>
                </ul>
              </div>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to Terms</h2>
              <div className="prose text-gray-700 space-y-4">
                <p>
                  We reserve the right to modify these terms at any time. Users will be notified of significant changes via:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Email notification to registered address</li>
                  <li>In-app notifications</li>
                  <li>Website announcements</li>
                </ul>
                <p>
                  Continued use of the service after changes constitutes acceptance of modified terms.
                </p>
              </div>
            </section>
          </div>

          {/* Agreement Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-center">
              By using SnapStudio, you acknowledge that you have read, understood, and agree to these terms of service. These terms constitute a legally binding agreement between you and SnapStudio.
            </p>
          </div>
        
      </div>
    </div>
  );
};

export default TermsOfService;