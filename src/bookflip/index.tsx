import React from 'react';
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

export const insertMarkdownPage = ({ content }: { content: string }) => {
    FlipBookPage({ element: <PlainPage content={content} /> });
};
