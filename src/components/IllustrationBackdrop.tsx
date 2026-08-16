import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface IllustrationBackdropProps {
  imageSrc: string;
  altText: string;
  overlayOpacity?: number;
  blendMode?: string;
  zoomOnScroll?: boolean;
  priority?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const IllustrationBackdrop: React.FC<IllustrationBackdropProps> = ({
  imageSrc,
  altText,
  overlayOpacity = 0.15,
  blendMode = 'normal',
  zoomOnScroll = false,
  priority = false,
  className = '',
  children
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    zoomOnScroll ? [1.08, 1.0, 1.05] : [1.0, 1.02, 1.04]
  );
  
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '-4%']
  );

  // Normalize image path for Vite static serving
  const normalizedSrc = imageSrc.startsWith('/') ? imageSrc : `/${imageSrc}`;

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-[#FAF7F2] ${className}`}
    >
      {/* Background Illustration Container */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          style={{ scale, y }}
          className="relative w-full h-full will-change-transform"
        >
          {/* Main Watercolor Illustration */}
          {!imageError ? (
            <img
              src={normalizedSrc}
              alt={altText}
              loading={priority ? 'eager' : 'lazy'}
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                // If direct path fails, try fallback or public artwork path
                if (!normalizedSrc.startsWith('/artwork/')) {
                  // retry with /artwork prefix
                  const img = new Image();
                  img.src = `/artwork${normalizedSrc}`;
                  img.onload = () => setImageLoaded(true);
                  img.onerror = () => setImageError(true);
                } else {
                  setImageError(true);
                }
              }}
              className={`w-full h-full object-cover object-center transition-opacity duration-1000 ease-out ${
                imageLoaded ? 'opacity-95' : 'opacity-80'
              }`}
              style={{
                filter: 'contrast(1.02) saturate(0.98)',
                mixBlendMode: blendMode as any
              }}
            />
          ) : (
            /* Graceful Handcrafted Watercolor Painted Texture Fallback */
            <div className="w-full h-full bg-gradient-to-b from-[#F5EFEB] via-[#EFE8DD] to-[#FAF7F2] flex items-center justify-center">
              <div className="w-full h-full opacity-40 bg-[radial-gradient(#C49298_1px,transparent_1px)] [background-size:24px_24px]" />
            </div>
          )}

          {/* Organic Hand-painted Paper & Watercolor Edge Blends */}
          {/* Top Edge Feather Blend */}
          <div className="absolute top-0 inset-x-0 h-32 md:h-48 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent pointer-events-none z-10" />

          {/* Bottom Edge Feather Blend */}
          <div className="absolute bottom-0 inset-x-0 h-36 md:h-56 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/85 to-transparent pointer-events-none z-10" />

          {/* Center Light Scrim for Typographic Legibility */}
          <div
            className="absolute inset-0 bg-[#FAF7F2] pointer-events-none"
            style={{ opacity: overlayOpacity }}
          />

          {/* Delicate Antique Paper Grain Vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(235,225,210,0.4)] pointer-events-none" />
        </motion.div>
      </div>

      {/* Content Layer (Foreground) */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};
