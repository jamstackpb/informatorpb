import React from 'react';
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

const FlipBookPage: React.FC<{ right?: boolean }> = ({ right, children }) => {
    return (
        <div className="page">
            <div className={`prose flex flex-col p-8 ${right ? 'pr-12' : 'pl-12'}`}>{children}</div>
        </div>
    );
};

const PlainPage: React.FC<{ content: string; right?: boolean }> = ({ content, right }) => {
    return (
        <FlipBookPage right={right}>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </FlipBookPage>
    );
};

const PageImageComponent: React.FC<{ src: string; content: string }> = ({ content, src }) => {
    return (
        <FlipBookPage>
            <img src={src} />
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </FlipBookPage>
    );
};

const AddReactPage = ({ element }: { element: React.ReactElement }) => {
    let loc = document.getElementById('page-storage');
    let page = document.createElement('div');
    page.innerHTML = ReactDOMServer.renderToString(element);
    loc!.appendChild(page);
};

export const AddPageImage = ({ content, src }: { content: string; src: string }) =>
    AddReactPage({ element: <PageImageComponent content={content} src={src} /> });
export const AddPlainPage = ({ content, right }: { content: string; right?: boolean }) => {
    AddReactPage({ element: <PlainPage right={right} content={content} /> });
};
