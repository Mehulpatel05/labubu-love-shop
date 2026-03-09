export default function PrivacyPolicy() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="space-y-4 text-muted-foreground">
        <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Information We Collect</h2>
          <p>We collect information you provide directly to us, including name, email, phone number, shipping address, and payment information when you make a purchase.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process and fulfill your orders</li>
            <li>Send order confirmations and updates</li>
            <li>Respond to your comments and questions</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Improve our website and services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Your Rights</h2>
          <p>You have the right to access, update, or delete your personal information. Contact us at hello@labubustore.com for any privacy concerns.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Contact Us</h2>
          <p>For any questions about this Privacy Policy, please contact us at hello@labubustore.com</p>
        </section>
      </div>
    </div>
  );
}
