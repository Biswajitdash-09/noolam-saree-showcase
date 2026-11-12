import type { Look, Product } from "@/lib/data";
import { shop } from "@/lib/shop";
import { formatINR } from "@/lib/utils";

type OrderLine = { name: string; meta?: string; qty: number; price: number };

/** A wa.me link that opens a chat with the shop, message prefilled. */
export function waLink(text: string) {
  return `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function orderMessage(lines: OrderLine[], subtotal: number) {
  const items = lines
    .map(
      (line, index) =>
        `${index + 1}. ${line.name}${line.meta ? ` (${line.meta})` : ""} × ${line.qty} — ${formatINR(line.price * line.qty)}`,
    )
    .join("\n");
  return [
    `Hello ${shop.name}, I'd like to order:`,
    "",
    items,
    "",
    `Subtotal: ${formatINR(subtotal)}`,
    "",
    "Please confirm availability and delivery to my pincode: ______",
  ].join("\n");
}

export function productMessage(product: Pick<Product, "name" | "price" | "slug">, size?: number | null) {
  return [
    `Hello ${shop.name}, I'm interested in ${product.name} (${formatINR(product.price)})${size ? `, blouse size ${size}` : ""}.`,
    "Is it available?",
  ].join("\n");
}

export function reweaveMessage(product: Pick<Product, "name">) {
  return `Hello ${shop.name}, ${product.name} shows as sold out. Can the loom room weave it again for me, and how long would it take?`;
}

export function lookMessage(look: Pick<Look, "name" | "pieces">) {
  const pieces = look.pieces.map((piece) => `• ${piece.name}`).join("\n");
  return `Hello ${shop.name}, I'd like the "${look.name}" look:\n${pieces}\n\nCan you help me with sizes and availability?`;
}

export function videoCallMessage(productName?: string) {
  return productName
    ? `Hello ${shop.name}, I'd like a video call to see ${productName} up close. When are you free?`
    : `Hello ${shop.name}, I'd like a video call to see some sarees. When are you free?`;
}

export const greetingMessage = `Hello ${shop.name}, I have a question about a saree.`;
