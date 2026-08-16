import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { WeddingConfig } from '../types';
import { CalendarPlus, Download } from 'lucide-react';
import { generateGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

interface GardenSectionProps {
  config: WeddingConfig;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const GardenSection: React.FC<GardenSectionProps> = ({ config }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Slow, organic parallax and breathing scale for the garden pathway
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1.0, 1.06]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['-2%', '3%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  });

  useEffect(() => {
    const targetDate = new Date(config.weddingDate.fullDateIso).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [config.weddingDate.fullDateIso]);

  const googleCalUrl = generateGoogleCalendarUrl(config);

  return (
    <section
      id="the-date"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FAF7F2] py-20 px-4 select-none"
    >
      {/* Background Garden Path Illustration with Cinematic Parallax */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ scale: bgScale, y: bgY }}
          className="relative w-full h-full flex items-center justify-center will-change-transform"
        >
          <img
            src={config.artwork.garden}
            alt="Watercolor Garden Path leading to Palace"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center max-w-[1000px] mx-auto opacity-95 transition-opacity duration-700"
          />
          {/* Continuous Cream Paper Gradient Feathers */}
          <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-10 pointer-events-none" />
          
          {/* Subtle central atmospheric scrim for letterpress readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/40 via-transparent to-[#FAF7F2]/40 pointer-events-none" />
        </motion.div>
      </div>

      {/* Content Integrated Inside a High-Contrast Stationery Plaque */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-20 w-full max-w-lg mx-auto text-center my-auto flex flex-col items-center justify-center"
      >
        <div className="w-full bg-[#FAF7F2]/94 backdrop-blur-sm border border-[#D9CEBF] shadow-[0_10px_35px_rgba(40,35,30,0.06)] rounded-2xl py-8 sm:py-10 px-5 sm:px-8 relative overflow-hidden">
          {/* Corner gold brackets */}
          <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#8C774E]/40" />
          <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#8C774E]/40" />
          <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[#8C774E]/40" />
          <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#8C774E]/40" />

          {/* Subtle Botanical Header */}
          <div className="inline-flex items-center space-x-3 text-[#4A5E47] mb-2.5">
            <span className="w-6 h-px bg-[#4A5E47]/40" />
            <span className="font-['Montserrat'] text-[10px] tracking-[0.3em] uppercase text-[#4A5E47] font-semibold">
              THE DATE
            </span>
            <span className="w-6 h-px bg-[#4A5E47]/40" />
          </div>

          {/* Date Display */}
          <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl text-[#1A1614] font-normal tracking-[0.06em] mb-1">
            {config.weddingDate.displayDate}
          </h2>
          
          <p className="font-['Cormorant_Garamond'] text-base sm:text-lg italic text-[#4A4036] mb-6 font-medium">
            {config.weddingDate.dayOfWeek} at {config.weddingDate.time}
          </p>

          {/* Countdown Timer: Clear high-contrast numerals */}
          <div className="w-full max-w-md mx-auto mb-6 px-1">
            <div className="flex items-center justify-center space-x-2.5 sm:space-x-5 py-3.5 border-y border-[#D9CEBF]">
              {/* Days */}
              <div className="flex flex-col items-center justify-center px-1">
                <span className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl font-normal text-[#1A1614] tracking-tight">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="font-['Montserrat'] text-[9px] tracking-[0.2em] uppercase text-[#4A4036] font-semibold mt-0.5">
                  DAYS
                </span>
              </div>

              <span className="text-[#8C774E] font-serif text-lg">&bull;</span>

              {/* Hours */}
              <div className="flex flex-col items-center justify-center px-1">
                <span className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl font-normal text-[#1A1614] tracking-tight">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="font-['Montserrat'] text-[9px] tracking-[0.2em] uppercase text-[#4A4036] font-semibold mt-0.5">
                  HOURS
                </span>
              </div>

              <span className="text-[#8C774E] font-serif text-lg">&bull;</span>

              {/* Minutes */}
              <div className="flex flex-col items-center justify-center px-1">
                <span className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl font-normal text-[#1A1614] tracking-tight">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="font-['Montserrat'] text-[9px] tracking-[0.2em] uppercase text-[#4A4036] font-semibold mt-0.5">
                  MINS
                </span>
              </div>

              <span className="text-[#8C774E] font-serif text-lg">&bull;</span>

              {/* Seconds */}
              <div className="flex flex-col items-center justify-center px-1">
                <span className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl font-normal text-[#7A6232] tracking-tight">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="font-['Montserrat'] text-[9px] tracking-[0.2em] uppercase text-[#4A4036] font-semibold mt-0.5">
                  SECS
                </span>
              </div>
            </div>
          </div>

          {/* Save the Date & Calendar export links */}
          <div className="flex flex-col items-center space-y-2.5">
            <p className="font-['Pinyon_Script'] text-2xl sm:text-3xl text-[#7A6232]">
              Save the date
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <a
                href={googleCalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 py-1.5 px-3.5 rounded-full border border-[#D9CEBF] bg-[#FAF7F2] hover:bg-[#7A6232] text-[#1A1614] hover:text-[#FAF7F2] transition-colors duration-300 text-[11px] font-['Montserrat'] tracking-wider font-medium shadow-2xs"
              >
                <CalendarPlus className="w-3 h-3 text-[#7A6232] group-hover:text-[#FAF7F2]" />
                <span>GOOGLE CALENDAR</span>
              </a>

              <button
                onClick={() => downloadIcsFile(config)}
                className="inline-flex items-center space-x-1.5 py-1.5 px-3.5 rounded-full border border-[#D9CEBF] bg-[#FAF7F2] hover:bg-[#7A6232] text-[#1A1614] hover:text-[#FAF7F2] transition-colors duration-300 text-[11px] font-['Montserrat'] tracking-wider font-medium shadow-2xs cursor-pointer"
              >
                <Download className="w-3 h-3 text-[#7A6232]" />
                <span>APPLE / OUTLOOK (.ICS)</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
