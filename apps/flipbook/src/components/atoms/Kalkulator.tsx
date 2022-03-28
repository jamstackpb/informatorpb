import React from 'react';

export type equationType = {
    factor: string[];
    name: string[];
};

export type valueType = {
    factor: number;
    name: string;
};

const Value: React.FC<{ equation: equationType }> = ({ equation }) => {
    console.log(equation.name);
    return (
        <>
            <div className="pointer-events-none">
                <input
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                    type="number"
                    className="h-4 w-8 hover:bg-green-700 z-[500]"
                ></input>
            </div>
        </>
    );
};

export const Kalkulator: React.FC<{ equation: equationType; maturaSubjects: string }> = ({
    equation,
    maturaSubjects,
}) => {
    return (
        <div className="flex h-24 bg-slate-600 w-full pointer-events-none">
            <Value equation={equation}></Value>
        </div>
    );
};
