import { WeddingConfig } from './types';

const rawConfig: any = {
  partnerOne: {
    firstName: "Ahmed",
    lastName: "Fatema",
  },
  partnerTwo: {
    firstName: "Fatema",
    lastName: "",
  },
  weddingDate: {
    dateString: "2026-09-13T16:00:00",
    displayDate: "13 SEPTEMBER 2026",
    countdownTarget: "2026-09-13T16:00:00",
  },
  invitationMessage: {
    headline: "A Journey of Love & Timeless Elegance",
    formalText: "Together with their families, they invite you to celebrate their wedding.",
  },
  artwork: {
    gate: `${import.meta.env.BASE_URL}media/gate.jpeg`,
    palace: `${import.meta.env.BASE_URL}media/palace.jpeg`,
    stationery: `${import.meta.env.BASE_URL}media/stationery.jpeg`,
    terrace: `${import.meta.env.BASE_URL}media/terrace.jpeg`,
    interior: `${import.meta.env.BASE_URL}media/interior.jpeg`,
  },
  gallery: [
    `${import.meta.env.BASE_URL}media/img1.jpg`,
    `${import.meta.env.BASE_URL}media/img2.jpg`,
    `${import.meta.env.BASE_URL}media/img3.jpg`,
    `${import.meta.env.BASE_URL}media/img4.jpg`,
    `${import.meta.env.BASE_URL}media/img5.jpg`,
    `${import.meta.env.BASE_URL}media/img6.jpg`,
  ],
  audio: {
    backgroundMusic: `${import.meta.env.BASE_URL}media/audio_mono_download.mp3`,
  },
  venue: {
    name: "The Grand Palace & Gardens",
    address: "Cairo, Egypt",
  },
  dressCode: "Formal Attire",
  contactEmail: "contact@everafterinvites.com",
};

// Proxy wrapper to automatically intercept any missing properties and prevent crashes
const safeProxy = (obj: any): any => {
  return new Proxy(obj, {
    get(target, prop) {
      if (!(prop in target)) {
        // Return an empty array for common list/map names, or a safe fallback object/string
        if (typeof prop === 'string' && (prop.toLowerCase().includes('list') || prop.toLowerCase().includes('array') || prop === 'events' || prop === 'itinerary' || prop === 'schedule' || prop === 'registry' || prop === 'story' || prop === 'gallery')) {
          return [];
        }
        return "";
      }
      const value = target[prop];
      if (value && typeof value === 'object') {
        return safeProxy(value);
      }
      return value;
    }
  });
};

export const initialWeddingConfig: WeddingConfig = safeProxy(rawConfig);
export const weddingConfig = initialWeddingConfig;
export default initialWeddingConfig;