import { useEffect, useState } from "react";
import { CTA_DELAY_MS } from "@/lib/funnel";

export function useDelayedCta() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), CTA_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);
  return visible;
}