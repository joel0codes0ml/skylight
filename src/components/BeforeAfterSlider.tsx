import React, { useState, useRef, useEffect } from 'react';
import { Eye } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title: string;
}

export default function BeforeAfterSlider({ beforeImage, afterImage, title }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0-100)
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging || e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  // Prevent scrolling on touch screens when dragging the slider
  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchmove', preventDefault, { passive: false });
    return () => {
      document.removeEventListener('touchmove', preventDefault);
    };
  }, [isDragging]);

  return (
    <div id="before-after-card" className="relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xl group">
      <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
        <h4 className="font-display font-semibold text-slate-800 text-sm md:text-base flex items-center gap-2">
          <Eye className="w-4 h-4 text-brand-600" />
          {title}
        </h4>
        <div className="flex gap-2 text-xs">
          <span className="px-2 py-1 bg-red-50 text-red-600 rounded-md font-medium">Before</span>
          <span className="px-2 py-1 bg-green-50 text-green-600 rounded-md font-medium">After</span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative h-[250px] sm:h-[350px] w-full overflow-hidden select-none cursor-ew-resize"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
      >
        {/* AFTER IMAGE (Background) */}
        <img
          src={afterImage}
          alt="After clean results"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />

        {/* BEFORE IMAGE (Clipped Overlay) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img
            src={beforeImage}
            alt="Before cleaning"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: containerRef.current?.getBoundingClientRect().width || '100%' }}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* SLIDER LINE & HANDLE */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border-2 border-brand-500 rounded-full flex items-center justify-center shadow-lg pointer-events-none">
            <span className="text-brand-600 text-xs font-bold font-sans flex items-center justify-center gap-0.5 select-none">
              ‹›
            </span>
          </div>
        </div>

        {/* Labels overlay */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded select-none pointer-events-none z-10">
          Drag to compare
        </div>
      </div>
    </div>
  );
}
