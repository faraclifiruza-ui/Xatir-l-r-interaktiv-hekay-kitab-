import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface FinalPhotographProps {
  expanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
  isOverlay?: boolean;
}

const FinalPhotograph: React.FC<FinalPhotographProps> = ({
  expanded,
  onExpand,
  onCollapse,
  isOverlay = false,
}) => {
  const photoRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOverlay && expanded && overlayRef.current && photoRef.current) {
      closing.current = false;
      const previousFocus = document.activeElement as HTMLElement | null;
      closeRef.current?.focus();
      const context = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.4, ease: 'power2.out' }
      );
      gsap.fromTo(
        photoRef.current,
        { scale: 0.5, rotation: -3 },
        { scale: 1, rotation: 0, duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.6, ease: 'back.out(1.2)' }
      );
      });
      return () => { context.revert(); previousFocus?.focus(); };
    }
  }, [isOverlay, expanded]);

  const handleCollapse = () => {
    if (closing.current) return;
    closing.current = true;
    if (overlayRef.current && photoRef.current) {
      gsap.to(photoRef.current, {
        scale: 0.5,
        rotation: -3,
        duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.4,
        ease: 'power2.in',
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.4,
        ease: 'power2.in',
        onComplete: onCollapse,
      });
    } else {
      onCollapse();
    }
  };

  useEffect(() => {
    if (!isOverlay || !expanded) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Tab') { e.preventDefault(); closeRef.current?.focus(); }
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        handleCollapse();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOverlay, expanded]);

  if (isOverlay) {
    return (
      <div
        ref={overlayRef}
        className={`photo-overlay ${expanded ? 'visible' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Gülçin və İlqar Məmmədovlar — foto"
        style={{ opacity: 0 }}
      >
        <button ref={closeRef} className="photo-close" onClick={handleCollapse} aria-label="Şəkili kiçilt">✕</button>
        <div className="photo-overlay-bg" onClick={handleCollapse} />
        <img
          ref={photoRef}
          src="/assets/final-photo.svg"
          alt="Gülçin və İlqar — Yenə həmin yerdə görüşərik — 1940"
          className="enlarged-photo"
          onClick={handleCollapse}
        />
      </div>
    );
  }

  // In-page pinned photo
  return (
    <div
      className={`final-photo-wrapper ${expanded ? "detached" : ""}`}
      onClick={onExpand}
      role="button"
      tabIndex={0}
      aria-label="Şəkili böyüt"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onExpand();
        }
      }}
    >
      <div className="photo-pin" />
      <img
        src="/assets/final-photo.svg"
        alt="Gülçin və İlqar — Yenə həmin yerdə görüşərik — 1940"
        className="final-photo"
      />
    </div>
  );
};

export default FinalPhotograph;
