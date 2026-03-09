export default function TermsConditions() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
      <div className="space-y-4 text-muted-foreground">
        <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Agreement to Terms</h2>
          <p>By accessing and using Labubu Store, you agree to be bound by these Terms and Conditions. If you disagree with any part, please do not use our website.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Products and Pricing</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All prices are in Indian Rupees (₹)</li>
            <li>We reserve the right to modify prices without prior notice</li>
            <li>Product images are for reference only; actual products may vary slightly</li>
            <li>We strive to display accurate colors, but actual colors may vary based on your screen</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Orders and Payment</h2>
          <p>All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order. Payment must be received before order processing.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Intellectual Property</h2>
          <p>All content on this website, including images, text, and logos, is the property of Labubu Store and protected by copyright laws.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Limitation of Liability</h2>
          <p>Labubu Store shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Contact</h2>
          <p>For questions about these Terms, contact us at hello@labubustore.com</p>
        </section>
      </div>
    </div>
  );
}
