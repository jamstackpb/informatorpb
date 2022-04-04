import React, { Component, useState } from 'react';
import { findDOMNode, render } from 'react-dom';

export type PartOfEquation = { name: string } & (
    | { factor: number }
    | { options: Array<{ name: string; factor: number }> }
);

export const PrzedmiotInput: React.FC<{ przedmiot: string; value: number; setValue: (e: number) => void }> = ({
    przedmiot,
    setValue,
    value,
}) => {
    return (
        <div className="flex items-center text-sm border-b">
            <label className="mr-4 font-bold">{przedmiot}</label>
            <input
                type="number"
                value={value}
                onChange={(e) => setValue(parseFloat(e.target.value))}
                className="p-2"
                step={0.01}
                min={0}
                max={100}
            />
        </div>
    );
};

export const Kalkulator: React.FC<{ equationSubjects: Array<PartOfEquation> }> = ({ equationSubjects }) => {
    const [state, setState] = useState<
        Record<
            string,
            | {
                  factor?: number;
                  value?: number;
                  currentName?: string;
              }
            | undefined
        >
    >({});
    const setPrzedmiotValue = (name: string, factor: number, value: number) => {
        setState((s) => ({
            ...s,
            [name]: {
                factor,
                value,
            },
        }));
    };
    console.log(state);
    return (
        <>
            <form className="w-full">
                {equationSubjects.map((es) => {
                    if (es.name && 'factor' in es) {
                        return (
                            <PrzedmiotInput
                                przedmiot={es.name}
                                value={state[es.name]?.value || 0.0}
                                setValue={(e) => {
                                    setPrzedmiotValue(es.name, es.factor, e);
                                }}
                            />
                        );
                    }
                    if (es.name && 'options' in es) {
                        return (
                            <>
                                <select
                                    onChange={(e) => {
                                        setState((s) => ({
                                            ...s,
                                            [es.name]: {
                                                value: 0,
                                                currentName: e.target.value,
                                            },
                                        }));
                                    }}
                                >
                                    {es.options.map((o) => {
                                        return <option key={o.name} value={o.name}>{`${o.name} - ${o.factor}`}</option>;
                                    })}
                                </select>
                                {state[es.name]?.currentName && (
                                    <PrzedmiotInput
                                        przedmiot={es.name}
                                        value={state[es.name]?.value || 0.0}
                                        setValue={(e) => {
                                            setPrzedmiotValue(
                                                es.name,
                                                es.options.find((o) => o.name === state[es.name]?.currentName)
                                                    ?.factor || 0.0,
                                                e,
                                            );
                                        }}
                                    />
                                )}
                            </>
                        );
                    }
                })}
            </form>
        </>
    );
};
