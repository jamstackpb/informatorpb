import type { getFieldsOfStudy } from '@/ssg/fieldofstudy';
import React from 'react';

type KierunekProps = ReturnType<typeof getFieldsOfStudy> extends Array<infer R> ? R : never;

export const Kierunek: React.FC<KierunekProps> = ({
    matter: { faculty, engineering, equation, jobPerspectives, master, maturaSubjects, name, specialities },
    content,
}) => {
    return (
        <>
            <h1>{name}</h1>
            <h2>{'Wydział ' + faculty}</h2>
            <table>
                <thead>
                    <tr>
                        <th colSpan={2}>Studia I stopnia Inżynierskie, Licencjackie</th>
                        <th colSpan={2}>Studia II stopnia Magisterkie</th>
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
            </table>
            <div>{content}</div>
        </>
    );
};
