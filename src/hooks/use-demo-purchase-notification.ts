import { useEffect, useState } from "react";

export const DEMO_NOTIFICATION_DELAY_MS = 2 * 60 * 1000;
const NOTIFICATION_VISIBLE_MS = 6500;
const NOTIFICATION_GAP_MS = 22000;

const demoPurchases = [
  { initials: "JM", name: "João Manuel", location: "Luanda" },
  { initials: "AF", name: "António Francisco", location: "Benguela" },
  { initials: "MC", name: "Mateus Costa", location: "Huambo" },
];

export function useDemoPurchaseNotification() {
  const [purchaseIndex, setPurchaseIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let visibleTimer: number | undefined;
    let nextTimer: number | undefined;
    let startTimer: number | undefined;

    const showNextNotification = () => {
      setVisible(true);
      visibleTimer = window.setTimeout(() => {
        setVisible(false);
        nextTimer = window.setTimeout(() => {
          setPurchaseIndex((index) => (index + 1) % demoPurchases.length);
          showNextNotification();
        }, NOTIFICATION_GAP_MS);
      }, NOTIFICATION_VISIBLE_MS);
    };

    startTimer = window.setTimeout(showNextNotification, DEMO_NOTIFICATION_DELAY_MS);

    return () => {
      if (startTimer) window.clearTimeout(startTimer);
      if (visibleTimer) window.clearTimeout(visibleTimer);
      if (nextTimer) window.clearTimeout(nextTimer);
    };
  }, []);

  return { notification: demoPurchases[purchaseIndex], visible };
}
