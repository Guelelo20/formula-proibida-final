import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useDelayedCta } from "@/hooks/use-delayed-cta";
import { CTA_DELAY_MS, PAYMENT_ENTITY, PAYMENT_REFERENCE, WHATSAPP_MESSAGE, WHATSAPP_URL, formatKz, newOrderCode, orderTotal, parseOrderSearch, validCustomer } from "@/lib/funnel";

afterEach(() => vi.useRealTimers());
describe("Funnel rules", () => {
  it("formats all requested totals consistently in Kz", () => {
    expect([5900, 8400, 10900, 13400].map(formatKz)).toEqual(["5.900 Kz", "8.400 Kz", "10.900 Kz", "13.400 Kz"]);
  });
  it("charges 5.900 Kz with no optional additions", () => expect(orderTotal(false, false)).toBe(5900));
  it("charges 8.400 Kz with the guide", () => expect(orderTotal(false, true)).toBe(8400));
  it("charges 10.900 Kz with the consultation", () => expect(orderTotal(true, false)).toBe(10900));
  it("charges 13.400 Kz with both additions", () => expect(orderTotal(true, true)).toBe(13400));
  it("shows the CTA at 440 seconds, never earlier, and keeps it visible", () => {
    vi.useFakeTimers();
    expect(CTA_DELAY_MS).toBe(440000);
    const { result } = renderHook(() => useDelayedCta());
    expect(result.current).toBe(false);
    act(() => vi.advanceTimersByTime(439999));
    expect(result.current).toBe(false);
    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe(true);
    act(() => vi.advanceTimersByTime(440000));
    expect(result.current).toBe(true);
  });
  it("requires a full name", () => {
    expect(validCustomer("Manuel Domingos", "923456789")).toBe(true);
    expect(validCustomer("Manuel", "923456789")).toBe(false);
  });
  it("requires exactly nine phone digits", () => {
    expect(validCustomer("Manuel Domingos", "923456789")).toBe(true);
    expect(validCustomer("Manuel Domingos", "92345678")).toBe(false);
    expect(validCustomer("Manuel Domingos", "9234567890")).toBe(false);
  });
  it("uses entity 10116", () => expect(PAYMENT_ENTITY).toBe("10116"));
  it("uses reference 922955138", () => expect(PAYMENT_REFERENCE).toBe("922955138"));
  it("generates codes with the FP-XXXXX format", () => expect(newOrderCode()).toMatch(/^FP-\d{5}$/));
  it("uses the requested WhatsApp number", () => expect(new URL(WHATSAPP_URL).searchParams.get("phone")).toBe("244958958970"));
  it("prepares the requested WhatsApp message", () => {
    expect(WHATSAPP_MESSAGE).toBe("já fiz o pagamento e abaixo deixo o comprovativo esperando receber a receita em pdf");
    expect(new URL(WHATSAPP_URL).searchParams.get("text")).toBe(WHATSAPP_MESSAGE);
  });
  it("preserves selected additions across the payment URL", () => expect(parseOrderSearch({ consulta: "true", guia: true, pedido: "FP-12345" })).toEqual({ consulta: true, guia: true, pedido: "FP-12345" }));
  it("does not accept an arbitrary price or invalid order code", () => expect(parseOrderSearch({ total: 1, consulta: "false", guia: "false", pedido: "fake" })).toEqual({ consulta: false, guia: false, pedido: undefined }));
});