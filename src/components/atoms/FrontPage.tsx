import React from 'react';

const logo = 'https://pb.edu.pl/wp-content/themes/pb/assets/img/logo-pb-w.png';
const godlo = 'https://pb.edu.pl/wp-content/themes/pb/assets/img/godlo.png';
const LogoPB: React.FC<{ src: string }> = ({ src }) => <img className="ml-3 object-contain" src={src} />;
const Godlo: React.FC<{ src: string }> = ({ src }) => <img className="mr-3 object-contain" src={src} />;

export const Front: React.FC<{ title: string }> = ({ title }) => {
    return (
        <div className="bg-green-700 h-full w-full absolute items-center justify-center flex flex-col">
            <h1 className="flex flex-row justify-center items-center mb-4">
                <Godlo src={godlo} />
                <div className="border-l-2 h-24"></div>
                <LogoPB src={logo} />
            </h1>
            <h2 className="text-white font-bold text-2xl">{title}</h2>
        </div>
    );
};
