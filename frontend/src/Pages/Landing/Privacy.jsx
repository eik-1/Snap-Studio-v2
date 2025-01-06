
import { Shield } from 'lucide-react';


const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen  py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
       
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">SnapStudio Privacy Policy</h1>
            <p className="text-gray-600">Last Updated: January 5, 2025</p>
          </div>

          {/* Important Notice */}
          <div className="mb-8 border-green-200 border-[1px] bg-green-50 h-max w-full p-4 rounded-md">
            <div className='flex items-center space-x-2'>
            <Shield className="h-4 w-4" />
            <h2>Your Privacy Matters</h2>
            </div>
            
            <p>
            This Privacy Policy explains how SnapStudio collects, uses, and protects your personal information. Please read it carefully to understand our practices regarding your data.
            </p>
          </div>
        

          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <div className="prose text-gray-700">
              <p>
                SnapStudio ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy describes our practices regarding the collection, use, and disclosure of information when you use our AI-powered image generation service.
              </p>
              <p>
                By using SnapStudio, you consent to the data practices described in this policy. We process your information in accordance with applicable data protection laws, including but not limited to the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            <div className="prose text-gray-700">
              <h3 className="text-xl font-medium mb-2">Personal Information</h3>
              <p>We collect the following types of personal information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account Information: Name, email address, and password</li>
                <li>Payment Information: Credit card details (processed securely through our payment processors)</li>
                <li>User-Provided Images: Photographs you upload for training our AI models</li>
                <li>Generated Content: Images created through our service</li>
                <li>Usage Data: Information about how you interact with our service</li>
              </ul>

              <h3 className="text-xl font-medium mt-6 mb-2">Automatically Collected Information</h3>
              <p>We automatically collect certain information when you use our service:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Device Information: Browser type, operating system, and device identifiers</li>
                <li>Log Data: IP addresses, access times, and pages viewed</li>
                <li>Performance Data: System performance metrics and error reports</li>
                <li>Cookies and Similar Technologies: Data collected through cookies and web beacons</li>
              </ul>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <div className="prose text-gray-700">
              <p>We use your information for the following purposes:</p>

              <h3 className="text-xl font-medium mt-6 mb-2">Service Provision and Improvement</h3>
              <p>
                Your information enables us to provide and enhance our AI image generation service, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Training AI models to generate personalized images</li>
                <li>Processing your requests and transactions</li>
                <li>Improving our algorithms and service quality</li>
                <li>Providing customer support and responding to inquiries</li>
              </ul>

              <h3 className="text-xl font-medium mt-6 mb-2">Communication and Marketing</h3>
              <p>
                We may use your contact information to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Send service updates and administrative messages</li>
                <li>Provide information about new features and offerings</li>
                <li>Respond to your questions and feedback</li>
              </ul>
            </div>
          </section>

          {/* Data Storage and Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Storage and Security</h2>
            <div className="prose text-gray-700">
              <p>
                We implement robust security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                
                <li>Access Controls: Strict access controls and authentication mechanisms</li>
               
                <li>Secure Infrastructure: Industry-standard hosting and security protocols</li>
              </ul>
              <p className="mt-4">
                We retain your data only for as long as necessary to provide our services or comply with legal obligations. Training images and generated content are automatically deleted when you close your account or upon request.
              </p>
            </div>
          </section>

          {/* Data Sharing and Disclosure */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Sharing and Disclosure</h2>
            <div className="prose text-gray-700">
              <p>
                We do not sell your personal information to third parties. We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Service Providers: Companies that help us operate our service (e.g., cloud storage, payment processing)</li>
                <li>Legal Requirements: When required by law or to protect our rights</li>
                <li>Business Transfers: In connection with any merger, sale, or acquisition of our business</li>
              </ul>
              <p className="mt-4">
                All third-party service providers are contractually obligated to protect your information and may only use it for specified purposes.
              </p>
            </div>
          </section>

          {/* Your Rights and Choices */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights and Choices</h2>
            <div className="prose text-gray-700">
              <p>
                You have several rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access: Request copies of your personal data</li>
                <li>Correction: Update or correct inaccurate information</li>
                <li>Deletion: Request deletion of your personal data</li>
                <li>Portability: Receive your data in a structured, machine-readable format</li>
                <li>Objection: Object to certain types of processing</li>
                <li>Consent Withdrawal: Withdraw previously given consent</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact our privacy team through the methods listed in the Contact Information section.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Children's Privacy</h2>
            <div className="prose text-gray-700">
              <p>
                SnapStudio is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we discover that we have collected personal information from a child under 18, we will promptly delete it.
              </p>
            </div>
          </section>

          {/* Changes to Privacy Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to Privacy Policy</h2>
            <div className="prose text-gray-700">
              <p>
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of any material changes through our service or via email. Your continued use of SnapStudio after such modifications constitutes your acceptance of the updated Privacy Policy.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Information</h2>
            <div className="prose text-gray-700">
              <p>
                If you have questions, concerns, or requests related to your privacy or this policy, please contact us at:
              </p>
              <div className="mt-4">
                <p>Email: help@snapstudio.me</p>
                {/*<p>Address: </p>
                <p>Phone: </p>*/}
              </div>
              <p className="mt-4">
                We will respond to your request within the timeframe specified by applicable law.
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-center">
              This Privacy Policy was last updated on January 5, 2025. By using SnapStudio, you agree to the collection and use of information in accordance with this policy.
            </p>
          </div>
       
      </div>
    </div>
  );
};

export default PrivacyPolicy;
