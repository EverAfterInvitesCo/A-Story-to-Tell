import { WeddingConfig } from './types';

export const initialWeddingConfig: WeddingConfig = {
  templateName: "EverAfterInvites — Botanical Romance",
  partnerOne: {
    firstName: "Ahmed",
    fullName: "Ahmed Al-Mansoor",
    parents: "Mr. & Mrs. Tarek Al-Mansoor"
  },
  partnerTwo: {
    firstName: "Fatema",
    fullName: "Fatema El-Sayed",
    parents: "Dr. & Mrs. Hisham El-Sayed"
  },
  weddingDate: {
    displayDate: "13 SEPTEMBER 2026",
    fullDateIso: "2026-09-13T19:00:00+02:00",
    dayOfWeek: "Sunday",
    time: "7:00 PM"
  },
  invitationMessage: {
    headline: "are getting married",
    subline: "13 SEPTEMBER 2026",
    formalText: "Together with their families, they invite you to celebrate their wedding."
  },
  venue: {
    name: "The Royal Mirage Palace",
    subname: "Grand Ballroom & Courtyard Gardens",
    city: "New Cairo",
    country: "Egypt",
    address: "Ring Road, 5th Settlement, New Cairo, Cairo Governorate",
    mapUrl: "https://maps.google.com/?q=New+Cairo+Egypt",
    valetNote: "Complimentary valet parking available at the East Garden Gate."
  },
  schedule: [
    {
      id: "arrival",
      time: "07:00 PM",
      title: "Guests Arrive",
      description: "Welcome botanical beverages & live harp melodies in the Grand Courtyard.",
      iconName: "Sparkles"
    },
    {
      id: "ceremony",
      time: "08:00 PM",
      title: "The Ceremony",
      description: "Exchange of vows and rings beneath the rose-adorned archway.",
      iconName: "Heart"
    },
    {
      id: "dinner",
      time: "09:00 PM",
      title: "Dinner & Toasts",
      description: "A seated gourmet banquet followed by speeches and dessert table.",
      iconName: "Utensils"
    },
    {
      id: "celebration",
      time: "10:00 PM",
      title: "Celebration & Music",
      description: "Live orchestra, traditional zaffa, dancing, and joyous festivities.",
      iconName: "Music"
    },
    {
      id: "last-dance",
      time: "11:30 PM",
      title: "Last Dance & Farewell",
      description: "Sparkler send-off on the Palace Terrace.",
      iconName: "Moon"
    }
  ],
  story: {
    quote: "Somewhere between an ordinary day and a beautiful beginning, our story started.",
    paragraphs: [
      "We crossed paths on a breezy autumn afternoon in Cairo. What began as a spontaneous conversation over jasmine tea soon blossomed into weekend strolls through historic garden courtyards, countless shared books, and a deep appreciation for the quiet, meaningful moments.",
      "From exploring the Mediterranean coast together to building our dreams side by side, every chapter has brought us closer. On a quiet evening terrace overlooking the Nile, Ahmed asked the question that made forever feel like just the beginning.",
      "Now, with full hearts and surrounded by the people who have shaped our lives, we take this sacred step into marriage. We cannot wait to celebrate this milestone with you."
    ],
    milestones: [
      {
        year: "2021",
        title: "The First Stroll",
        description: "An unexpected meeting by the garden fountain that turned into hours of conversation."
      },
      {
        year: "2023",
        title: "The Journey",
        description: "Exploring ancient cities and discovering a shared love for quiet beauty."
      },
      {
        year: "2025",
        title: "The Proposal",
        description: "Under sunset skies on the terrace, a promise made for a lifetime."
      }
    ]
  },
  details: {
    dressCode: {
      title: "Formal / Black Tie Optional",
      description: "We kindly request our esteemed guests to dress in elegant formal attire.",
      paletteNote: "Recommended palette: Muted neutrals, sage greens, soft blush, dusty lavender, navy, or warm metallics."
    },
    ceremony: {
      time: "08:00 PM Promptly",
      location: "Courtyard Fountain Gardens",
      note: "Guests are kindly invited to be seated by 7:45 PM."
    },
    reception: {
      time: "09:00 PM – Midnight",
      location: "The Grand Chandelier Ballroom",
      note: "Followed by dessert and dancing."
    },
    travelAccommodation: {
      title: "Accommodations & Valet",
      details: "A block of rooms has been reserved for our out-of-town guests at the nearby Dusit Thani LakeView. Mention 'Ahmed & Fatema Wedding' for preferred rates."
    }
  },
  rsvp: {
    deadline: "15 August 2026",
    contactEmail: "contact.everafterinvites@gmail.com",
    allowPlusOnes: true,
    maxGuestsPerSubmission: 5,
    dietaryOptions: [
      "No dietary restrictions",
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Nut Allergy",
      "Halal (Standard)"
    ]
  },
  gallery: [
    {
      id: "photo-1",
      imageUrl: "./img1.jpg",
      caption: "The promise under golden sunset light",
      aspectRatio: "portrait"
    },
    {
      id: "photo-2",
      imageUrl: "./img2.jpg",
      caption: "Garden path morning strolls",
      aspectRatio: "portrait"
    },
    {
      id: "photo-3",
      imageUrl: "./img3.jpg",
      caption: "Quiet laughter and shared dreams",
      aspectRatio: "portrait"
    },
    {
      id: "photo-4",
      imageUrl: "./img4.jpg",
      caption: "Handmade botanical touches",
      aspectRatio: "portrait"
    },
    {
      id: "photo-5",
      imageUrl: "./img5.jpg",
      caption: "Waiting for the day to arrive",
      aspectRatio: "portrait"
    },
    {
      id: "photo-6",
      imageUrl: "./img6.jpg",
      caption: "Forever starts here",
      aspectRatio: "portrait"
    }
  ],
  finalMessage: {
    heading: "WE CAN'T WAIT TO CELEBRATE WITH YOU",
    signature: "With love,\nAhmed & Fatema",
    attribution: "Made with love by EverAfterInvites",
    socialLinks: {
      instagram: "https://www.instagram.com/_everafterinvites_/",
      tiktok: "https://www.tiktok.com/@_everafterinvites_",
      facebook: "https://www.facebook.com/profile.php?id=61591562833010"
    }
  },
  artwork: {
    gate: "./gate.jpeg",
    garden: "./garden.jpeg",
    palace: "./palace.jpeg",
    interior: "./interior.jpeg",
    terrace: "./terrace.jpeg",
    stationery: "./stationery.jpeg",
    footer: "./footer.jpeg"
  },
  audio: {
    title: "Romantic Melody",
    artist: "EverAfterInvites",
    src: "./audio_mono_download.mp3",
    enableAmbientHarp: true
  }
};
