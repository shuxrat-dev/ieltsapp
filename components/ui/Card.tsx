import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`
      bg-gradient-to-br from-white/20 to-white/0 dark:from-black/40 dark:to-black/20
      backdrop-blur-2xl 
      border border-white/10 
      rounded-2xl 
      shadow-lg hover:shadow-2xl
      p-6
      transition-all duration-300
      ${className}
    `}>
      {children}
    </div>
  );
};
