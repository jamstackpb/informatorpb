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

export const LastPage: React.FC<{
    content?: string;
}> = ({ content }) => {
    return (
        <>
            {content ? (
                <MarkdownPage>
                    <div dangerouslySetInnerHTML={{ __html: content }}></div>
                </MarkdownPage>
            ) : (
                <></>
            )}
            <div className="block relative z-10 bottom-0 w-full text-[#111] font-normal text-center">
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
        </>
    );
};

export const insertMarkdownPage = ({ content }: { content: string }) => {
    FlipBookPage({ element: <PlainPage content={content} /> });
};
