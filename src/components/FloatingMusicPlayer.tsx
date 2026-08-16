import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Music, Sparkles } from 'lucide-react';
import { harpSynth } from '../utils/audioSynth';
import { WeddingConfig } from '../types';

interface FloatingMusicPlayerProps {
  config: WeddingConfig;
}

export const FloatingMusicPlayer: React.FC<FloatingMusicPlayerProps> = ({ config }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (config.audio.src) {
      const audio = new Audio(config.audio.src);
      audio.loop = true;
      audio.volume = 0.65;
      audioRef.current = audio;

      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => {
        console.warn('Audio file playback fallback to synth');
      };

      return () => {
        audio.pause();
        audio.src = '';
      };
    }
  }, [config.audio.src]);

  const toggleMusic = async () => {
    setHasInteracted(true);
    if (audioRef.current && config.audio.src) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          console.warn('Audio play prevented or failed, using synth fallback', err);
          const active = harpSynth.toggle();
          setIsPlaying(active);
        }
      }
    } else {
      const active = harpSynth.toggle();
      setIsPlaying(active);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 5000);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [hasInteracted]);

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center space-x-2">
      {/* Tooltip on First Visit */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 8, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.95 }}
            className="hidden sm:flex items-center space-x-1.5 py-1 px-3 rounded-full bg-[#FAF7F2]/95 border border-[#D9CEBF] text-[#1A1614] shadow-xs backdrop-blur-xs text-[10px] font-['Montserrat'] tracking-wide font-medium"
          >
            <Sparkles className="w-3 h-3 text-[#7A6232]" />
            <span>Play background music</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Toggle Button: Discreet & Delicate */}
      <button
        onClick={toggleMusic}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`group p-2.5 rounded-full border transition-all duration-300 shadow-xs backdrop-blur-xs flex items-center justify-center cursor-pointer ${
          isPlaying
            ? 'bg-[#7A6232] text-[#FAF7F2] border-[#7A6232]'
            : 'bg-[#FAF7F2]/95 text-[#4A4036] border-[#D9CEBF] hover:border-[#7A6232] hover:text-[#1A1614]'
        }`}
        aria-label={isPlaying ? 'Pause wedding music' : 'Play wedding music'}
      >
        {isPlaying ? (
          <div className="flex items-center space-x-1">
            <Volume2 className="w-3.5 h-3.5 text-[#FAF7F2]" />
            <div className="flex items-end space-x-0.5 h-3 pl-0.5">
              <motion.span
                animate={{ height: ['3px', '10px', '3px'] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
                className="w-0.5 bg-[#FAF7F2] rounded-full"
              />
              <motion.span
                animate={{ height: ['10px', '4px', '11px', '10px'] }}
                transition={{ repeat: Infinity, duration: 0.7, ease: 'easeInOut', delay: 0.2 }}
                className="w-0.5 bg-[#FAF7F2] rounded-full"
              />
              <motion.span
                animate={{ height: ['4px', '11px', '3px'] }}
                transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut', delay: 0.4 }}
                className="w-0.5 bg-[#FAF7F2] rounded-full"
              />
            </div>
          </div>
        ) : (
          <Music className="w-3.5 h-3.5 text-[#7A6232] group-hover:scale-105 transition-transform" />
        )}
      </button>
    </div>
  );
};
