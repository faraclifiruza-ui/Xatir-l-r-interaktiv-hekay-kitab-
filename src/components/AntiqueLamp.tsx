import React from 'react';

interface AntiqueLampProps {
  isOn: boolean;
  onToggle: () => void;
}

const AntiqueLamp: React.FC<AntiqueLampProps> = ({ isOn, onToggle }) => {
  return (
    <>
      <button
        className="lamp-hit-area"
        onClick={onToggle}
        aria-label={isOn ? 'Lampanı söndür' : 'Lampanı yandır'}
        aria-pressed={isOn}
        title={isOn ? 'Lampanı söndür' : 'Lampanı yandır'}
      />
      <div className={`lamp-light-overlay ${isOn ? 'on' : ''}`} />
    </>
  );
};

export default AntiqueLamp;
