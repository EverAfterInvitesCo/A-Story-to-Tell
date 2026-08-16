import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { WeddingConfig } from '../types';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

interface PalaceSectionProps {
  config: WeddingConfig;
}

export const PalaceSection: React.FC<PalaceSectionProps> = ({ config }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Approaching the palace courtyard - gentle zoom and depth translation
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.0, 1.05]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['-2%', '3%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);

  return (
    <section
      id="venue-palace"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FAF7F2] py-20 px-4 select-none"
    >
      {/* Background Palace Courtyard Illustration with Scroll-driven Parallax */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ scale: bgScale, y: bgY }}
          className="relative w-full h-full flex items-center justify-center will-change-transform"
        >
          <img
            src={config.artwork.palace}
            alt="Palace Courtyard and Fountain in Watercolor"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center max-w-[1000px] mx-auto opacity-95 transition-opacity duration-700"
          />
          {/* Continuous Cream Paper Gradient Feathers */}
          <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-10 pointer-events-none" />
          
          {/* Delicate Scrim for courtyard negative space */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/40 via-transparent to-[#FAF7F2]/40 pointer-events-none" />
        </motion.div>
      </div>

      {/* Foreground Content Plaque */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-20 w-full max-w-md mx-auto text-center my-auto flex flex-col items-center justify-center px-2"
      >
        <div className="w-full bg-[#FAF7F2]/94 backdrop-blur-sm border border-[#D9CEBF] shadow-[0_10px_35px_rgba(40,35,30,0.06)] rounded-2xl py-8 sm:py-10 px-6 sm:px-8 relative overflow-hidden">
          {/* Corner gold brackets */}
          <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#8C774E]/40" />
          <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#8C774E]/40" />
          <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[#8C774E]/40" />
          <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#8C774E]/40" />

          {/* Tag */}
          <div className="inline-flex items-center space-x-3 text-[#7A6232] mb-2.5">
            <span className="w-6 h-px bg-[#7A6232]/40" />
            <span className="font-['Montserrat'] text-[10px] tracking-[0.3em] uppercase text-[#7A6232] font-semibold">
              THE VENUE
            </span>
            <span className="w-6 h-px bg-[#7A6232]/40" />
          </div>

          {/* Venue Title */}
          <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl text-[#1A1614] font-normal tracking-[0.04em] mb-1.5 leading-tight">
            {config.venue.name}
          </h2>

          {config.venue.subname && (
            <p className="font-['Cormorant_Garamond'] text-base sm:text-lg italic text-[#4A5E47] font-medium mb-4">
              {config.venue.subname}
            </p>
          )}

          {/* Venue Details - High Contrast Letterpress */}
          <div className="w-full my-4 py-4 border-y border-[#D9CEBF] text-center space-y-2">
            <div className="flex items-center justify-center space-x-1.5 text-[#7A6232]">
              <MapPin className="w-3.5 h-3.5" />
              <span className="font-['Montserrat'] text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1A1614]">
                {config.venue.city}, {config.venue.country}
              </span>
            </div>

            <p className="font-['Cormorant_Garamond'] text-base text-[#2A241E] leading-relaxed max-w-xs mx-auto font-normal">
              {config.venue.address}
            </p>

            {config.venue.valetNote && (
              <p className="font-['Cormorant_Garamond'] text-xs text-[#4A4036] italic pt-1 font-medium">
                {config.venue.valetNote}
              </p>
            )}
          </div>

          {/* View on Map Button */}
          <a
            href={config.venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center space-x-2 py-2.5 px-6 rounded-full border border-[#D9CEBF] bg-[#FAF7F2] hover:bg-[#7A6232] text-[#1A1614] hover:text-[#FAF7F2] transition-all duration-300 font-['Montserrat'] text-[11px] tracking-[0.25em] uppercase font-semibold shadow-2xs"
          >
            <Navigation className="w-3.5 h-3.5 text-[#7A6232] group-hover:text-[#FAF7F2] transition-colors" />
            <span>VIEW ON MAP</span>
            <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};
