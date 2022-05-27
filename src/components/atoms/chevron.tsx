import React from 'react';

export const Chevron: React.FC<{ color?: any; className?: string }> = ({ color, className }) => {
    return (
        <svg
            className={className + ' feather feather-chevron-right'}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 21 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke={color}
            strokeWidth="2"
        >
            <polyline points="9 18 15 12 9 6" />
        </svg>
    );
};
