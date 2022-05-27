import React from 'react';

export const FullScreen: React.FC<{ color?: any; className?: string; fullScreenmModeOn: boolean }> = ({
    color,
    className,
    fullScreenmModeOn,
}) => {
    return (
        <svg
            height="14px"
            version="1.1"
            viewBox="0 0 14 14"
            width="14px"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <g fill={color} fillRule="evenodd" stroke="none" strokeWidth="1">
                {fullScreenmModeOn ? (
                    <path
                        d="M0,11 L3,11 L3,14 L5,14 L5,9 L0,9 L0,11 L0,11 Z M3,3 L0,3 L0,5 L5,5 L5,0 L3,0 L3,3 L3,3 Z M9,14 L11,14 L11,11 L14,11 L14,9 L9,9 L9,14 L9,14 Z M11,3 L11,0 L9,0 L9,5 L14,5 L14,3 L11,3 L11,3 Z"
                        id="Shape"
                    />
                ) : (
                    <path
                        d="M2,9 L0,9 L0,14 L5,14 L5,12 L2,12 L2,9 L2,9 Z M0,5 L2,5 L2,2 L5,2 L5,0 L0,0 L0,5 L0,5 Z M12,12 L9,12 L9,14 L14,14 L14,9 L12,9 L12,12 L12,12 Z M9,0 L9,2 L12,2 L12,5 L14,5 L14,0 L9,0 L9,0 Z"
                        id="Shape"
                    />
                )}
            </g>
        </svg>
    );
};
