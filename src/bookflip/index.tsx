import React from 'react';
import Link from 'next/link';
import { MarkdownPage } from '@/src/bookflip/MarkdownPage';
import { FlipBookPage } from '@/src/bookflip/FlipBookPage';

export const PlainPage: React.FC<{
    content: string;
}> = ({ content }) => {
    return (
        <MarkdownPage>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </MarkdownPage>
    );
};

export const LastPage: React.FC = () => {
    return (
        <div className="max-w-none flex justify-center h-full items-center">
            <div className="prose flex flex-col w-max p-8 m-0">
                <div className="flex items-center w-full">
                    <div className="block my-0 w-full text-[#111] font-normal text-center">
                        <p className="">
                            Created by{' '}
                            <Link href="https://jamstackpb.github.io/main/">
                                <a>Koło Naukowe JAMSTACK</a>
                            </Link>
                        </p>
                        <p>
                            Copyright &#169; 2022{' '}
                            <Link href="https://pb.edu.pl/">
                                <a>Politechnika Białostocka</a>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const insertMarkdownPage = ({ content }: { content: string }) => {
    FlipBookPage({ element: <PlainPage content={content} /> });
};
