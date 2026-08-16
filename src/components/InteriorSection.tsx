import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { WeddingConfig } from '../types';
import { Sparkles, Heart, Utensils, Music, Moon, Clock } from 'lucide-react';

interface InteriorSectionProps {
  config: WeddingConfig;
}

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-3.5 h-3.5" />,
  Heart: <Heart className="w-3.5 h-3.5" />,
  Utensils: <Utensils className="w-3.5 h-3.5" />,
  Music: <Music className="w-3.5 h-3.5" />,
  Moon: <Moon className="w-3.5 h-3.5" />
};

export const InteriorSection: React.FC<InteriorSectionProps> = ({ config }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Entering the ballroom - subtle scaling and slow vertical shift
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.0, 1.05]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['-2%', '3%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);

  return (
    <section
      id="evening-schedule"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FAF7F2] py-20 px-4 select-none"
    >
      {/* Background Interior Ballroom Illustration with Scroll Parallax */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ scale: bgScale, y: bgY }}
          className="relative w-full h-full flex items-center justify-center will-change-transform"
        >
          <img
            src={config.artwork.interior}
            alt="Palace Ballroom and Grand Staircase in Watercolor"
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

      {/* Content: Editorial Schedule inside high-contrast plaque */}
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
          <div className="inline-flex items-center space-x-3 text-[#7A6232] mb-2.5">
            <span className="w-6 h-px bg-[#7A6232]/40" />
            <span className="font-['Montserrat'] text-[10px] tracking-[0.3em] uppercase text-[#7A6232] font-semibold">
              THE EVENING
            </span>
            <span className="w-6 h-px bg-[#7A6232]/40" />
          </div>

          {/* Heading */}
          <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl text-[#1A1614] font-normal tracking-[0.04em] mb-1">
            Order of Events
          </h2>

          <p className="font-['Cormorant_Garamond'] text-base italic text-[#4A4036] font-medium mb-6">
            A celebration of love, music, and joy
          </p>

          {/* Editorial Timeline with High-Contrast Typography */}
          <div className="w-full max-w-md mx-auto divide-y divide-[#D9CEBF] border-y border-[#D9CEBF] my-2">
            {config.schedule.map((item) => (
              <div
                key={item.id}
                className="py-3.5 flex flex-col sm:flex-row items-center sm:items-baseline justify-between text-center sm:text-left group"
              >
                {/* Time */}
                <div className="flex items-center space-x-2 text-[#7A6232] mb-1 sm:mb-0 sm:w-28 shrink-0">
                  <span className="text-[#7A6232]">
                    {item.iconName && iconMap[item.iconName] ? iconMap[item.iconName] : <Clock className="w-3.5 h-3.5" />}
                  </span>
                  <span className="font-['Montserrat'] text-[11px] tracking-wider uppercase font-semibold text-[#1A1614]">
                    {item.time}
                  </span>
                </div>

                {/* Event Description */}
                <div className="flex-1 sm:pl-4">
                  <h3 className="font-['Playfair_Display'] text-base sm:text-lg text-[#1A1614] font-medium">
                    {item.title}
                  </h3>
                  <p className="font-['Cormorant_Garamond'] text-sm text-[#2A241E] leading-snug mt-0.5 font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Subtle Calligraphic Note */}
          <div className="mt-6 flex items-center justify-center space-x-3 text-[#7A6232]">
            <span className="h-px w-6 bg-[#7A6232]/40" />
            <span className="font-['Pinyon_Script'] text-xl sm:text-2xl text-[#7A6232]">
              Dancing under the chandeliers
            </span>
            <span className="h-px w-6 bg-[#7A6232]/40" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
