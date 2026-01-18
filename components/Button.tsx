
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-10 py-4 font-bold uppercase tracking-wider transition-all duration-400 font-oswald text-sm md:text-base";
  
  const variants = {
    primary: "bg-gold-gradient text-black hover:-translate-y-1 hover:brightness-110 hover:shadow-[0_10px_20px_rgba(212,175,55,0.3)]",
    outline: "bg-transparent border border-white/30 text-white hover:border-gold hover:text-gold"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
