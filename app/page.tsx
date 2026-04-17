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
    <div className="w-screen h-screen overflow-hidden bg-white dark:bg-black flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Slider track */}
        <div
          className="w-full h-full overflow-hidden touch-pan-y"
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
          onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
          onMouseDown={(e) => handleStart(e.clientX)}
          onMouseUp={(e) => handleEnd(e.clientX)}
          onMouseLeave={(e) => {
            if (isDragging.current) handleEnd(e.clientX);
          }}
        >
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((src, index) => (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 flex items-center justify-center"
              >
                <img
                  src={src}
                  alt={`Image ${index + 1}`}
                  className="max-w-full max-h-full object-contain select-none pointer-events-none"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Left button */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 text-white w-14 h-14 text-3xl rounded-full shadow-lg active:scale-95 flex items-center justify-center"
        >
          ‹
        </button>

        {/* Right button */}
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 text-white w-14 h-14 text-3xl rounded-full shadow-lg active:scale-95 flex items-center justify-center"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex
                  ? "bg-black dark:bg-white"
                  : "bg-gray-400 dark:bg-gray-600"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
