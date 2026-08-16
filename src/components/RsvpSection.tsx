import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { WeddingConfig, RsvpSubmission } from '../types';
import { Heart, Send, AlertCircle } from 'lucide-react';

interface RsvpSectionProps {
  config: WeddingConfig;
  onNewSubmission?: (submission: RsvpSubmission) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ config, onNewSubmission }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.0, 1.05]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['-2%', '3%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    attendance: 'attending' as 'attending' | 'declining',
    guestCount: 1,
    dietaryRequirements: 'No dietary restrictions',
    wishesMessage: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    const submission: RsvpSubmission = {
      id: 'rsvp-' + Date.now(),
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      attendance: formData.attendance,
      guestCount: formData.attendance === 'attending' ? Number(formData.guestCount) : 0,
      dietaryRequirements: formData.dietaryRequirements,
      wishesMessage: formData.wishesMessage.trim(),
      submittedAt: new Date().toISOString()
    };

    // Save to local storage
    try {
      const existing = JSON.parse(localStorage.getItem('everafter_rsvp_submissions') || '[]');
      existing.push(submission);
      localStorage.setItem('everafter_rsvp_submissions', JSON.stringify(existing));
    } catch {
      // Ignore
    }

    if (onNewSubmission) {
      onNewSubmission(submission);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <section
      id="rsvp"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FAF7F2] py-24 px-4 select-none"
    >
      {/* Background Stationery Wash with Parallax */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ scale: bgScale, y: bgY }}
          className="relative w-full h-full flex items-center justify-center will-change-transform"
        >
          <img
            src={config.artwork.stationery}
            alt="Wedding Stationery Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center max-w-[1000px] mx-auto opacity-95 transition-opacity duration-700"
          />
          <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/40 via-transparent to-[#FAF7F2]/40 pointer-events-none" />
        </motion.div>
      </div>

      {/* Content: High-contrast RSVP stationery plaque */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-20 w-full max-w-lg mx-auto text-center my-auto flex flex-col items-center justify-center px-2"
      >
        <div className="w-full bg-[#FAF7F2]/95 backdrop-blur-sm border border-[#D9CEBF] shadow-[0_10px_35px_rgba(40,35,30,0.06)] rounded-2xl py-8 sm:py-10 px-5 sm:px-8 relative overflow-hidden">
          {/* Corner gold brackets */}
          <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#8C774E]/40" />
          <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#8C774E]/40" />
          <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[#8C774E]/40" />
          <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#8C774E]/40" />

          {/* Tag */}
          <div className="inline-flex items-center space-x-3 text-[#9E5D65] mb-2.5">
            <span className="w-6 h-px bg-[#9E5D65]/40" />
            <span className="font-['Montserrat'] text-[10px] tracking-[0.3em] uppercase text-[#9E5D65] font-semibold">
              R.S.V.P.
            </span>
            <span className="w-6 h-px bg-[#9E5D65]/40" />
          </div>

          {/* Heading */}
          <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl text-[#1A1614] font-normal tracking-[0.04em] mb-1 leading-tight">
            We&rsquo;d Love to Have You
          </h2>

          <p className="font-['Cormorant_Garamond'] text-base italic text-[#4A4036] font-medium mb-1">
            Please let us know if you&rsquo;ll be joining our celebration.
          </p>

          {config.rsvp.deadline && (
            <p className="font-['Montserrat'] text-[11px] tracking-widest uppercase text-[#7A6232] font-semibold mb-6">
              Kindly respond by {config.rsvp.deadline}
            </p>
          )}

          {/* Integrated Response Form */}
          <div className="w-full text-left relative py-2">
            {isSubmitted ? (
              /* Success confirmation */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-3"
              >
                <div className="w-12 h-12 rounded-full border border-[#7A6232] flex items-center justify-center mx-auto text-[#7A6232] bg-[#FAF7F2]">
                  <Heart className="w-5 h-5 fill-[#7A6232]/20" />
                </div>
                <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl text-[#1A1614] font-medium">
                  Thank You, {formData.fullName}!
                </h3>
                <p className="font-['Cormorant_Garamond'] text-base text-[#2A241E] leading-relaxed max-w-xs mx-auto">
                  {formData.attendance === 'attending'
                    ? `We are delighted to celebrate with you and your party of ${formData.guestCount}. See you on ${config.weddingDate.displayDate}!`
                    : `We are sad you cannot join us, but thank you warmly for sharing your love and blessings.`}
                </p>

                <div className="pt-3">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-[11px] font-['Montserrat'] tracking-widest uppercase text-[#7A6232] hover:underline cursor-pointer font-semibold"
                  >
                    Edit or submit another response
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-2 rounded-lg bg-[#C89B9B]/20 border border-[#C89B9B]/40 text-[#7C3A3A] text-xs flex items-center space-x-2 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label className="block font-['Montserrat'] text-[10px] font-semibold tracking-wider uppercase text-[#1A1614] mb-1">
                    Guest Name(s) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Youssef &amp; Mariam"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-[#D9CEBF] bg-[#FAF7F2] focus:outline-none focus:border-[#7A6232] text-[#1A1614] font-['Cormorant_Garamond'] text-base transition-colors"
                  />
                </div>

                {/* Attendance Selection */}
                <div>
                  <label className="block font-['Montserrat'] text-[10px] font-semibold tracking-wider uppercase text-[#1A1614] mb-1.5">
                    Attendance *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label
                      className={`flex items-center space-x-2 p-2.5 rounded-lg border cursor-pointer transition-all ${
                        formData.attendance === 'attending'
                          ? 'border-[#7A6232] bg-[#FAF7F2] shadow-xs'
                          : 'border-[#D9CEBF] bg-[#FAF7F2]/60 hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value="attending"
                        checked={formData.attendance === 'attending'}
                        onChange={() => setFormData({ ...formData, attendance: 'attending' })}
                        className="sr-only"
                      />
                      <div
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          formData.attendance === 'attending'
                            ? 'border-[#7A6232] bg-[#7A6232]'
                            : 'border-[#D9CEBF]'
                        }`}
                      >
                        {formData.attendance === 'attending' && <div className="w-1 h-1 rounded-full bg-white" />}
                      </div>
                      <span className="font-['Cormorant_Garamond'] text-sm text-[#1A1614] font-semibold">
                        Joyfully accepts
                      </span>
                    </label>

                    <label
                      className={`flex items-center space-x-2 p-2.5 rounded-lg border cursor-pointer transition-all ${
                        formData.attendance === 'declining'
                          ? 'border-[#7A6232] bg-[#FAF7F2] shadow-xs'
                          : 'border-[#D9CEBF] bg-[#FAF7F2]/60 hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value="declining"
                        checked={formData.attendance === 'declining'}
                        onChange={() => setFormData({ ...formData, attendance: 'declining' })}
                        className="sr-only"
                      />
                      <div
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          formData.attendance === 'declining'
                            ? 'border-[#7A6232] bg-[#7A6232]'
                            : 'border-[#D9CEBF]'
                        }`}
                      >
                        {formData.attendance === 'declining' && <div className="w-1 h-1 rounded-full bg-white" />}
                      </div>
                      <span className="font-['Cormorant_Garamond'] text-sm text-[#4A4036] font-medium">
                        Regretfully declines
                      </span>
                    </label>
                  </div>
                </div>

                {/* Guest count and dietary (if attending) */}
                {formData.attendance === 'attending' && (
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <div>
                      <label className="block font-['Montserrat'] text-[10px] font-semibold tracking-wider uppercase text-[#1A1614] mb-1">
                        Guest Count
                      </label>
                      <select
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#D9CEBF] bg-[#FAF7F2] focus:outline-none focus:border-[#7A6232] text-[#1A1614] font-['Cormorant_Garamond'] text-base"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-['Montserrat'] text-[10px] font-semibold tracking-wider uppercase text-[#1A1614] mb-1">
                        Dietary Notes
                      </label>
                      <select
                        value={formData.dietaryRequirements}
                        onChange={(e) => setFormData({ ...formData, dietaryRequirements: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#D9CEBF] bg-[#FAF7F2] focus:outline-none focus:border-[#7A6232] text-[#1A1614] font-['Cormorant_Garamond'] text-sm"
                      >
                        {config.rsvp.dietaryOptions?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Email and Phone */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-['Montserrat'] text-[10px] font-semibold tracking-wider uppercase text-[#1A1614] mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#D9CEBF] bg-[#FAF7F2] focus:outline-none focus:border-[#7A6232] text-[#1A1614] font-['Cormorant_Garamond'] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-['Montserrat'] text-[10px] font-semibold tracking-wider uppercase text-[#1A1614] mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+20 100 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#D9CEBF] bg-[#FAF7F2] focus:outline-none focus:border-[#7A6232] text-[#1A1614] font-['Cormorant_Garamond'] text-sm"
                    />
                  </div>
                </div>

                {/* Wishes Note */}
                <div>
                  <label className="block font-['Montserrat'] text-[10px] font-semibold tracking-wider uppercase text-[#1A1614] mb-1">
                    Note to the Couple (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Share a wish or song recommendation..."
                    value={formData.wishesMessage}
                    onChange={(e) => setFormData({ ...formData, wishesMessage: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#D9CEBF] bg-[#FAF7F2] focus:outline-none focus:border-[#7A6232] text-[#1A1614] font-['Cormorant_Garamond'] text-sm resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center space-x-2 py-2.5 px-8 rounded-full border border-[#7A6232] bg-[#FAF7F2] hover:bg-[#7A6232] text-[#1A1614] hover:text-[#FAF7F2] font-['Montserrat'] text-[11px] tracking-[0.25em] uppercase font-semibold transition-all duration-300 shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-1.5">
                        <span className="w-3 h-3 border-2 border-[#7A6232] border-t-transparent rounded-full animate-spin" />
                        <span>SEALING...</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1.5">
                        <span>CONFIRM RSVP</span>
                        <Send className="w-3 h-3 ml-0.5" />
                      </span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
