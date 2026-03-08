import earphoneImg from "@/assets/labubu-earphone-case.png";
import chargerImg from "@/assets/labubu-charger-case.png";
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
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
