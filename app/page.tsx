"use client";

import { useRef, useState } from "react";

export default function Home() {
  const images = [
    "/img/1.png",
    "/img/2.png",
    "/img/3.png",
    "/img/4.png",
    "/img/5.png",
    "/img/6.png",
    "/img/7.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleStart = (x: number) => {
    startX.current = x;
    isDragging.current = true;
  };

  const handleEnd = (x: number) => {
    if (!isDragging.current || startX.current === null) return;

    const diff = startX.current - x;
    const threshold = 50;

    if (diff > threshold) next();
    else if (diff < -threshold) prev();

    startX.current = null;
    isDragging.current = false;
  };

  return (
    <div>PAGE NOT FOUND</div>
  );
}
