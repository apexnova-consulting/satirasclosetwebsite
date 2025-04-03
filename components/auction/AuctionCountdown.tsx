"use client";

import { useState, useEffect } from "react";
import { calculateTimeLeft } from "@/lib/utils";

interface AuctionCountdownProps {
  endTime: Date | string
} 