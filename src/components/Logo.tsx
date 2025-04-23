
import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 40, className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
    >
      <defs>
        <linearGradient id="maasGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#9b87f5', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#6E59A5', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path 
        d="M50 10 L85 50 L50 90 L15 50 Z" 
        fill="url(#maasGradient)"
        stroke="#7E69AB"
        strokeWidth="4"
      />
      <text 
        x="50" 
        y="55" 
        textAnchor="middle" 
        fill="white" 
        fontWeight="bold" 
        fontSize="30"
      >
        M
      </text>
    </svg>
  );
};
