import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { WeddingConfig } from '../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GallerySectionProps {
  config: WeddingConfig;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ config }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.0, 1.05]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['-2%', '3%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);

  const openLightbox = (index: number) => setSelectedPhotoIndex(index);
  const closeLightbox = () => setSelectedPhotoIndex(null);

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + config.gallery.length) % config.gallery.length);
    }
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % config.gallery.length);
    }
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FAF7F2] py-20 px-4 select-none"
    >
      {/* Background Soft Terraced Garden Wash with Parallax */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ scale: bgScale, y: bgY }}
          className="relative w-full h-full flex items-center justify-center will-change-transform"
        >
          <img
            src={config.artwork.terrace}
            alt="Palace Garden Terrace Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center max-w-[1000px] mx-auto opacity-90 transition-opacity duration-700"
          />
          <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/40 via-transparent to-[#FAF7F2]/40 pointer-events-none" />
        </motion.div>
      </div>

      {/* Content: Physical Vintage Photographs Mounted in the Storybook */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-20 w-full max-w-4xl mx-auto text-center px-2"
      >
        {/* Category Tag */}
        <div className="inline-flex items-center space-x-3 text-[#4A5E47] mb-2.5">
          <span className="w-6 h-px bg-[#4A5E47]/40" />
          <span className="font-['Montserrat'] text-[10px] tracking-[0.3em] uppercase text-[#4A5E47] font-semibold">
            MOMENTS
          </span>
          <span className="w-6 h-px bg-[#4A5E47]/40" />
        </div>

        {/* Heading */}
        <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl text-[#1A1614] font-normal tracking-[0.04em] mb-1">
          Captured Memories
        </h2>

        <p className="font-['Cormorant_Garamond'] text-base italic text-[#4A4036] font-medium mb-8">
          A glimpse into our sweetest chapters together
        </p>

        {/* Photo Gallery: Horizontal Carousel on Phone / Grid on Desktop */}
        <div className="relative w-full">
          {/* Scrollable Container */}
          <div
            className="flex overflow-x-auto snap-x snap-mandatory gap-4.5 pb-5 pt-2 px-4 -mx-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-7 sm:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {config.gallery.map((photo, index) => {
              const rotationDegree = index % 3 === 0 ? -1 : index % 3 === 1 ? 1 : -0.5;

              return (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.8, delay: index * 0.08 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  onClick={() => openLightbox(index)}
                  className="cursor-pointer group shrink-0 w-[72vw] max-w-[270px] snap-center sm:w-auto sm:shrink"
                  style={{
                    transform: `rotate(${rotationDegree}deg)`
                  }}
                >
                  {/* Physical Mounted Fine-Art Photo Frame */}
                  <div className="p-2.5 pb-4 bg-[#FAF7F2] border border-[#D9CEBF] shadow-[0_4px_20px_rgba(40,35,30,0.08)] group-hover:shadow-[0_8px_30px_rgba(40,35,30,0.12)] group-hover:border-[#7A6232]/80 transition-all duration-300 relative rounded-lg">
                    {/* Corner brackets */}
                    <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-[#7A6232]/40" />
                    <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-[#7A6232]/40" />
                    <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-[#7A6232]/40" />
                    <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-[#7A6232]/40" />

                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EFE8DD] rounded-xs">
                      <img
                        src={photo.imageUrl}
                        alt={photo.caption}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                      />
                    </div>

                    {/* Handwritten Style Caption */}
                    <div className="mt-2.5 px-1 text-center">
                      <p className="font-['Cormorant_Garamond'] text-sm sm:text-base italic text-[#1A1614] group-hover:text-[#7A6232] transition-colors line-clamp-1 font-medium">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Phone View Swipe Helper Indicator */}
          <div className="flex sm:hidden items-center justify-center space-x-2 pt-1 pb-2 text-[#7A6232]">
            <span className="w-4 h-px bg-[#7A6232]/40" />
            <span className="font-['Montserrat'] text-[9px] tracking-[0.2em] uppercase font-semibold">
              SWIPE TO BROWSE ({config.gallery.length} PHOTOS)
            </span>
            <span className="w-4 h-px bg-[#7A6232]/40" />
          </div>
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-[#2C2825]/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 p-2 text-[#FAF7F2] hover:text-[#D9CEBF] transition-colors cursor-pointer"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevPhoto}
              className="absolute left-3 sm:left-6 p-2.5 rounded-full bg-[#FAF7F2]/20 hover:bg-[#FAF7F2]/40 text-[#FAF7F2] transition-colors cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextPhoto}
              className="absolute right-3 sm:right-6 p-2.5 rounded-full bg-[#FAF7F2]/20 hover:bg-[#FAF7F2]/40 text-[#FAF7F2] transition-colors cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Lightbox Photo Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-xl w-full p-3 sm:p-4 bg-[#FAF7F2] border border-[#D9CEBF] shadow-2xl"
            >
              <div className="aspect-[4/5] sm:aspect-[4/3] w-full overflow-hidden bg-[#EFE8DD]">
                <img
                  src={config.gallery[selectedPhotoIndex].imageUrl}
                  alt={config.gallery[selectedPhotoIndex].caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="mt-3 text-center">
                <p className="font-['Cormorant_Garamond'] text-lg italic text-[#2C2825]">
                  {config.gallery[selectedPhotoIndex].caption}
                </p>
                <span className="font-['Montserrat'] text-[10px] text-[#73685C] tracking-widest mt-0.5 block">
                  {selectedPhotoIndex + 1} OF {config.gallery.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
