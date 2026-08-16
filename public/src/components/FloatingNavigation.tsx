import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Compass, Calendar, MapPin, Clock, BookOpen, Send, Camera, Home } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export const FloatingNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero-gate');

  const navItems: NavItem[] = [
    { id: 'hero-gate', label: 'The Gate', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'the-date', label: 'The Date', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'venue-palace', label: 'The Venue', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'evening-schedule', label: 'Schedule', icon: <Clock className="w-3.5 h-3.5" /> },
    { id: 'our-story', label: 'Our Story', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'wedding-details', label: 'Details', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'rsvp', label: 'R.S.V.P.', icon: <Send className="w-3.5 h-3.5" /> },
    { id: 'gallery', label: 'Moments', icon: <Camera className="w-3.5 h-3.5" /> }
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Floating Menu Button: Discreet & Compact */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group p-2 sm:px-3 sm:py-2 rounded-full border border-[#D9CEBF]/80 bg-[#FAF7F2]/85 hover:bg-[#FAF7F2] text-[#2C2825] shadow-xs backdrop-blur-xs flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[#8C774E]"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isOpen ? (
            <X className="w-4 h-4 text-[#8C774E]" />
          ) : (
            <div className="flex items-center space-x-1.5">
              <Menu className="w-3.5 h-3.5 text-[#8C774E]" />
              <span className="hidden sm:inline font-['Montserrat'] text-[9px] tracking-[0.2em] uppercase font-medium text-[#554E46]">
                MENU
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Navigation Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-[#2C2825]/30 backdrop-blur-xs flex items-end sm:items-center justify-center sm:justify-end sm:pr-8 p-4"
          >
            <motion.div
              initial={{ y: 30, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 30, scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xs rounded-xl bg-[#FAF7F2] border border-[#D9CEBF] p-4 shadow-xl space-y-2"
            >
              <div className="text-center pb-2 border-b border-[#D9CEBF]/50">
                <span className="font-['Pinyon_Script'] text-2xl text-[#8C774E]">
                  Ahmed &amp; Fatema
                </span>
                <p className="font-['Montserrat'] text-[8px] tracking-[0.25em] uppercase text-[#73685C]">
                  WEDDING STORYBOOK
                </p>
              </div>

              <div className="space-y-0.5">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center space-x-2.5 px-3 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                      activeSection === item.id
                        ? 'bg-[#EFE8DD] text-[#2C2825] font-medium'
                        : 'text-[#554E46] hover:bg-[#F5EFEB] hover:text-[#2C2825]'
                    }`}
                  >
                    <span className={activeSection === item.id ? 'text-[#8C774E]' : 'text-[#798877]'}>
                      {item.icon}
                    </span>
                    <span className="font-['Cormorant_Garamond'] text-base">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-[#D9CEBF]/50 text-center">
                <p className="font-['Montserrat'] text-[8px] text-[#A69066] tracking-widest uppercase">
                  EverAfterInvites
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
