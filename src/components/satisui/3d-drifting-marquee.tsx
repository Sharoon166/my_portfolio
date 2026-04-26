'use client';

import { cn } from '@/lib/utils'; // Standard Shadcn utility
import {
  PanInfo,
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

// --- UTILS ---
function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

// --- TYPES ---
export interface MarqueeImage {
  src: string;
  alt: string;
}

export interface ThreeDDriftingMarqueeProps {
  images: MarqueeImage[];
  className?: string;
  cardClassName?: string;
  /** Width of the card in px (default: 384) */
  cardWidth?: number;
  /** Height of the card in px (default: 288) */
  cardHeight?: number;
  /** Negative gap creates overlap (default: -160) */
  gap?: number;
  /** Base automatic scroll speed (default: 1.0) */
  defaultVelocity?: number;
  /** Max skew angle in degrees (default: 15) */
  maxSkew?: number;
  /** Factor to scale drag speed (default: 1.2) */
  dragFactor?: number;
  /** If true, pauses the loop when hovering a card (default: true) */
  pauseOnHover?: boolean;
  /** Cinematic entry animation (default: false) */
  enableEntry?: boolean;
  /** Delay before entry animation starts (seconds) */
  entryAnimationDelay?: number;
  /** Duration of entry animation (seconds) */
  entryAnimationDuration?: number;
  /** Starting pixel distance for entry (default: 3000) */
  entryDistance?: number;
}

const ThreeDDriftingMarquee: React.FC<ThreeDDriftingMarqueeProps> = ({
  images,
  className,
  cardClassName,
  cardWidth = 384,
  cardHeight = 288,
  gap = -160,
  defaultVelocity = 1.0,
  maxSkew = 15,
  dragFactor = 1.2,
  pauseOnHover = true,
  enableEntry = false,
  entryAnimationDelay = 1,
  entryAnimationDuration = 2.5,
  entryDistance = 3000,
}) => {
  // 1. SETUP GEOMETRY
  const cardStep = cardWidth + gap;
  const totalWidth = images.length * cardStep;
  const min = -totalWidth / 2;
  const max = totalWidth / 2;

  // 2. MOTION VALUES
  const baseX = useMotionValue(0);
  const masterVelocity = useMotionValue(0);
  const hoverSpeed = useMotionValue(1);
  const smoothHover = useSpring(hoverSpeed, { damping: 40, stiffness: 100 });

  // --- ENTRY ANIMATION ---
  const entryX = useMotionValue(enableEntry ? entryDistance : 0);
  const entryVelocity = useVelocity(entryX);

  useEffect(() => {
    if (enableEntry) {
      const controls = animate(entryX, 0, {
        duration: entryAnimationDuration,
        ease: 'circOut',
        delay: entryAnimationDelay,
      });
      return () => controls.stop();
    }
  }, [
    enableEntry,
    entryX,
    entryAnimationDelay,
    entryAnimationDuration,
    entryDistance,
  ]);

  // 3. SCROLL INTEGRATION
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothScrollVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const smoothSkewVelocity = useSpring(masterVelocity, {
    damping: 60,
    stiffness: 200,
  });

  const skewX = useTransform(
    smoothSkewVelocity,
    [-1000, 1000],
    [maxSkew * 2, -maxSkew * 2],
    { clamp: true },
  );

  // 4. PHYSICS STATE
  const isDragging = useRef(false);
  const directionFactor = useRef<number>(1);
  const swipeVelocity = useRef(0);

  // 5. ANIMATION LOOP
  useAnimationFrame((t, delta) => {
    let moveBy = defaultVelocity * (delta / 16);

    // Scroll Boost
    const scrollBoost = smoothScrollVelocity.get() * 0.02;
    if (scrollBoost < 0) directionFactor.current = -1;
    else if (scrollBoost > 0) directionFactor.current = 1;

    moveBy += Math.abs(scrollBoost);
    moveBy *= directionFactor.current;

    // Hover Brake
    moveBy *= smoothHover.get();

    const currentEntryVel = entryVelocity.get();

    if (isDragging.current) {
      masterVelocity.set(swipeVelocity.current * 10);
    } else {
      // Momentum Phase
      if (Math.abs(swipeVelocity.current) > 0.05) {
        baseX.set(baseX.get() + swipeVelocity.current);
        swipeVelocity.current *= 0.975;
        masterVelocity.set(swipeVelocity.current * 10);
      } else {
        // Auto-scroll Phase
        swipeVelocity.current = 0;
        baseX.set(baseX.get() - moveBy);
        // Velocity Merge (Loop + Entry)
        masterVelocity.set(-moveBy * 5 + currentEntryVel * 0.05);
      }
    }
  });

  const handlePanStart = () => {
    isDragging.current = true;
    swipeVelocity.current = 0;
  };

  const handlePan = (_: any, info: PanInfo) => {
    baseX.set(baseX.get() + info.delta.x * dragFactor);
    swipeVelocity.current = info.velocity.x * 0.02;
  };

  const handlePanEnd = () => {
    isDragging.current = false;
  };

  const setHover = (isActive: boolean) => {
    if (pauseOnHover) {
      hoverSpeed.set(isActive ? 0 : 1);
    }
  };

  return (
    <div
      className={cn(
        'flex w-full items-center justify-center overflow-visible select-none',
        // Default perspective if not overridden
        '[perspective:5000px]',
        className,
      )}
    >
      <motion.div
        className='relative flex items-center justify-center [transform-style:preserve-3d]'
        style={{
          width: '100%',
          height: cardHeight + 100, // Safety buffer for tilt
          rotateY: 50,
          rotateX: -15,
          cursor: 'grab',
        }}
        whileTap={{ cursor: 'grabbing' }}
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
      >
        {images.map((image, index) => (
          <Card3D
            key={index}
            index={index}
            image={image}
            baseX={baseX}
            entryX={entryX}
            cardStep={cardStep}
            totalWidth={totalWidth}
            min={min}
            max={max}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            skewX={skewX}
            totalItems={images.length}
            setHover={setHover}
            cardClassName={cardClassName}
          />
        ))}
      </motion.div>
    </div>
  );
};

// --- INTERNAL CARD COMPONENT ---

interface Card3DProps {
  index: number;
  image: MarqueeImage;
  baseX: any;
  entryX: any;
  cardStep: number;
  totalWidth: number;
  min: number;
  max: number;
  cardWidth: number;
  cardHeight: number;
  skewX: any;
  totalItems: number;
  setHover: (active: boolean) => void;
  cardClassName?: string;
}

const Card3D: React.FC<Card3DProps> = ({
  index,
  image,
  baseX,
  entryX,
  cardStep,
  totalWidth,
  min,
  max,
  cardWidth,
  cardHeight,
  skewX,
  totalItems,
  setHover,
  cardClassName,
}) => {
  const x = useTransform([baseX, entryX], ([latestBaseX, latestEntryX]) => {
    const baseOffset = index * cardStep;
    const centeredOffset = baseOffset - totalWidth / 2;
    const infiniteX = wrap(min, max, (latestBaseX as number) + centeredOffset);
    return infiniteX + (latestEntryX as number);
  });

  const zIndex = totalItems - index;

  return (
    <motion.div
      className={cn(
        'group absolute left-1/2 top-1/2 overflow-hidden bg-background shadow-2xl',
        cardClassName,
      )}
      style={{
        x,
        y: '-50%',
        width: cardWidth,
        height: cardHeight,
        rotateY: -90,
        skewX: skewX,
        zIndex,
        transformStyle: 'preserve-3d',
        marginLeft: -cardWidth / 2,
      }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileHover={{
        z: 100,
        scale: 1.1,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        draggable={false}
        className='pointer-events-none object-cover grayscale transition-all duration-500 ease-in-out group-hover:grayscale-0'
      />
      {/* Overlay for better depth/lighting integration */}
      <div className='absolute inset-0 bg-background/20 transition-colors duration-500 pointer-events-none group-hover:bg-transparent' />
    </motion.div>
  );
};

export default ThreeDDriftingMarquee;
