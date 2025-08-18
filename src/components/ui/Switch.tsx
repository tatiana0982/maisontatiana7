'use client';
import React, { useState } from 'react';

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  label?: string;
  description?: string;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked: controlledChecked,
  onChange,
  disabled = false,
  size = 'md',
  color = 'primary',
  label,
  description,
  className = ''
}) => {
  const [internalChecked, setInternalChecked] = useState(controlledChecked || false);
  
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    
    const newChecked = !isChecked;
    if (controlledChecked === undefined) {
      setInternalChecked(newChecked);
    }
    if (onChange) {
      onChange(newChecked);
    }
  };

  const sizes = {
    sm: {
      track: 'w-8 h-4 sm:w-9 sm:h-5',
      thumb: 'w-3 h-3 sm:w-4 sm:h-4',
      translate: isChecked ? 'translate-x-4 sm:translate-x-5' : 'translate-x-0'
    },
    md: {
      track: 'w-10 h-5 sm:w-11 sm:h-6',
      thumb: 'w-4 h-4 sm:w-5 sm:h-5',
      translate: isChecked ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0'
    },
    lg: {
      track: 'w-12 h-6 sm:w-14 sm:h-7',
      thumb: 'w-5 h-5 sm:w-6 sm:h-6',
      translate: isChecked ? 'translate-x-6 sm:translate-x-8' : 'translate-x-0'
    }
  };

  const colors = {
    primary: isChecked ? 'bg-blue-600' : 'bg-gray-200',
    secondary: isChecked ? 'bg-gray-600' : 'bg-gray-200',
    success: isChecked ? 'bg-green-600' : 'bg-gray-200',
    warning: isChecked ? 'bg-yellow-600' : 'bg-gray-200',
    danger: isChecked ? 'bg-red-600' : 'bg-gray-200'
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex flex-col">
        {label && (
          <label className="text-sm font-medium text-gray-700 mb-1 sm:text-base">
            {label}
          </label>
        )}
        <div className="flex items-center">
          <button
            type="button"
            role="switch"
            aria-checked={isChecked}
            onClick={handleToggle}
            disabled={disabled}
            className={`
              ${currentSize.track}
              ${colors[color]}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}
              relative
              inline-flex
              items-center
              rounded-full
              transition-colors
              duration-200
              ease-in-out
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-2
              touch-manipulation
            `.trim().replace(/\s+/g, ' ')}
          >
            <span
              className={`
                ${currentSize.thumb}
                ${currentSize.translate}
                bg-white
                rounded-full
                shadow-lg
                transform
                transition-transform
                duration-200
                ease-in-out
                pointer-events-none
              `.trim().replace(/\s+/g, ' ')}
            />
          </button>
          {description && (
            <span className="ml-3 text-sm text-gray-500 sm:text-base">
              {description}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Switch;