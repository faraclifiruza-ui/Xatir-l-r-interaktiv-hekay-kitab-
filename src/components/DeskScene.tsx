import React, { useState, useEffect, useCallback } from 'react';
import { useAudio } from '../hooks/useAudio';
import VintageRadio from './VintageRadio';
import AntiqueLamp from './AntiqueLamp';
import InteractiveBook from './InteractiveBook';

const DeskScene: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [lampOn, setLampOn] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const audio = useAudio('/assets/music.mp3');

  // Preload the reference image
  useEffect(() => {
    const img = new Image();
    let timer: ReturnType<typeof setTimeout>;
    img.onload = () => {
      timer = setTimeout(() => setLoaded(true), 200);
    };
    img.onerror = () => {
      setLoaded(true); // Show anyway if image fails
    };
    img.src = '/assets/reference-desk.jpg';
    return () => { clearTimeout(timer); img.onload = null; img.onerror = null; };
  }, []);

  // Hide hint after first interaction
  useEffect(() => {
    if (bookOpen) {
      setShowHint(false);
    }
  }, [bookOpen]);

  const openBook = useCallback(() => {
    if (!bookOpen) {
      setBookOpen(true);
    }
  }, [bookOpen]);

  const closeBook = useCallback(() => {
    setBookOpen(false);
  }, []);

  const toggleLamp = useCallback(() => {
    setLampOn((prev) => !prev);
  }, []);

  return (
    <>
      {/* Mobile warning */}
      <div className="mobile-warning">
        <h2>Xatirələr</h2>
        <p>
          Bu təcrübə masaüstü kompüterlərdə izlənmək üçün nəzərdə tutulub.
          <br />
          Daha yaxşı nəticə üçün desktop brauzerindən istifadə edin.
        </p>
      </div>

      <div className={`desk-scene ${loaded ? 'loaded' : 'loading'}`}>
        {/* Background desk image */}
        <div className="desk-background" />

        {/* Ambient vignette */}
        <div className="ambient-overlay" />

        {/* Lamp light effect */}
        <AntiqueLamp isOn={lampOn} onToggle={toggleLamp} />

        {/* Radio with controls */}
        <VintageRadio audio={audio} />

        {/* Book clickable area (only when closed) */}
        {!bookOpen && (
          <button
            className="book-hit-area"
            onClick={openBook}
            aria-label="Kitabı aç"
            title="Kitabı açmaq üçün klikləyin"
          />
        )}

        {/* Hint text */}
        <div className={`hint-text ${!showHint || bookOpen ? 'hidden' : ''}`}>
          Kitabı açmaq üçün üzərinə klikləyin
        </div>

        {/* Interactive Book */}
        <InteractiveBook isOpen={bookOpen} onClose={closeBook} />
      </div>
    </>
  );
};

export default DeskScene;
