import { useState } from "react";
import { db } from "@/lib/firebase";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

export default function SeedProducts() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const seedProducts = async () => {
    setLoading(true);
    const products = {
      'labubu-earphone-case': {
        id: 'labubu-earphone-case',
        slug: 'labubu-earphone-case',
        name: 'Labubu Earphone Case',
        price: 499,
        short_description: 'Adorable silicone case for your AirPods',
        description: 'Protect your earphones with this adorable Labubu themed silicone case. Durable, lightweight, and perfect for daily use.',
        image_url: '/labubu-earphone-case.png',
        is_active: true
      },
      'labubu-charger-case': {
        id: 'labubu-charger-case',
        slug: 'labubu-charger-case',
        name: 'Labubu iPhone Charger Case',
        price: 599,
        short_description: 'Cute protection for your iPhone charger',
        description: 'Protect your iPhone charger with this adorable Labubu themed silicone case. Features a charming bear-style design.',
        image_url: '/labubu-charger-case.png',
        is_active: true
      },
      'labubu-phone-case-purple': {
        id: 'labubu-phone-case-purple',
        slug: 'labubu-phone-case-purple',
        name: 'Labubu Phone Case – Lavender',
        price: 799,
        short_description: 'Kawaii purple silicone iPhone case',
        description: 'Turn heads with this dreamy lavender Labubu phone case. Made from premium silicone with a 3D character design.',
        image_url: '/labubu-phone-case-purple.png',
        is_active: true
      },
      'labubu-watch-stand': {
        id: 'labubu-watch-stand',
        slug: 'labubu-watch-stand',
        name: 'Labubu Watch Stand',
        price: 699,
        short_description: 'Mint green Apple Watch charging stand',
        description: 'Let your Labubu buddy hold your Apple Watch while it charges! Fits all Apple Watch sizes.',
        image_url: '/labubu-watch-stand.png',
        is_active: true
      },
      'labubu-cable-protector': {
        id: 'labubu-cable-protector',
        slug: 'labubu-cable-protector',
        name: 'Labubu Cable Protector',
        price: 299,
        short_description: 'Sunny yellow cable bite protector',
        description: 'Keep your charging cables safe with this sunny yellow Labubu cable protector. Prevents fraying.',
        image_url: '/labubu-cable-protector.png',
        is_active: true
      },
      'labubu-phone-grip': {
        id: 'labubu-phone-grip',
        slug: 'labubu-phone-grip',
        name: 'Labubu Phone Grip',
        price: 399,
        short_description: 'Coral pink pop socket phone grip',
        description: 'Get a grip on your phone with this coral pink Labubu mushroom-style pop socket.',
        image_url: '/labubu-phone-grip.png',
        is_active: true
      }
    };

    try {
      await set(ref(db, 'products'), products);
      setDone(true);
    } catch (error) {
      console.error(error);
      alert('Error seeding products');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Seed Products</h1>
        {done ? (
          <>
            <p className="text-green-600">✅ Products seeded successfully!</p>
            <button onClick={() => navigate('/')} className="px-6 py-3 bg-primary text-white rounded-full">
              Go to Home
            </button>
          </>
        ) : (
          <button 
            onClick={seedProducts} 
            disabled={loading}
            className="px-6 py-3 bg-primary text-white rounded-full disabled:opacity-50"
          >
            {loading ? 'Seeding...' : 'Seed Products'}
          </button>
        )}
      </div>
    </div>
  );
}
