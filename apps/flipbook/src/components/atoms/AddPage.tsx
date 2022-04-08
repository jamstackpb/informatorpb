import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Absolwent } from './Absolwent';
import { KoloNaukowe } from './KoloNaukowe';
import { Kierunek } from '@/src/components/atoms/Kierunek';
import { ContentPageProps } from '@/src/models';
import { TableOfContents } from './TableOfContents';
import ReactDOM from 'react-dom';

export interface MatterInterface {
    matter: { [key: string]: string };
    content: string;
}
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

const FlipBookPage: React.FC = ({ children }) => {
    return (
        <div className="page">
            <div className="max-w-none flex justify-center">
                <div className={`prose flex flex-col w-max p-8 m-0`}>{children}</div>
            </div>
        </div>
    );
};

const PlainPage: React.FC<{ content: string }> = ({ content }) => {
    return (
        <FlipBookPage>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </FlipBookPage>
    );
};

const PagesSection: React.FC<ContentPageProps> = (props) => {
    switch (props.pageType) {
        case PageType.ABSOLWENT:
            return (
                <FlipBookPage>
                    <Absolwent {...props} />
                </FlipBookPage>
            );

        case PageType.KOLO_NAUKOWE:
            return (
                <FlipBookPage>
                    <KoloNaukowe {...props} />
                </FlipBookPage>
            );
        case PageType.KIERUNEK:
            return (
                <FlipBookPage>
                    <Kierunek {...props} />
                </FlipBookPage>
            );
        case PageType.SPIS_TRESCI:
            return (
                <FlipBookPage>
                    <TableOfContents {...props} />
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

export const AddPagesWithContent = (props: ContentPageProps) => AddReactPage({ element: <PagesSection {...props} /> });

export const AddPlainPage = ({ content }: { content: string }) => {
    AddReactPage({ element: <PlainPage content={content} /> });
};
