"use client";

import { useEffect, useState } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<{
    hours: string;
    minutes: string;
    seconds: string;
  }>({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    function calculateTime() {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const diff = Math.max(0, endOfDay.getTime() - now.getTime());
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });
    }

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex items-center gap-1 font-mono font-bold tracking-tight">
      <span className="bg-black/10 px-1.5 py-0.5 rounded text-black text-xs sm:text-sm">
        {timeLeft.hours}h
      </span>
      <span>:</span>
      <span className="bg-black/10 px-1.5 py-0.5 rounded text-black text-xs sm:text-sm">
        {timeLeft.minutes}m
      </span>
      <span>:</span>
      <span className="bg-black/10 px-1.5 py-0.5 rounded text-black text-xs sm:text-sm">
        {timeLeft.seconds}s
      </span>
    </span>
  );
}
