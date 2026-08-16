// Romantic Harp & Acoustic Piano Procedural Synthesizer for Wedding Invitation
// Generates warm, delicate plucked harp arpeggios (Canon in D / Romantic Pentatonic Cadence)

class RomanticHarpSynth {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private gainNode: GainNode | null = null;
  private currentNoteIndex = 0;

  // Romantic arpeggio sequence in D major / F# minor / G / A warm frequencies
  private readonly notes = [
    // D Major triad arpeggio
    293.66, 369.99, 440.00, 587.33,
    // A Major / C#
    220.00, 277.18, 329.63, 440.00,
    // B Minor
    246.94, 293.66, 369.99, 493.88,
    // F# Minor
    185.00, 220.00, 277.18, 369.99,
    // G Major
    196.00, 246.94, 293.66, 392.00,
    // D Major second inversion
    220.00, 293.66, 369.99, 440.00,
    // G Major
    196.00, 246.94, 293.66, 392.00,
    // A Major cadence
    220.00, 277.18, 329.63, 440.00, 554.37
  ];

  public init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(0.18, this.ctx.currentTime);
        this.gainNode.connect(this.ctx.destination);
      }
    }
  }

  public play() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = true;
    this.scheduleNextArpeggio();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private playPluckedHarpString(freq: number) {
    if (!this.ctx || !this.gainNode) return;

    const now = this.ctx.currentTime;
    
    // Fundamental oscillator (sine with warm triangle harmonic)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Warm harp acoustic filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(350, now + 1.8);

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now); // Overtones for shimmer

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(freq, now);

    // Pluck envelope: sharp gentle attack, long acoustic decay
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.22, now + 0.025);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    subOsc.connect(noteGain);

    noteGain.connect(filter);
    filter.connect(this.gainNode);

    osc1.start(now);
    osc2.start(now);
    subOsc.start(now);

    osc1.stop(now + 2.4);
    osc2.stop(now + 2.4);
    subOsc.stop(now + 2.4);
  }

  private scheduleNextArpeggio() {
    if (!this.isPlaying) return;

    const note = this.notes[this.currentNoteIndex];
    this.playPluckedHarpString(note);

    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.notes.length;

    // Organic timing variation (tempo ~ 65 BPM with delicate rubato)
    const baseDelay = 580;
    const rubato = (this.currentNoteIndex % 4 === 0) ? 220 : 0;
    const nextDelay = baseDelay + rubato;

    this.timerId = window.setTimeout(() => {
      this.scheduleNextArpeggio();
    }, nextDelay);
  }
}

export const harpSynth = new RomanticHarpSynth();
