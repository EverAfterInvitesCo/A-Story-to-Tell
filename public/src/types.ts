export interface GalleryPhoto {
  id: string;
  imageUrl: string;
  caption: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
}

export interface WeddingConfig {
  templateName: string;
  partnerOne: {
    firstName: string;
    fullName: string;
    parents?: string;
  };
  partnerTwo: {
    firstName: string;
    fullName: string;
    parents?: string;
  };
  weddingDate: {
    displayDate: string; // e.g. "13 September 2026"
    fullDateIso: string; // e.g. "2026-09-13T19:00:00+02:00"
    dayOfWeek: string;   // e.g. "Sunday"
    time: string;        // e.g. "7:00 PM"
  };
  invitationMessage: {
    headline: string;
    subline: string;
    formalText: string;
  };
  venue: {
    name: string;
    subname?: string;
    city: string;
    country: string;
    address: string;
    mapUrl: string;
    valetNote?: string;
  };
  schedule: Array<{
    id: string;
    time: string;
    title: string;
    description: string;
    iconName?: string;
  }>;
  story: {
    quote: string;
    paragraphs: string[];
    milestones?: Array<{
      year: string;
      title: string;
      description: string;
    }>;
  };
  details: {
    dressCode: {
      title: string;
      description: string;
      paletteNote?: string;
    };
    ceremony: {
      time: string;
      location: string;
      note?: string;
    };
    reception: {
      time: string;
      location: string;
      note?: string;
    };
    travelAccommodation?: {
      title: string;
      details: string;
    };
  };
  rsvp: {
    deadline: string;
    contactEmail: string;
    allowPlusOnes: boolean;
    maxGuestsPerSubmission: number;
    dietaryOptions?: string[];
  };
  gallery: GalleryPhoto[];
  finalMessage: {
    heading: string;
    signature: string;
    attribution: string;
    socialLinks: {
      instagram?: string;
      tiktok?: string;
      facebook?: string;
    };
  };
  artwork: {
    gate: string;
    garden: string;
    palace: string;
    interior: string;
    terrace: string;
    stationery: string;
    footer?: string;
  };
  audio: {
    title: string;
    artist: string;
    src?: string; // Optional custom mp3 URL
    enableAmbientHarp: boolean;
  };
}

export interface RsvpSubmission {
  id: string;
  fullName: string;
  email?: string;
  phone?: string;
  attendance: 'attending' | 'declining';
  guestCount: number;
  dietaryRequirements?: string;
  wishesMessage?: string;
  submittedAt: string;
}
