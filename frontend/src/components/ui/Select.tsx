import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
    placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, options, placeholder, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}
                <select
                    ref={ref}
                    className={twMerge(
                        clsx(
                            "w-full px-4 py-2 border rounded-lg shadow-sm outline-none transition-all bg-white",
                            "focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                            "disabled:bg-gray-100 disabled:text-gray-500",
                            error
                                ? "border-red-500 focus:ring-red-200"
                                : "border-gray-300"
                        ),
                        className
                    )}
                    {...props}
                >
                    {placeholder && <option value="">{placeholder}</option>}
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <p className="mt-1 text-sm text-red-500 animate-fadeIn">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';
