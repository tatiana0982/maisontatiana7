'use client';
import React, { useState } from 'react';

interface EditTextProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  disabled?: boolean;
  required?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outline';
  error?: string;
  label?: string;
  fullWidth?: boolean;
}

const EditText: React.FC<EditTextProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
  placeholder = '',
  value,
  onChange,
  type = 'text',
  disabled = false,
  required = false,
  className = '',
  size = 'md',
  variant = 'default',
  error,
  label,
  fullWidth = false,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const variants = {
    default: 'bg-global-2 border-0 text-edittext-1 focus:ring-2 focus:ring-gray-300',
    filled: 'bg-gray-100 border-0 text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500',
    outline: 'bg-transparent border border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm sm:px-3 sm:py-2 sm:text-sm',
    md: 'px-4 py-3 text-sm sm:px-6 sm:py-3.5 sm:text-base md:text-base',
    lg: 'px-5 py-4 text-base sm:px-6 sm:py-4 sm:text-lg md:text-lg'
  };

  const inputClasses = `
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}
    rounded-[5px]
    transition-all
    duration-200
    ease-in-out
    focus:outline-none
    placeholder:text-edittext-1
    font-hellix
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={`${fullWidth ? 'w-full' : ''} flex flex-col`}>
      {label && (
        <label className="mb-2 text-sm font-medium text-gray-700 sm:text-base">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value !== undefined ? value : internalValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        required={required}
        className={inputClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${props.id || 'input'}-error` : undefined}
        {...props}
      />
      {error && (
        <span 
          id={`${props.id || 'input'}-error`}
          className="mt-1 text-sm text-red-600 sm:text-base"
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default EditText;