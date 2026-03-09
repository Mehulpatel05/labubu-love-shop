export default function RefundPolicy() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Refund & Return Policy</h1>
      <div className="space-y-4 text-muted-foreground">
        <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">7-Day Return Policy</h2>
          <p>We offer a 7-day return policy from the date of delivery. Products must be unused, undamaged, and in original packaging with all tags intact.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Eligible for Return</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Defective or damaged products</li>
            <li>Wrong product delivered</li>
            <li>Product not as described</li>
            <li>Unused products in original condition</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Non-Returnable Items</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Products with removed tags or packaging</li>
            <li>Used or damaged products (unless received damaged)</li>
            <li>Products returned after 7 days of delivery</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Return Process</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Contact us at hello@labubustore.com within 7 days of delivery</li>
            <li>Provide order number and reason for return</li>
            <li>Our team will arrange pickup or provide return instructions</li>
            <li>Once received and inspected, refund will be processed</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Refund Timeline</h2>
          <p>Refunds are processed within 5-7 business days after receiving the returned product. The amount will be credited to your original payment method.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Exchange Policy</h2>
          <p>We currently do not offer direct exchanges. Please return the product for a refund and place a new order for the desired item.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Contact</h2>
          <p>For return/refund queries, email us at hello@labubustore.com or call our customer support.</p>
        </section>
      </div>
    </div>
  );
}
