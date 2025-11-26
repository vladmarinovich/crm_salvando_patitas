import { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CardProps {
    children: ReactNode;
    className?: string;
    title?: string;
}

export const Card = ({ children, className, title }: CardProps) => {
    return (
        <div className={cn("bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden", className)}>
            {title && (
                <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800">{title}</h3>
                </div>
            )}
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};
