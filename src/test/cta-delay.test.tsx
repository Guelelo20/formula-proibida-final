import { act, renderHook } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { useDelayedCta } from "@/hooks/use-delayed-cta";
import { CTA_DELAY_MS } from "@/lib/funnel";

afterEach(() => vi.useRealTimers());

it("reveals the CTA after exactly 7 minutes and 20 seconds", () => {
  vi.useFakeTimers();
  const { result } = renderHook(() => useDelayedCta());

  expect(CTA_DELAY_MS).toBe(440000);
  expect(result.current).toBe(false);

  act(() => vi.advanceTimersByTime(439999));
  expect(result.current).toBe(false);

  act(() => vi.advanceTimersByTime(1));
  expect(result.current).toBe(true);
});
