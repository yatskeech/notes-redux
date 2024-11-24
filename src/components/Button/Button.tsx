import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined';
}

export function Button({
  variant = 'contained',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'text-fgpx-8 py-3 rounded-md transition-colors',
        {
          'bg-bg hover:bg-bg_h': variant === 'contained',
          'border border-fg hover:bg-bg2': variant === 'outlined',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
