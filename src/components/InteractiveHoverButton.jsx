import React from 'react';
import { ArrowRight } from 'lucide-react';
import './InteractiveHoverButton.css';

export const InteractiveHoverButton = ({
  children,
  className = '',
  as = 'button',
  ...props
}) => {
  const elementProps = {
    className: `interactive-hover-button ${className}`.trim(),
    ...props,
  };

  if (as === 'button' && !('type' in elementProps)) {
    elementProps.type = 'button';
  }

  return React.createElement(
    as,
    elementProps,
    <>
      <div className="ihb-container-1">
        <div className="ihb-dot"></div>
        <span className="ihb-text-1">{children}</span>
      </div>
      <div className="ihb-container-2">
        <span>{children}</span>
        <ArrowRight size={20} />
      </div>
    </>,
  );
};

export default InteractiveHoverButton;
