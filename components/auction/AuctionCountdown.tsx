"use client";

import { useState, useEffect } from "react";
import { calculateTimeLeft } from "@/lib/utils";

interface AuctionCountdownProps {
  endTime: Date | string;
  onEnd?: () => void;
}

export default function AuctionCountdown({ endTime, onEnd }: AuctionCountdownProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime));

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(endTime);
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.hasEnded) {
        clearInterval(timer);
        onEnd?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, onEnd]);

  if (timeLeft.hasEnded) {
    return <span className="text-red-600 font-medium">Auction ended</span>;
  }

  return (
    <div className="flex items-center space-x-2">
      {timeLeft.days > 0 && (
        <span className="text-gray-900 font-medium">{timeLeft.days}d</span>
      )}
      <span className="text-gray-900 font-medium">
        {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </span>
    </div>
  );
} 