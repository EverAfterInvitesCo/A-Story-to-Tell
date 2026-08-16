import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { WeddingConfig } from '../types';
import { ChevronDown } from 'lucide-react';

interface GateSectionProps {
  config: WeddingConfig;
}

export const GateSection: React.FC<GateSectionProps> = ({ config }) => {
  const sectionRef = React.useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  // Smooth, subtle zoom to feel like stepping through the ornate gate
  const gateScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.15]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.5]);
  const textY = useTransform(scrollYProgress, [0, 0.85], [0, -25]);

  const scrollToNext = () => {
    const nextSection = document.getElementById('the-date');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero-gate"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden bg-[#FAF7F2] select-none py-6 sm:py-8"
    >
      {/* Background Gate Illustration with Scroll-driven Parallax */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ scale: gateScale }}
          className="relative w-full h-full flex items-center justify-center will-change-transform"
        >
          <img
            src={config.artwork.gate}
            alt="Wrought Iron Garden Gate in Watercolor"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center max-w-[1000px] mx-auto opacity-95 transition-opacity duration-700"
          />

          {/* Gentle Watercolor Parchment Feathers */}
          <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#FAF7F2]/60 to-transparent z-10 pointer-events-none" />

          {/* Central atmospheric scrim */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/30 via-transparent to-[#FAF7F2]/40 pointer-events-none" />
        </motion.div>
      </div>

      {/* Top Monogram / Brand Accent */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        className="relative z-20 pt-4 sm:pt-6 text-center px-4"
      >
        <div className="inline-flex items-center justify-center space-x-3 text-[#7A6232]">
          <span className="h-px w-6 bg-[#7A6232]/40" />
          <span className="font-['Pinyon_Script'] text-2xl sm:text-3xl text-[#7A6232] drop-shadow-xs">
            {config.partnerOne.firstName[0]} &amp; {config.partnerTwo.firstName[0]}
          </span>
          <span className="h-px w-6 bg-[#7A6232]/40" />
        </div>
      </motion.div>

      {/* Main Wedding Invitation Typography Card */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-20 w-full max-w-lg mx-auto px-4 sm:px-6 text-center my-auto flex flex-col items-center justify-center"
      >
        <div className="w-full bg-[#FAF7F2]/92 backdrop-blur-sm border border-[#D9CEBF] shadow-[0_10px_35px_rgba(40,35,30,0.06)] rounded-2xl py-8 sm:py-10 px-6 sm:px-10 relative overflow-hidden">
          {/* Corner gold brackets */}
          <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#8C774E]/40" />
          <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#8C774E]/40" />
          <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[#8C774E]/40" />
          <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#8C774E]/40" />

          {/* Names */}
          <div className="mb-3">
            <h1 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal text-[#1A1614] tracking-[0.1em] leading-tight">
              {config.partnerOne.firstName.toUpperCase()}
              <span className="font-['Pinyon_Script'] lowercase mx-2 sm:mx-3 text-[#7A6232] text-2xl sm:text-3xl md:text-4xl align-baseline font-normal">
                &amp;
              </span>
              {config.partnerTwo.firstName.toUpperCase()}
            </h1>
          </div>

          {/* Subtitle */}
          <p className="font-['Cormorant_Garamond'] text-base sm:text-lg italic text-[#4A4036] tracking-widest font-medium mb-4">
            {config.invitationMessage.headline}
          </p>

          {/* Date Line */}
          <div className="inline-flex items-center space-x-2 py-1 px-4 mb-4 border-y border-[#D9CEBF]/80">
            <span className="font-['Montserrat'] text-[11px] sm:text-xs tracking-[0.25em] text-[#1A1614] uppercase font-semibold">
              {config.weddingDate.displayDate}
            </span>
          </div>

          {/* Formal Invitation Line */}
          <p className="font-['Cormorant_Garamond'] text-sm sm:text-base text-[#2E2620] max-w-sm mx-auto leading-relaxed font-normal">
            {config.invitationMessage.formalText}
          </p>
        </div>
      </motion.div>

      {/* Scroll to Enter Indicator */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="relative z-20 pb-4 sm:pb-6 text-center"
      >
        <button
          onClick={scrollToNext}
          className="group inline-flex flex-col items-center justify-center space-y-1.5 cursor-pointer text-[#7A6232] hover:text-[#2C2825] transition-colors duration-300 focus:outline-none"
          aria-label="Scroll to enter wedding world"
        >
          <span className="font-['Montserrat'] text-[10px] tracking-[0.3em] uppercase text-[#4A4036] group-hover:text-[#1A1614] font-semibold transition-colors">
            SCROLL TO ENTER
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="w-6 h-6 rounded-full flex items-center justify-center border border-[#D9CEBF] bg-[#FAF7F2]/90 shadow-xs group-hover:border-[#7A6232]"
          >
            <ChevronDown className="w-3.5 h-3.5 text-[#7A6232]" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};
