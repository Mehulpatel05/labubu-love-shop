export default function ShippingPolicy() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Shipping Policy</h1>
      <div className="space-y-4 text-muted-foreground">
        <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Shipping Coverage</h2>
          <p>We currently ship across India. International shipping is not available at this time.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Shipping Charges</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Free Shipping:</strong> On orders above ₹999</li>
            <li><strong>Standard Shipping:</strong> ₹99 for orders below ₹999</li>
            <li>Shipping charges are calculated at checkout</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Delivery Time</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Metro Cities: 3-5 business days</li>
            <li>Other Cities: 5-7 business days</li>
            <li>Remote Areas: 7-10 business days</li>
          </ul>
          <p className="mt-2">Note: Delivery times are estimates and may vary due to unforeseen circumstances.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Order Tracking</h2>
          <p>Once your order is shipped, you will receive a tracking number via email/SMS. You can track your order in the "My Orders" section.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Shipping Partners</h2>
          <p>We work with trusted courier partners including Delhivery, Blue Dart, and India Post to ensure safe delivery of your products.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">Contact</h2>
          <p>For shipping queries, contact us at hello@labubustore.com</p>
        </section>
      </div>
    </div>
  );
}
