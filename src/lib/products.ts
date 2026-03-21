import { db } from "./firebase";
import { ref, get } from "firebase/database";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  cost_price?: number;
  short_description: string;
  description: string;
  image_url: string;
  is_active: boolean;
}

export async function fetchProducts(): Promise<Product[]> {
  const snapshot = await get(ref(db, "products"));
  if (!snapshot.exists()) return [];
  const data = snapshot.val();
  return Object.entries(data)
    .map(([id, val]: [string, any]) => ({ id, ...val }))
    .filter((p: Product) => p.is_active)
    .sort((a, b) => (a.name > b.name ? 1 : -1));
}

export async function fetchProduct(slug: string): Promise<Product | null> {
  const snapshot = await get(ref(db, "products"));
  if (!snapshot.exists()) return null;
  const data = snapshot.val();
  const product = Object.entries(data)
    .map(([id, val]: [string, any]) => ({ id, ...val }))
    .find((p: Product) => p.slug === slug && p.is_active);
  return product || null;
}

export async function fetchAllProductsAdmin(): Promise<Product[]> {
  const snapshot = await get(ref(db, "products"));
  if (!snapshot.exists()) return [];
  const data = snapshot.val();
  return Object.entries(data)
    .map(([id, val]: [string, any]) => ({ id, ...val }))
    .sort((a, b) => (a.name > b.name ? 1 : -1));
}
