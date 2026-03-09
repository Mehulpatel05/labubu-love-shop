import { db } from './firebase';
import { ref, set } from 'firebase/database';

const seedProducts = async () => {
  const products = {
    'labubu-earphone-case': {
      id: 'labubu-earphone-case',
      slug: 'labubu-earphone-case',
      name: 'Labubu Earphone Case',
      price: 499,
      short_description: 'Adorable silicone case for your AirPods',
      description: 'Protect your earphones with this adorable Labubu themed silicone case. Durable, lightweight, and perfect for daily use. Features a cute Labubu character design with soft pink tones that makes your AirPods stand out.',
      image_url: '/products/labubu-earphone-case.png',
      is_active: true
    },
    'labubu-charger-case': {
      id: 'labubu-charger-case',
      slug: 'labubu-charger-case',
      name: 'Labubu iPhone Charger Case',
      price: 599,
      short_description: 'Cute protection for your iPhone charger',
      description: 'Protect your iPhone charger with this adorable Labubu themed silicone case. Durable, lightweight, and perfect for daily use. Features a charming bear-style Labubu design in warm beige tones.',
      image_url: '/products/labubu-charger-case.png',
      is_active: true
    },
    'labubu-phone-case-purple': {
      id: 'labubu-phone-case-purple',
      slug: 'labubu-phone-case-purple',
      name: 'Labubu Phone Case – Lavender',
      price: 799,
      short_description: 'Kawaii purple silicone iPhone case',
      description: 'Turn heads with this dreamy lavender Labubu phone case. Made from premium silicone with a 3D character design, raised edges for camera protection, and a silky-smooth feel. A must-have for any Labubu collector.',
      image_url: '/products/labubu-phone-case-purple.png',
      is_active: true
    },
    'labubu-watch-stand': {
      id: 'labubu-watch-stand',
      slug: 'labubu-watch-stand',
      name: 'Labubu Watch Stand',
      price: 699,
      short_description: 'Mint green Apple Watch charging stand',
      description: 'Let your Labubu buddy hold your Apple Watch while it charges! This adorable mint green silicone stand fits all Apple Watch sizes and keeps your desk looking cute. Stable base with anti-slip padding.',
      image_url: '/products/labubu-watch-stand.png',
      is_active: true
    },
    'labubu-cable-protector': {
      id: 'labubu-cable-protector',
      slug: 'labubu-cable-protector',
      name: 'Labubu Cable Protector',
      price: 299,
      short_description: 'Sunny yellow cable bite protector',
      description: 'Keep your charging cables safe with this sunny yellow Labubu cable protector. Simply clip it onto your cable near the connector to prevent fraying. Adorable hamster-style design that brings joy every time you charge.',
      image_url: '/products/labubu-cable-protector.png',
      is_active: true
    },
    'labubu-phone-grip': {
      id: 'labubu-phone-grip',
      slug: 'labubu-phone-grip',
      name: 'Labubu Phone Grip',
      price: 399,
      short_description: 'Coral pink pop socket phone grip',
      description: 'Get a grip on your phone with this coral pink Labubu mushroom-style pop socket. Expands for a secure hold and collapses flat for pockets. Works as a stand for watching videos too!',
      image_url: '/products/labubu-phone-grip.png',
      is_active: true
    }
  };

  try {
    await set(ref(db, 'products'), products);
    console.log('✅ Products seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding products:', error);
  }
};

// Run this once to seed data
seedProducts();
