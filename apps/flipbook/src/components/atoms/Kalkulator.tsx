import React, { Component } from 'react';
import { findDOMNode, render } from 'react-dom';

export type equationType = {
    factor: string[];
    name: string[];
};

export const Kalkulator: React.FC<{ equation: equationType; maturaSubjects: string }> = ({
    equation,
    maturaSubjects,
}) => {
    return (
        <>
            <form className="bg-green-700 h-16 w-full">
                <div className="h-6 w-full inline-flex leading-4 justify-items-center">
                    <div className="h-6 m-1">0,5x</div>
                    <input
                        type="number"
                        value="50"
                        className="h-6 w-8 bg-green-600 hover:bg-green-500 text-center"
                        min={0}
                        max={100}
                        id="Mp"
                    />
                    <div className="h-6 m-1">+{equation.factor[1]}x</div>
                    <input
                        type="number"
                        value="50"
                        className="h-6 w-8 bg-green-600 hover:bg-green-500 text-center"
                        min={0}
                        max={100}
                        id="Mr"
                    />
                    {equation.factor[2] != '-1' && (
                        <div className="h-12 inline-flex">
                            <div className="h-6 m-1">+{equation.factor[2]}x</div>
                            <input
                                type="number"
                                value="50"
                                className="h-6 w-8 bg-green-600 hover:bg-green-500 text-center"
                                min={0}
                                max={100}
                                id="Fr"
                            />
                        </div>
                    )}
                    {equation.factor[2] == '-1' && (
                        <div className="h-12 inline-flex">
                            <div className="h-6 m-1 ml-0">+</div>
                            <select id="Wr" className="bg-yellow-300 h-6 w-16">
                                <option value={1.75}>1.75x Fizyka</option>
                                <option value={1.5}>1.50x Chemia, Informatyka </option>
                                <option value={1.25}>1.25x Biologia</option>
                            </select>
                            <input
                                type="number"
                                value="50"
                                className="h-6 w-8 bg-green-600 hover:bg-green-500 text-center"
                                min={0}
                                max={100}
                                id="Fr"
                            />
                        </div>
                    )}
                    <div className="h-6 m-1">+{equation.factor[3]}x</div>
                    <input
                        type="number"
                        value="50"
                        className="h-6 w-8 bg-green-600 hover:bg-green-500 text-center"
                        min={0}
                        max={100}
                        id="Op"
                    />
                    <div className="h-6 m-1">+{equation.factor[4]}x</div>
                    <input
                        type="number"
                        value="50"
                        className="h-6 w-8 bg-green-600 hover:bg-green-500 text-center"
                        min={0}
                        max={100}
                        id="Or"
                    />
                    {equation.factor[5] && (
                        <div className="h-12 inline-flex">
                            <div className="h-6 m-1">+{equation.factor[5]}x</div>
                            <input
                                type="number"
                                value="50"
                                className="h-6 w-8 bg-green-600 hover:bg-green-500 text-center"
                                min={0}
                                max={100}
                                id="R"
                            />
                        </div>
                    )}
                </div>
                <div>
                    <output className="h-12 w-24 bg-blue-600 leading-8" name="x" htmlFor="Mp" />
                </div>
            </form>
        </>
    );
};
