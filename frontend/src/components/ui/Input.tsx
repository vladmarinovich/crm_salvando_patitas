import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={twMerge(
                        clsx(
                            "w-full px-4 py-2 border rounded-lg shadow-sm outline-none transition-all",
                            "focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                            "disabled:bg-gray-100 disabled:text-gray-500",
                            error
                                ? "border-red-500 focus:ring-red-200"
                                : "border-gray-300"
                        ),
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-500 animate-fadeIn">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
