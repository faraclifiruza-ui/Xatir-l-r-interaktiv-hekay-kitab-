import React from 'react';
import { AudioController } from '../hooks/useAudio';

interface VintageRadioProps {
  audio: AudioController;
}

const VintageRadio: React.FC<VintageRadioProps> = ({ audio }) => {
  return (
    <div className="radio-panel" aria-label="Flora Kərimova — Ruhumuz qovuşacaq">
      <div className="radio-controls">
        <button
          className="radio-btn"
          onClick={(e) => {
            e.stopPropagation();
            audio.rewind(10);
          }}
          aria-label="10 saniyə geri"
          title="10s geri"
        >
          ◀◀
        </button>
        <button
          className="radio-btn"
          onClick={(e) => {
            e.stopPropagation();
            audio.togglePlay();
          }}
          aria-label={audio.isPlaying ? 'Dayandır' : 'Çal'}
          title={audio.isPlaying ? 'Pause' : 'Play'}
          style={{ width: 34, height: 34, fontSize: 13 }}
        >
          {audio.isPlaying ? '❚❚' : '▶'}
        </button>
        <button
          className="radio-btn"
          onClick={(e) => {
            e.stopPropagation();
            audio.forward(10);
          }}
          aria-label="10 saniyə irəli"
          title="10s irəli"
        >
          ▶▶
        </button>
      </div>
      {audio.error && <span className="radio-error" role="status">{audio.error}</span>}
      {audio.duration > 0 && (
        <div className="radio-seek">
          <input
            type="range"
            className="radio-seek-input"
            min={0}
            max={audio.duration}
            step={0.1}
            value={audio.currentTime}
            onInput={(e) => {
              e.stopPropagation();
              audio.seek(parseFloat(e.currentTarget.value));
            }}
            onClick={(e) => e.stopPropagation()}
            aria-label="Musiqi mövqeyi"
            aria-valuetext={`${Math.floor(audio.currentTime)} / ${Math.floor(audio.duration)} saniyə`}
          />
        </div>
      )}
    </div>
  );
};

export default VintageRadio;

