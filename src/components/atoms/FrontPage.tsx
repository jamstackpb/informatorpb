import React from 'react';
import Link from 'next/link';

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
            <div className="block relative z-10 bottom-0 w-full text-[#eee] font-normal text-center">
                <p className="">
                    Created by{' '}
                    <Link href="https://jamstackpb.github.io/main/">
                        <a>Koło Naukowe JAMSTACK</a>
                    </Link>{' '}
                </p>
                <p>
                    {' '}
                    Copyright &#169; 2022{' '}
                    <Link href="https://pb.edu.pl/">
                        <a>Politechnika Białostocka</a>
                    </Link>{' '}
                </p>
            </div>
        </div>
    );
};
