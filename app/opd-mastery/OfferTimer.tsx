"use client";

import { useEffect, useState } from "react";

/** Counts down to the end of the current day, matching the "TODAY ONLY" offer. */
function msUntilEndOfDay() {
  const now = new Date();
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0,
    0
  );
  return Math.max(0, endOfDay.getTime() - now.getTime());
}

function format(ms: number) {
  const total = Math.floor(ms / 1000);
  const hh = String(Math.floor(total / 3600)).padStart(2, "0");
  const mm = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const ss = String(total % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export default function OfferTimer({ className }: { className?: string }) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    setRemaining(msUntilEndOfDay());
    const id = setInterval(() => setRemaining(msUntilEndOfDay()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className={className}>
      <span aria-hidden="true">⏳</span> Offer Ends in{" "}
      <time suppressHydrationWarning>
        {remaining === null ? "--:--:--" : format(remaining)}
      </time>
    </p>
  );
}
