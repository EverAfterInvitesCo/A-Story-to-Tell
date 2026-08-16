import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { WeddingConfig } from '../types';
import { Shirt, Sparkles, Wine, Hotel } from 'lucide-react';

interface StationeryDetailsSectionProps {
  config: WeddingConfig;
}

export const StationeryDetailsSection: React.FC<StationeryDetailsSectionProps> = ({ config }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Discovering the wedding stationery suite - gentle scaling and slow parallax
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.0, 1.05]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['-2%', '3%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);

  return (
    <section
      id="wedding-details"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FAF7F2] py-20 px-4 select-none"
    >
      {/* Background Stationery Illustration with Parallax */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ scale: bgScale, y: bgY }}
          className="relative w-full h-full flex items-center justify-center will-change-transform"
        >
          <img
            src={config.artwork.stationery}
            alt="Handmade Wedding Invitation Stationery and Garden in Watercolor"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center max-w-[1000px] mx-auto opacity-95 transition-opacity duration-700"
          />
          {/* Continuous Cream Paper Gradient Feathers */}
          <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-10 pointer-events-none" />
          
          {/* Subtle center scrim */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/40 via-transparent to-[#FAF7F2]/40 pointer-events-none" />
        </motion.div>
      </div>

      {/* Content Plaque */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-20 w-full max-w-xl mx-auto text-center my-auto flex flex-col items-center justify-center px-2"
      >
        <div className="w-full bg-[#FAF7F2]/94 backdrop-blur-sm border border-[#D9CEBF] shadow-[0_10px_35px_rgba(40,35,30,0.06)] rounded-2xl py-8 sm:py-10 px-5 sm:px-8 relative overflow-hidden">
          {/* Corner gold brackets */}
          <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#8C774E]/40" />
          <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#8C774E]/40" />
          <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[#8C774E]/40" />
          <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#8C774E]/40" />

          {/* Category Tag */}
          <div className="inline-flex items-center space-x-3 text-[#7A6232] mb-2.5">
            <span className="w-6 h-px bg-[#7A6232]/40" />
            <span className="font-['Montserrat'] text-[10px] tracking-[0.3em] uppercase text-[#7A6232] font-semibold">
              THE DETAILS
            </span>
            <span className="w-6 h-px bg-[#7A6232]/40" />
          </div>

          {/* Heading */}
          <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl text-[#1A1614] font-normal tracking-[0.04em] mb-1">
            Wedding Information
          </h2>

          <p className="font-['Cormorant_Garamond'] text-base italic text-[#4A4036] font-medium mb-6">
            Everything you need to know for our special day
          </p>

          {/* Details Grid - High-Contrast Typography */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 text-left border-y border-[#D9CEBF] py-5 my-2">
            {/* Dress Code */}
            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 text-[#7A6232]">
                <Shirt className="w-3.5 h-3.5" />
                <span className="font-['Montserrat'] text-[10px] font-semibold tracking-widest uppercase text-[#1A1614]">
                  DRESS CODE
                </span>
              </div>
              <p className="font-['Playfair_Display'] text-sm sm:text-base text-[#1A1614] font-semibold">
                {config.details.dressCode.title}
              </p>
              <p className="font-['Cormorant_Garamond'] text-sm text-[#2A241E] leading-snug font-normal">
                {config.details.dressCode.description}
              </p>
              {config.details.dressCode.paletteNote && (
                <p className="font-['Cormorant_Garamond'] text-xs text-[#4A5E47] italic pt-0.5 font-medium">
                  {config.details.dressCode.paletteNote}
                </p>
              )}
            </div>

            {/* Ceremony */}
            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 text-[#7A6232]">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="font-['Montserrat'] text-[10px] font-semibold tracking-widest uppercase text-[#1A1614]">
                  CEREMONY
                </span>
              </div>
              <p className="font-['Playfair_Display'] text-sm sm:text-base text-[#1A1614] font-semibold">
                {config.details.ceremony.time}
              </p>
              <p className="font-['Cormorant_Garamond'] text-sm text-[#2A241E] leading-snug font-normal">
                {config.details.ceremony.location}
              </p>
              {config.details.ceremony.note && (
                <p className="font-['Cormorant_Garamond'] text-xs text-[#4A4036] italic pt-0.5 font-medium">
                  {config.details.ceremony.note}
                </p>
              )}
            </div>

            {/* Reception */}
            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 text-[#7A6232]">
                <Wine className="w-3.5 h-3.5" />
                <span className="font-['Montserrat'] text-[10px] font-semibold tracking-widest uppercase text-[#1A1614]">
                  RECEPTION
                </span>
              </div>
              <p className="font-['Playfair_Display'] text-sm sm:text-base text-[#1A1614] font-semibold">
                {config.details.reception.time}
              </p>
              <p className="font-['Cormorant_Garamond'] text-sm text-[#2A241E] leading-snug font-normal">
                {config.details.reception.location}
              </p>
              {config.details.reception.note && (
                <p className="font-['Cormorant_Garamond'] text-xs text-[#4A4036] italic pt-0.5 font-medium">
                  {config.details.reception.note}
                </p>
              )}
            </div>

            {/* Accommodations */}
            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 text-[#7A6232]">
                <Hotel className="w-3.5 h-3.5" />
                <span className="font-['Montserrat'] text-[10px] font-semibold tracking-widest uppercase text-[#1A1614]">
                  ACCOMMODATION
                </span>
              </div>
              <p className="font-['Playfair_Display'] text-sm sm:text-base text-[#1A1614] font-semibold">
                {config.details.travelAccommodation ? config.details.travelAccommodation.title : 'Guest Stays'}
              </p>
              <p className="font-['Cormorant_Garamond'] text-sm text-[#2A241E] leading-snug font-normal">
                {config.details.travelAccommodation?.details || 'Reserved block of rooms available nearby.'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
