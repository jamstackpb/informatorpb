import React from 'react';
import { Absolwent } from './Absolwent';
import { KoloNaukowe } from './KoloNaukowe';
import { Kierunek } from '@/src/components/atoms/Kierunek';
import { ContentPageProps } from '@/src/models';
import { TableOfContents } from '../molecules/TableOfContents';
import { MarkdownPage } from '@/src/bookflip/MarkdownPage';
import { FlipBookPage } from '@/src/bookflip/FlipBookPage';
import { Front } from '@/src/components/atoms/FrontPage';

export interface MatterInterface {
    matter: { [key: string]: string };
    content: string;
}

export type TableOfContents = {
    section: string;
    page: number;
}[];

enum PageType {
    ABSOLWENT = 'absolwent',
    KOLO_NAUKOWE = 'kolo_naukowe',
    KIERUNEK = 'kierunek',
}

export const PagesSection: React.FC<ContentPageProps> = (props) => {
    switch (props.pageType) {
        case PageType.ABSOLWENT:
            return (
                <MarkdownPage>
                    <Absolwent {...props} />
                </MarkdownPage>
            );

        case PageType.KOLO_NAUKOWE:
            return (
                <MarkdownPage>
                    <KoloNaukowe {...props} />
                </MarkdownPage>
            );
        case PageType.KIERUNEK:
            return (
                <MarkdownPage>
                    <Kierunek {...props} />
                </MarkdownPage>
            );
        default:
            return <></>;
    }
};

export const AddPagesWithContent = (props: ContentPageProps) => FlipBookPage({ element: <PagesSection {...props} /> });

export const AddFrontPage = (props: { title: string }) => FlipBookPage({ element: <Front title={props.title} /> });
