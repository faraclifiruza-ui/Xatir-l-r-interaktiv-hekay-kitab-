import { useRef, useCallback, useEffect } from 'react';

// Synthesize a subtle page-turn sound using Web Audio API
// This is a temporary placeholder until a real page-turn.mp3 is provided
function createPageTurnSound(ctx: AudioContext): void {
  const duration = 0.35;
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Generate filtered noise that sounds like paper rustling
  for (let i = 0; i < bufferSize; i++) {
    const t = i / ctx.sampleRate;
    const envelope =
      Math.sin((Math.PI * t) / duration) *
      Math.exp(-t * 6);
    data[i] = (Math.random() * 2 - 1) * envelope * 0.12;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  // Bandpass filter to shape the noise
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 3000;
  filter.Q.value = 0.7;

  const gain = ctx.createGain();
  gain.gain.value = 0.25;

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  source.onended = () => { source.disconnect(); filter.disconnect(); gain.disconnect(); };
  source.start();
  source.stop(ctx.currentTime + duration);
}

export function usePageTurnSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => () => { void ctxRef.current?.close(); ctxRef.current = null; }, []);

  const playPageTurn = useCallback(() => {
    try {
      if (!ctxRef.current) {
        ctxRef.current = new AudioContext();
      }
      const ctx = ctxRef.current;
      if (ctx.state === 'suspended') {
        void ctx.resume().then(() => { if (ctx.state === 'running') createPageTurnSound(ctx); }).catch(() => {});
      } else {
        createPageTurnSound(ctx);
      }
    } catch {
      // Silently fail if Web Audio is not available
    }
  }, []);

  return playPageTurn;
}
