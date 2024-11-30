import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}

export function Input({ className, errorMessage, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-min">
      <input
        className={clsx(
          'px-4 py-2 rounded-md border bg-bg2',
          'placeholder:text-fg4 outline-none outline-offset-0',
          {
            ['text-fg border-fg focus:outline-fg']: !errorMessage,
            ['text-red border-red focus:outline-red']: errorMessage,
          },
          className
        )}
        autoComplete='off'
        {...props}
      />
      <p className="text-red text-xs">{errorMessage}</p>
    </div>
  );
}
