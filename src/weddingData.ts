import { WeddingConfig } from './types';

export const initialWeddingConfig: WeddingConfig = {
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
  // Adding empty fallback arrays to prevent any .map() crash
  events: [],
  itinerary: [],
  schedule: [],
  registry: [],
  story: [],
};

export const weddingConfig = initialWeddingConfig;
export default initialWeddingConfig;