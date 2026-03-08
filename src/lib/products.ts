import earphoneImg from "@/assets/labubu-earphone-case.png";
import chargerImg from "@/assets/labubu-charger-case.png";
import phoneCaseImg from "@/assets/labubu-phone-case-purple.png";
import watchStandImg from "@/assets/labubu-watch-stand.png";
import cableProtectorImg from "@/assets/labubu-cable-protector.png";
import phoneGripImg from "@/assets/labubu-phone-grip.png";
import type { Product } from "./cart";

export const products: Product[] = [
  {
    id: "labubu-earphone-case",
    name: "Labubu Earphone Case",
    price: 499,
    shortDescription: "Adorable silicone case for your AirPods",
    description:
      "Protect your earphones with this adorable Labubu themed silicone case. Durable, lightweight, and perfect for daily use. Features a cute Labubu character design with soft pink tones that makes your AirPods stand out.",
    image: earphoneImg,
  },
  {
    id: "labubu-charger-case",
    name: "Labubu iPhone Charger Case",
    price: 599,
    shortDescription: "Cute protection for your iPhone charger",
    description:
      "Protect your iPhone charger with this adorable Labubu themed silicone case. Durable, lightweight, and perfect for daily use. Features a charming bear-style Labubu design in warm beige tones.",
    image: chargerImg,
  },
  {
    id: "labubu-phone-case-purple",
    name: "Labubu Phone Case – Lavender",
    price: 799,
    shortDescription: "Kawaii purple silicone iPhone case",
    description:
      "Turn heads with this dreamy lavender Labubu phone case. Made from premium silicone with a 3D character design, raised edges for camera protection, and a silky-smooth feel. A must-have for any Labubu collector.",
    image: phoneCaseImg,
  },
  {
    id: "labubu-watch-stand",
    name: "Labubu Watch Stand",
    price: 699,
    shortDescription: "Mint green Apple Watch charging stand",
    description:
      "Let your Labubu buddy hold your Apple Watch while it charges! This adorable mint green silicone stand fits all Apple Watch sizes and keeps your desk looking cute. Stable base with anti-slip padding.",
    image: watchStandImg,
  },
  {
    id: "labubu-cable-protector",
    name: "Labubu Cable Protector",
    price: 299,
    shortDescription: "Sunny yellow cable bite protector",
    description:
      "Keep your charging cables safe with this sunny yellow Labubu cable protector. Simply clip it onto your cable near the connector to prevent fraying. Adorable hamster-style design that brings joy every time you charge.",
    image: cableProtectorImg,
  },
  {
    id: "labubu-phone-grip",
    name: "Labubu Phone Grip",
    price: 399,
    shortDescription: "Coral pink pop socket phone grip",
    description:
      "Get a grip on your phone with this coral pink Labubu mushroom-style pop socket. Expands for a secure hold and collapses flat for pockets. Works as a stand for watching videos too!",
    image: phoneGripImg,
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
