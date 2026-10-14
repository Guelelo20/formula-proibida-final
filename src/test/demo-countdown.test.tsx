import { act, renderHook } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { countdownSeconds, DEMO_DURATION_MS, formatCountdown, useDemoCountdown } from "@/hooks/use-demo-countdown";

afterEach(() => vi.useRealTimers());

it("starts the requested one-hour demonstration at 60:00", () => {
  expect(DEMO_DURATION_MS).toBe(3600000);
  expect(formatCountdown(countdownSeconds(3600000, 0))).toBe("60:00");
});

it("counts down with elapsed time and stops at zero without looping", () => {
  vi.useFakeTimers();
  const { result } = renderHook(() => useDemoCountdown());
  expect(result.current).toBe(3600);
  act(() => vi.advanceTimersByTime(1000));
  expect(formatCountdown(result.current)).toBe("59:59");
  act(() => vi.advanceTimersByTime(3599000));
  expect(result.current).toBe(0);
  act(() => vi.advanceTimersByTime(60000));
  expect(formatCountdown(result.current)).toBe("00:00");
});