import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { WeddingConfig } from '../types';

interface TerraceStorySectionProps {
  config: WeddingConfig;
}

export const TerraceStorySection: React.FC<TerraceStorySectionProps> = ({ config }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Stepping onto the terrace overlooking gardens - delicate atmospheric translation
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.0, 1.05]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['-2%', '3%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);

  return (
    <section
      id="our-story"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FAF7F2] py-20 px-4 select-none"
    >
      {/* Background Romantic Terrace Illustration with Parallax */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ scale: bgScale, y: bgY }}
          className="relative w-full h-full flex items-center justify-center will-change-transform"
        >
          <img
            src={config.artwork.terrace}
            alt="Romantic Palace Terrace Overlooking Gardens in Watercolor"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center max-w-[1000px] mx-auto opacity-95 transition-opacity duration-700"
          />
          {/* Continuous Cream Paper Gradient Feathers */}
          <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-10 pointer-events-none" />
          
          {/* Soft wash across center */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/40 via-transparent to-[#FAF7F2]/40 pointer-events-none" />
        </motion.div>
      </div>

      {/* Content Plaque */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-20 w-full max-w-lg mx-auto text-center my-auto flex flex-col items-center justify-center px-2"
      >
        <div className="w-full bg-[#FAF7F2]/94 backdrop-blur-sm border border-[#D9CEBF] shadow-[0_10px_35px_rgba(40,35,30,0.06)] rounded-2xl py-8 sm:py-10 px-5 sm:px-8 relative overflow-hidden">
          {/* Corner gold brackets */}
          <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#8C774E]/40" />
          <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#8C774E]/40" />
          <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[#8C774E]/40" />
          <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#8C774E]/40" />

          {/* Category Tag */}
          <div className="inline-flex items-center space-x-3 text-[#9E5D65] mb-2.5">
            <span className="w-6 h-px bg-[#9E5D65]/40" />
            <span className="font-['Montserrat'] text-[10px] tracking-[0.3em] uppercase text-[#9E5D65] font-semibold">
              OUR STORY
            </span>
            <span className="w-6 h-px bg-[#9E5D65]/40" />
          </div>

          {/* Heading */}
          <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl text-[#1A1614] font-normal tracking-[0.04em] mb-4">
            How Forever Began
          </h2>

          {/* Intimate Story Quote */}
          <div className="relative max-w-md mx-auto py-2 mb-4">
            <p className="font-['Cormorant_Garamond'] text-lg sm:text-xl italic text-[#1A1614] leading-relaxed font-medium">
              &ldquo;{config.story.quote}&rdquo;
            </p>
          </div>

          <div className="w-12 h-px bg-[#8C774E]/40 mx-auto mb-5" />

          {/* Narrative Paragraphs */}
          <div className="space-y-3.5 font-['Cormorant_Garamond'] text-base sm:text-lg text-[#2A241E] leading-relaxed max-w-md mx-auto text-justify sm:text-center font-normal">
            {config.story.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Milestones as delicate letterpress markers */}
          {config.story.milestones && config.story.milestones.length > 0 && (
            <div className="mt-6 pt-5 border-t border-[#D9CEBF] grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
              {config.story.milestones.map((m, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <span className="font-['Montserrat'] text-[11px] font-semibold tracking-widest text-[#7A6232]">
                    {m.year}
                  </span>
                  <span className="font-['Playfair_Display'] text-sm font-medium text-[#1A1614] mt-0.5">
                    {m.title}
                  </span>
                  <span className="font-['Cormorant_Garamond'] text-xs text-[#4A4036] mt-0.5 line-clamp-2 font-medium">
                    {m.description}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Calligraphic Signoff */}
          <div className="mt-6">
            <span className="font-['Pinyon_Script'] text-2xl sm:text-3xl text-[#7A6232]">
              {config.partnerOne.firstName} &amp; {config.partnerTwo.firstName}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
