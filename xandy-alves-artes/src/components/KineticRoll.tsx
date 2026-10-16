import React from 'react';
import './KineticRoll.css';

interface KineticRollProps {
  text: string;
  className?: string;
  as?: 'span' | 'div' | 'p';
  active?: boolean;
}

export const KineticRoll: React.FC<KineticRollProps> = ({
  text,
  className = '',
  as: Component = 'span',
  active = false
}) => {
  const characters = text.split('');

  return (
    <Component className={`kinetic-roll ${active ? 'is-active' : ''} ${className}`}>
      {characters.map((char, index) => {
        if (char === ' ') {
          return (
            <span key={index} className="kinetic-roll__space">
              &nbsp;
            </span>
          );
        }

        return (
          <span key={index} className="kinetic-roll__char" style={{ '--char-idx': index } as React.CSSProperties}>
            <span className="kinetic-roll__char-inner">
              <span className="kinetic-roll__char-item">{char}</span>
              <span className="kinetic-roll__char-item kinetic-roll__char-item--clone">{char}</span>
            </span>
          </span>
        );
      })}
    </Component>
  );
};
