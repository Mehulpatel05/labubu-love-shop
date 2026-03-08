
-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  short_description TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Everyone can read active products
CREATE POLICY "Anyone can read active products" ON public.products FOR SELECT USING (is_active = true);
-- Admins can do everything
CREATE POLICY "Admins can manage products" ON public.products FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Auto update updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed existing products
INSERT INTO public.products (slug, name, price, short_description, description, image_url) VALUES
('labubu-earphone-case', 'Labubu Earphone Case', 499, 'Adorable silicone case for your AirPods', 'Protect your earphones with this adorable Labubu themed silicone case. Durable, lightweight, and perfect for daily use. Features a cute Labubu character design with soft pink tones that makes your AirPods stand out.', '/products/labubu-earphone-case.png'),
('labubu-charger-case', 'Labubu iPhone Charger Case', 599, 'Cute protection for your iPhone charger', 'Protect your iPhone charger with this adorable Labubu themed silicone case. Durable, lightweight, and perfect for daily use. Features a charming bear-style Labubu design in warm beige tones.', '/products/labubu-charger-case.png'),
('labubu-phone-case-purple', 'Labubu Phone Case – Lavender', 799, 'Kawaii purple silicone iPhone case', 'Turn heads with this dreamy lavender Labubu phone case. Made from premium silicone with a 3D character design, raised edges for camera protection, and a silky-smooth feel. A must-have for any Labubu collector.', '/products/labubu-phone-case-purple.png'),
('labubu-watch-stand', 'Labubu Watch Stand', 699, 'Mint green Apple Watch charging stand', 'Let your Labubu buddy hold your Apple Watch while it charges! This adorable mint green silicone stand fits all Apple Watch sizes and keeps your desk looking cute. Stable base with anti-slip padding.', '/products/labubu-watch-stand.png'),
('labubu-cable-protector', 'Labubu Cable Protector', 299, 'Sunny yellow cable bite protector', 'Keep your charging cables safe with this sunny yellow Labubu cable protector. Simply clip it onto your cable near the connector to prevent fraying. Adorable hamster-style design that brings joy every time you charge.', '/products/labubu-cable-protector.png'),
('labubu-phone-grip', 'Labubu Phone Grip', 399, 'Coral pink pop socket phone grip', 'Get a grip on your phone with this coral pink Labubu mushroom-style pop socket. Expands for a secure hold and collapses flat for pockets. Works as a stand for watching videos too!', '/products/labubu-phone-grip.png');
