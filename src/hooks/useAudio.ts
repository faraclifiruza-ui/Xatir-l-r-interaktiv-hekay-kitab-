import { useRef, useState, useCallback, useEffect } from 'react';

export interface AudioController {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  error: string | null;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  rewind: (seconds?: number) => void;
  forward: (seconds?: number) => void;
  seek: (time: number) => void;
}

export function useAudio(src: string): AudioController {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const audio = document.createElement('audio');
    audio.src = src;
    audio.loop = true;
    audio.preload = 'metadata';
    audio.hidden = true;
    audio.dataset.xatirelerMusic = '';
    document.body.appendChild(audio);
    audioRef.current = audio;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onDuration = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const onPlay = () => { setIsPlaying(true); setError(null); };
    const onPause = () => setIsPlaying(false);
    const onError = () => { setIsPlaying(false); setError('Musiqi yüklənmədi. Yenidən cəhd edin.'); };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('seeked', onTime);
    audio.addEventListener('durationchange', onDuration);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('seeked', onTime);
      audio.removeEventListener('durationchange', onDuration);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      audio.remove();
      audioRef.current = null;
    };
  }, [src]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setError(null);
    void audio.play().catch((reason: DOMException) => {
      if (audioRef.current === audio && reason.name !== 'AbortError') {
        setError('Musiqi çalınmadı. Yenidən cəhd edin.');
      }
    });
  }, []);
  const pause = useCallback(() => audioRef.current?.pause(), []);
  const togglePlay = useCallback(() => {
    if (audioRef.current?.paused) play(); else pause();
  }, [play, pause]);
  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(time) || !Number.isFinite(audio.duration)) return;
    audio.currentTime = Math.max(0, Math.min(audio.duration, time));
    setCurrentTime(audio.currentTime);
  }, []);
  const rewind = useCallback((seconds = 10) => seek((audioRef.current?.currentTime ?? 0) - seconds), [seek]);
  const forward = useCallback((seconds = 10) => seek((audioRef.current?.currentTime ?? 0) + seconds), [seek]);
  return { isPlaying, currentTime, duration, error, play, pause, togglePlay, rewind, forward, seek };
}
