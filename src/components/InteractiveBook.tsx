import React, { useState, useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { scenes, introText, finalText, SceneData } from '../data/story';
import { usePageTurnSound } from '../hooks/usePageTurnSound';
import FinalPhotograph from './FinalPhotograph';

interface InteractiveBookProps {
  isOpen: boolean;
  onClose: () => void;
}

/*
  Spread layout:
  - Spread 0: Introduction (left) + Inside Cover (right)
  - Spreads 1–12: Text above its illustration on the left; quotation on the right
  - Spread 13: Final text (left) + Final photo (right)
  Total: 14 spreads (0-13)
*/

const TOTAL_SPREADS = 14;

const InteractiveBook: React.FC<InteractiveBookProps> = ({ isOpen, onClose }) => {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [photoExpanded, setPhotoExpanded] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const leftPageRef = useRef<HTMLDivElement>(null);
  const rightPageRef = useRef<HTMLDivElement>(null);
  const playPageTurn = usePageTurnSound();
  const busyRef = useRef(false);
  const motion = useRef<gsap.core.Timeline | null>(null);
  const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // The approved frame appears at its final position immediately. Only paper
  // leaves animate during navigation; the frame, covers and spine never transform.
  useEffect(() => {
    if (isOpen) {
      setCurrentSpread(0);
      setPhotoExpanded(false);
      setIsAnimating(false);
      busyRef.current = false;
    }
    return () => { motion.current?.kill(); busyRef.current = false; };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (photoExpanded) return;
      if (e.target instanceof HTMLElement && e.target.matches('input, textarea, select, [contenteditable="true"]')) return;
      if (e.key === 'Escape') {
        handleClose();
        return;
      }
      if (isAnimating) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentSpread, isAnimating, photoExpanded]);

  const performPageTurn = useCallback(
    (direction: 'forward' | 'backward', callback: () => void) => {
      if (busyRef.current) return;
      busyRef.current = true;
      setIsAnimating(true);
      playPageTurn();
      const targetPage = direction === 'forward' ? rightPageRef.current : leftPageRef.current;
      const finish = () => {
        if (targetPage) gsap.set(targetPage, { clearProps: 'transform,opacity' });
        busyRef.current = false;
        setIsAnimating(false);
      };
      if (!targetPage) { callback(); finish(); return; }
      const angle = direction === 'forward' ? -88 : 88;
      const tl = gsap.timeline({ onComplete: finish });
      motion.current = tl;
      tl.to(targetPage, {
        rotateY: angle, opacity: 0.45,
        transformOrigin: direction === 'forward' ? 'left center' : 'right center',
        duration: reducedMotion() ? 0 : 0.3, ease: 'power2.in',
      });
      tl.call(callback);
      tl.fromTo(targetPage, { rotateY: -angle, opacity: 0.45 },
        { rotateY: 0, opacity: 1, duration: reducedMotion() ? 0 : 0.3, ease: 'power2.out' });

    },
    [playPageTurn]
  );

  const goNext = useCallback(() => {
    if (busyRef.current || photoExpanded || isAnimating || currentSpread >= TOTAL_SPREADS - 1) return;
    performPageTurn('forward', () => {
      setCurrentSpread((s) => Math.min(s + 1, TOTAL_SPREADS - 1));
    });
  }, [isAnimating, currentSpread, photoExpanded, performPageTurn]);

  const goPrev = useCallback(() => {
    if (busyRef.current || photoExpanded || isAnimating || currentSpread <= 0) return;
    performPageTurn('backward', () => {
      setCurrentSpread((s) => Math.max(s - 1, 0));
    });
  }, [isAnimating, currentSpread, photoExpanded, performPageTurn]);

  const handleClose = useCallback(() => {
    if (busyRef.current || isAnimating) return;
    busyRef.current = true;
    setIsAnimating(true);
    if (overlayRef.current) {
      const tl = gsap.timeline({ onComplete: () => { busyRef.current = false; setIsAnimating(false); onClose(); } });
      motion.current = tl;
      tl.to(leftPageRef.current, { rotateY: 88, transformOrigin: 'right center', duration: reducedMotion() ? 0 : 0.45 });
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: reducedMotion() ? 0 : 0.45,
        ease: 'power2.in',
      });
    } else {
      onClose();
    }
  }, [onClose, isAnimating]);

  const renderScenePage = (scene: SceneData, pageNum: number) => (
    <div className="page-content story-page">
      <div className="scene-title">{scene.title}</div>
      <p className="scene-text">{scene.text}</p>
      <div className="scene-image-container">
        <img
          src={scene.image}
          alt={scene.alt}
          className="scene-image"
          loading={scene.id <= 3 ? 'eager' : 'lazy'}
        />
      </div>
      <span className="page-number page-number-left">{pageNum}</span>
    </div>
  );

  const renderLeftPage = () => {
    if (currentSpread === 0) {
      return (
        <div className="page-content">
          <div style={{ marginBottom: 12 }}>
            <div className="scene-title">Müqəddimə</div>
          </div>
          <p className="page-text intro-text">{introText}</p>
          <span className="page-number page-number-left">i</span>
        </div>
      );
    }

    if (currentSpread >= 1 && currentSpread <= 12) {
      const scene = scenes[currentSpread - 1];
      return renderScenePage(scene, currentSpread * 2);
    }

    if (currentSpread === 13) {
      return (
        <div className="page-content">
          <div className="scene-title">Son</div>
          <p className="final-text">{finalText}</p>
          <span className="page-number page-number-left">xxvi</span>
        </div>
      );
    }

    return null;
  };

  const renderRightPage = () => {
    if (currentSpread === 0) {
      return (
        <div className="inside-cover">
          <div className="inside-cover-texture">
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}>
              <span className="inside-cover-ornament">✦</span>
              <div style={{
                color: 'rgba(200, 180, 140, 0.35)',
                fontSize: '0.75rem',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontFamily: "'Noto Serif', Georgia, serif",
              }}>
                XATİRƏLƏR
              </div>
              <span className="inside-cover-ornament" style={{ fontSize: '1.2rem' }}>❦</span>
            </div>
          </div>
        </div>
      );
    }

    if (currentSpread >= 1 && currentSpread <= 12) {
      const scene = scenes[currentSpread - 1];
      return (
        <div className="page-content" style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            textAlign: 'center',
            color: 'rgba(80, 60, 40, 0.2)',
            fontSize: '3rem',
            marginBottom: 24,
          }}>
            ❦
          </div>
          <div style={{
            textAlign: 'center',
            color: 'rgba(80, 60, 40, 0.35)',
            fontSize: '0.85rem',
            fontStyle: 'italic',
            letterSpacing: '1px',
            lineHeight: 1.8,
            maxWidth: '80%',
          }}>
            «{scene.text.substring(0, 60)}...»
          </div>
          <div style={{
            marginTop: 30,
            textAlign: 'center',
            color: 'rgba(80, 60, 40, 0.2)',
            fontSize: '0.7rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}>
            {currentSpread} / 12
          </div>
          <span className="page-number page-number-right">{currentSpread * 2 + 1}</span>
        </div>
      );
    }

    if (currentSpread === 13) {
      return (
        <div className="final-photo-container">
          <FinalPhotograph
            expanded={photoExpanded}
            onExpand={() => { if (!busyRef.current) setPhotoExpanded(true); }}
            onCollapse={() => setPhotoExpanded(false)}
          />
          <span className="page-number page-number-right">xxvii</span>
        </div>
      );
    }

    return null;
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        ref={overlayRef}
        className="book-overlay visible"
        style={{ opacity: 1 }}
      >
        <div className="book-dimmer" onClick={handleClose} />
        <div className="open-book">
          <button
            className="close-book-btn"
            onClick={handleClose}
            disabled={isAnimating}
            aria-label="Kitabı bağla"
          >
            ✕ Bağla
          </button>

          {/* Left page */}
          <div
            className="book-page book-page-left"
          >
            <div ref={leftPageRef} className="paper-leaf paper-leaf-left">
              {renderLeftPage()}
            </div>
            {currentSpread > 0 && (
              <button
                className="page-nav-left"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Əvvəlki səhifə"
                disabled={isAnimating}
              />
            )}
          </div>

          {/* Spine */}
          <div className="book-spine" />

          {/* Right page */}
          <div
            className="book-page book-page-right"
          >
            <div ref={rightPageRef} className="paper-leaf paper-leaf-right">
              {renderRightPage()}
            </div>
            {currentSpread < TOTAL_SPREADS - 1 && (
              <button
                className="page-nav-right"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="Növbəti səhifə"
                disabled={isAnimating}
              />
            )}
          </div>

          <div className="spread-info">
            {currentSpread === 0
              ? 'Müqəddimə — irəli çevirmək üçün sağ tərəfə klikləyin'
              : currentSpread <= 12
              ? `Səhifə ${currentSpread} / 12`
              : 'Son — kitabı bağlamaq üçün ✕ düyməsinə klikləyin'}
          </div>
        </div>
      </div>

      {/* Enlarged photo overlay */}
      {photoExpanded && (
        <FinalPhotograph
          expanded={true}
          onExpand={() => {}}
          onCollapse={() => setPhotoExpanded(false)}
          isOverlay={true}
        />
      )}
    </>
  );
};

export default InteractiveBook;
