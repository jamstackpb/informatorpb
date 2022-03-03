import React, { ReactNode } from 'react';
import { MatterInterface } from '@/src/utils/matterInterface';
import ReactDOMServer from 'react-dom/server';
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

const PagesSection: React.FC<MatterInterface> = ({ matter, content }) => {
    return matter.pageType === PageType.ABSOLWENT ? (
        <FlipBookPage>
            <div className="flex flex-row items-center">
                <img width={250} height={250} src={matter.image} />
                <div className="pl-5">
                    <div>
                        <span className="font-extrabold">{matter.faculty}</span>{' '}
                    </div>
                    <div>
                        <span className="font-extrabold">{matter.academicTitle} </span> {matter.name}
                    </div>

                    <div>
                        <span className="font-extrabold">Zawód:</span> {matter.job}
                    </div>
                </div>{' '}
            </div>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </FlipBookPage>
    ) : matter.pageType === PageType.KOLO_NAUKOWE ? (
        <FlipBookPage>
            <h1 className=" w-max">{matter.name}</h1>
            {matter.video !== '---' && (
                <div className="flex justify-center">
                    <iframe className="aspect-video" src={matter.video} />
                </div>
            )}
            <div> {matter.website !== '---' && `Sprawdź nas na ${matter.website}`}</div>
        </FlipBookPage>
    ) : null;
};

const AddReactPage = ({ element }: { element: React.ReactElement<MatterInterface> }) => {
    let loc = document.getElementById('page-storage');
    let page = document.createElement('div');
    page.innerHTML = ReactDOMServer.renderToString(element);
    loc!.appendChild(page);
};

export const AddPagesWithContent = ({ matter, content }: MatterInterface) =>
    AddReactPage({ element: <PagesSection matter={matter} content={content} /> });

export const AddPlainPage = ({ content }: { content: string }) => {
    AddReactPage({ element: <PlainPage content={content} /> });
};
