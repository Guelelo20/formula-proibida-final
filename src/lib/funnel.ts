export const CTA_DELAY_MS = 440_000;
export const PAYMENT_ENTITY = "10116";
export const PAYMENT_REFERENCE = "922955138";
export const WHATSAPP_MESSAGE = "já fiz o pagamento e abaixo deixo o comprovativo esperando receber a receita em pdf";
export const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=244958958970&text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export function orderTotal(consultation: boolean, guide: boolean) {
  return 5900 + (consultation ? 5000 : 0) + (guide ? 2500 : 0);
}
export function formatKz(value: number) {
  return `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Kz`;
}
export function validCustomer(name: string, phone: string) {
  return name.trim().split(/\s+/).filter(Boolean).length >= 2 && /^\d{9}$/.test(phone);
}
export function newOrderCode() {
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  return `FP-${String((bytes[0] ?? 0) % 100000).padStart(5, "0")}`;
}
export function parseOrderSearch(search: Record<string, unknown>) {
  return {
    consulta: search['consulta'] === true || search['consulta'] === "true",
    guia: search['guia'] === true || search['guia'] === "true",
    pedido: typeof search['pedido'] === "string" && /^FP-\d{5}$/.test(search['pedido']) ? search['pedido'] : undefined,
  };
}
export function pageHead(title: string, description: string) {
  return { meta: [
    { title }, { name: "description", content: description },
    { property: "og:title", content: title }, { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] };
}