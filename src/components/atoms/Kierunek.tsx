import type { getFieldsOfStudy } from '@/ssg/fieldofstudy';
import { Kalkulator } from './Kalkulator';
import React, { useState } from 'react';

type KierunekProps = ReturnType<typeof getFieldsOfStudy> extends Array<infer R> ? R : never;

export const Kierunek: React.FC<KierunekProps> = ({
    matter: { faculty, engineering, equationSubjects, jobPerspectives, master, name, specialities },
    content,
}) => {
    const searchParam = name;

    const [tab, setTab] = useState(
        new URL(window.location.href).searchParams.get(searchParam) as 'opis' | 'kalkulator' | undefined,
    );

    const route = (r: typeof tab) => {
        setTab(r);
        const urlParams = new URL(window.location.href);

        if (r) {
            urlParams.searchParams.set(searchParam, r);
        }
        history.replaceState({}, '', '/' + urlParams.search);
    };

    const Tabela: React.FC = ({ children }) => (
        <table className="tracking-tight text-center text-sm mb-2 mt-0 font-bold">{children}</table>
    );

    return (
        <>
            <h2 className="mb-0">{name}</h2>
            <h3 className="text-green-500">{'Wydział ' + faculty}</h3>
            <Tabela>
                <thead>
                    <tr>
                        <th colSpan={2}>
                            <div>Studia Inżynierskie/Licencjackie</div>
                        </th>
                        <th colSpan={2}>
                            <div>Studia Magisterskie</div>
                        </th>
                    </tr>
                    <tr>
                        <th>stacjonarne</th>
                        <th>niestacjonarne</th>
                        <th>stacjonarne</th>
                        <th>niestacjonarne</th>
                    </tr>
                </thead>
                <tbody>
                    <td>{engineering.stationary ? '✔' : ''}</td>
                    <td>{engineering.partTime ? '✔' : ''}</td>
                    <td>{master.stationary ? '✔' : ''}</td>
                    <td>{master.partTime ? '✔' : ''}</td>
                </tbody>
            </Tabela>
            <div
                className="flex "
                onMouseMove={(e) => {
                    if (!e.button) {
                        e.stopPropagation();
                        return false;
                    }
                }}
            >
                <div
                    onClick={() => route('opis')}
                    onMouseDown={(e) => {
                        e.stopPropagation();
                        return false;
                    }}
                    className={`font-bold cursor-pointer px-4 py-1 border-b-2 border-current ${
                        !tab || tab === 'opis' ? 'text-green-600' : 'text-gray-600'
                    }`}
                >
                    Opis
                </div>
                <div
                    onClick={() => route('kalkulator')}
                    onMouseDown={(e) => {
                        e.stopPropagation();
                        return false;
                    }}
                    className={`font-bold cursor-pointer px-4 py-1 border-b-2 border-current ${
                        tab === 'kalkulator' ? 'text-green-600' : 'text-gray-600'
                    }`}
                >
                    Kalkulator
                </div>
            </div>
            {(!tab || tab === 'opis') && (
                <div
                    dangerouslySetInnerHTML={{ __html: content }}
                    className="leading-0 space-y-0 tracking-tight mt-0 text-base"
                />
            )}
            {tab === 'kalkulator' && <Kalkulator equationSubjects={equationSubjects} />}
        </>
    );
};
