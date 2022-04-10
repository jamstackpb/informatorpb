import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Absolwent } from './Absolwent';
import { KoloNaukowe } from './KoloNaukowe';
import { Kierunek } from '@/src/components/atoms/Kierunek';
import { ContentPageProps } from '@/src/models';
import { TableOfContents } from './TableOfContents';
import ReactDOM from 'react-dom';
import { FancyTest } from './fancyTest';

export interface MatterInterface {
    matter: { [key: string]: string };
    content: string;
}
export type TableOfContents = {
    section: string;
    page: number;
}[];
export const AddPage = (
    pageClass: string,
    pageContentClass: string,
    pageTextClass: string,
    pageTextContent: string,
) => {
    let loc = document.getElementById('page-storage');
    let page = document.createElement('div');
    let pageContent = document.createElement('div');
    let pageText = document.createElement('div');
    page.className = 'page' + ' ' + pageClass;
    pageContent.className = pageContentClass;
    pageText.className = pageTextClass;
    pageText.innerHTML = pageTextContent;
    pageContent.appendChild(pageText);
    page.appendChild(pageContent);
    loc!.appendChild(page);
};
enum PageType {
    ABSOLWENT = 'absolwent',
    KOLO_NAUKOWE = 'kolo_naukowe',
    KIERUNEK = 'kierunek',
    SPIS_TRESCI = 'spis_tresci',
}

const FlipBookPage: React.FC<{
    pageNumber?: number;
    table: TableOfContents;
}> = ({ children, pageNumber, table }) => {
    return (
        <div className="page">
            {pageNumber && pageNumber % 2 !== 0 && <FancyTest table={table} />}
            <div className="max-w-none flex justify-center">
                <div className={`prose flex flex-col w-max p-8 m-0`}>{children}</div>
            </div>
        </div>
    );
};

const PlainPage: React.FC<{
    content: string;
    pageNumber: number;
    table: TableOfContents;
}> = ({ content, pageNumber, table }) => {
    return (
        <FlipBookPage table={table} pageNumber={pageNumber}>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </FlipBookPage>
    );
};

const PagesSection: React.FC<{
    pageProps: ContentPageProps;
    table: TableOfContents;
}> = ({ pageProps, table }) => {
    switch (pageProps.pageType) {
        case PageType.ABSOLWENT:
            return (
                <FlipBookPage table={table} pageNumber={pageProps.pagenumber}>
                    <Absolwent {...pageProps} />
                </FlipBookPage>
            );

        case PageType.KOLO_NAUKOWE:
            return (
                <FlipBookPage table={table} pageNumber={pageProps.pagenumber}>
                    <KoloNaukowe {...pageProps} />
                </FlipBookPage>
            );
        case PageType.KIERUNEK:
            return (
                <FlipBookPage table={table} pageNumber={pageProps.pagenumber}>
                    <Kierunek {...pageProps} />
                </FlipBookPage>
            );
        case PageType.SPIS_TRESCI:
            return (
                <FlipBookPage table={table} pageNumber={pageProps.pagenumber}>
                    <TableOfContents {...pageProps} />
                </FlipBookPage>
            );
        default:
            return <></>;
    }
};

const AddReactPage = ({ element }: { element: React.ReactElement<MatterInterface> }) => {
    let loc = document.getElementById('page-storage');
    let page = document.createElement('div');
    page.className = 'page';
    const pageContent = document.createElement('div');
    ReactDOM.render(element, pageContent);
    page.appendChild(pageContent);
    loc?.appendChild(page);
};

export const AddPagesWithContent = (props: ContentPageProps, table: TableOfContents) =>
    AddReactPage({ element: <PagesSection pageProps={props} table={table} /> });

export const AddPlainPage = ({
    content,
    pageNumber,
    table,
}: {
    content: string;
    pageNumber: number;
    table: TableOfContents;
}) => {
    AddReactPage({ element: <PlainPage table={table} content={content} pageNumber={pageNumber} /> });
};
