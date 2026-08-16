import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { WeddingConfig } from '../types';
import { Heart, Instagram, Facebook, ArrowUp } from 'lucide-react';

interface FinalSceneSectionProps {
  config: WeddingConfig;
}

export const FinalSceneSection: React.FC<FinalSceneSectionProps> = ({ config }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end']
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['-3%', '1%']);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="final-scene"
      ref={sectionRef}
      className="relative min-h-[85vh] w-full flex flex-col items-center justify-between overflow-hidden bg-[#FAF7F2] py-20 px-4 select-none"
    >
      {/* Background Garden Path Illustration with gentle parallax */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ scale: bgScale, y: bgY }}
          className="relative w-full h-full flex items-center justify-center will-change-transform"
        >
          <img
            src={config.artwork.footer || "./footer.jpeg"}
            alt="Farewell in Watercolor"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center max-w-[1000px] mx-auto opacity-80 transition-opacity duration-700"
          />
          <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/50 via-transparent to-[#FAF7F2]/70 pointer-events-none" />
        </motion.div>
      </div>

      {/* Center Emotional Farewell Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 w-full max-w-md mx-auto text-center my-auto flex flex-col items-center justify-center px-4 pt-8"
      >
        <div className="w-full bg-[#FAF7F2]/95 backdrop-blur-sm border border-[#D9CEBF] shadow-[0_10px_35px_rgba(40,35,30,0.06)] rounded-2xl py-8 px-6 relative overflow-hidden flex flex-col items-center">
          {/* Corner gold brackets */}
          <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#8C774E]/40" />
          <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#8C774E]/40" />
          <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[#8C774E]/40" />
          <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#8C774E]/40" />

          {/* Subtle Heart */}
          <div className="w-9 h-9 rounded-full border border-[#7A6232] flex items-center justify-center text-[#7A6232] mb-3 bg-[#FAF7F2]">
            <Heart className="w-4 h-4 fill-[#7A6232]/20" />
          </div>

          {/* Heading */}
          <h2 className="font-['Playfair_Display'] text-xl sm:text-2xl md:text-3xl text-[#1A1614] font-normal tracking-[0.04em] mb-4 leading-relaxed max-w-sm">
            {config.finalMessage.heading}
          </h2>

          {/* Signature */}
          <div className="space-y-0.5 mb-6">
            <p className="font-['Cormorant_Garamond'] text-base italic text-[#4A4036] font-medium">
              With love,
            </p>
            <p className="font-['Pinyon_Script'] text-3xl sm:text-4xl text-[#7A6232]">
              {config.partnerOne.firstName} &amp; {config.partnerTwo.firstName}
            </p>
          </div>

          {/* Return to top pill */}
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center space-x-1.5 py-1.5 px-5 rounded-full border border-[#7A6232] bg-[#FAF7F2] hover:bg-[#7A6232] text-[#1A1614] hover:text-[#FAF7F2] transition-all text-[10px] font-['Montserrat'] tracking-widest uppercase font-semibold cursor-pointer"
          >
            <ArrowUp className="w-3 h-3 text-[#7A6232] group-hover:text-[#FAF7F2] group-hover:-translate-y-0.5 transition-transform" />
            <span>RETURN TO TOP</span>
          </button>
        </div>
      </motion.div>

      {/* Footer Attribution & Social Placeholders */}
      <div className="relative z-20 w-full max-w-md mx-auto text-center pt-6 border-t border-[#D9CEBF]/50 space-y-2">
        {/* Social Links */}
        <div className="flex items-center justify-center space-x-3 text-[#7A6232]">
          {config.finalMessage.socialLinks.instagram && (
            <a
              href={config.finalMessage.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-[#D9CEBF] bg-[#FAF7F2]/90 hover:bg-[#7A6232] text-[#4A4036] hover:text-[#FAF7F2] hover:border-[#7A6232] transition-all duration-300 shadow-xs"
              aria-label="Instagram @everafterinvites"
            >
              <Instagram className="w-4 h-4" />
            </a>
          )}
          {config.finalMessage.socialLinks.tiktok && (
            <a
              href={config.finalMessage.socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-[#D9CEBF] bg-[#FAF7F2]/90 hover:bg-[#7A6232] text-[#4A4036] hover:text-[#FAF7F2] hover:border-[#7A6232] transition-all duration-300 shadow-xs flex items-center justify-center"
              aria-label="TikTok @everafterinvites"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.32 0 .62.06.9.16V9.28a6.34 6.34 0 0 0-.9-.07A6.34 6.34 0 0 0 3 15.55 6.34 6.34 0 0 0 9.34 21.9a6.34 6.34 0 0 0 6.34-6.34V8.47a8.28 8.28 0 0 0 4.91 1.6V6.69z" />
              </svg>
            </a>
          )}
          {config.finalMessage.socialLinks.facebook && (
            <a
              href={config.finalMessage.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-[#D9CEBF] bg-[#FAF7F2]/90 hover:bg-[#7A6232] text-[#4A4036] hover:text-[#FAF7F2] hover:border-[#7A6232] transition-all duration-300 shadow-xs"
              aria-label="Facebook EverAfterInvites"
            >
              <Facebook className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Attribution */}
        <p className="font-['Cormorant_Garamond'] text-xs text-[#73685C] tracking-wide">
          {config.finalMessage.attribution}
        </p>

        <p className="font-['Montserrat'] text-[9px] text-[#A69066] tracking-[0.2em] uppercase">
          &copy; {new Date().getFullYear()} EverAfterInvites &bull; All Rights Reserved
        </p>
      </div>
    </footer>
  );
};
