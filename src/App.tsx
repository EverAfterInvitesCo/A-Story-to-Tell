import React, { useState } from 'react';
import { initialWeddingConfig } from './weddingData';
import { WeddingConfig, RsvpSubmission } from './types';
import { PetalsCanvas } from './components/PetalsCanvas';
import { FloatingMusicPlayer } from './components/FloatingMusicPlayer';
import { FloatingNavigation } from './components/FloatingNavigation';
import { GateSection } from './components/GateSection';
import { GardenSection } from './components/GardenSection';
import { PalaceSection } from './components/PalaceSection';
import { InteriorSection } from './components/InteriorSection';
import { TerraceStorySection } from './components/TerraceStorySection';
import { StationeryDetailsSection } from './components/StationeryDetailsSection';
import { RsvpSection } from './components/RsvpSection';
import { GallerySection } from './components/GallerySection';
import { FinalSceneSection } from './components/FinalSceneSection';

export default function App() {
  const [config] = useState<WeddingConfig>(initialWeddingConfig);

  const handleNewRsvp = (submission: RsvpSubmission) => {
    console.log('RSVP Received for EverAfterInvites:', submission);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FAF7F2] text-[#2C2825] overflow-x-hidden selection:bg-[#E2D6C7]">
      {/* Floating Botanical Petals Animation */}
      <PetalsCanvas density={16} />

      {/* Floating Music Controller */}
      <FloatingMusicPlayer config={config} />

      {/* Floating Navigation Menu */}
      <FloatingNavigation />

      {/* Mobile-First Editorial Journey Container */}
      <main className="w-full flex flex-col items-center">
        {/* Continuous Story Sections */}
        
        {/* 1. The Gate (Opening Hero) */}
        <GateSection config={config} />

        {/* 2. The Garden (Date & Countdown) */}
        <GardenSection config={config} />

        {/* 3. The Palace (Celebration & Venue) */}
        <PalaceSection config={config} />

        {/* 4. Inside the Palace (Evening Schedule) */}
        <InteriorSection config={config} />

        {/* 5. Our Story (Romantic Terrace Narrative) */}
        <TerraceStorySection config={config} />

        {/* 6. The Details (Stationery Information) */}
        <StationeryDetailsSection config={config} />

        {/* 7. RSVP (Luxury Stationery Form) */}
        <RsvpSection config={config} onNewSubmission={handleNewRsvp} />

        {/* 8. Photo Gallery (Captured Memories) */}
        <GallerySection config={config} />

        {/* 9. Final Scene (Peaceful Botanical Farewell) */}
        <FinalSceneSection config={config} />
      </main>
    </div>
  );
}