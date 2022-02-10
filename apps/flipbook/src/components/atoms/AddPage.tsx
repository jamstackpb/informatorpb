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

const PageImageComponent: React.FC<{ src: string; content: string }> = ({ content, src }) => {
    return (
        <div className="page">
            <div className="prose flex flex-col ml-4">
                <img src={src} />
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
        </div>
    );
};
export const AddPageImage = ({ content, src }: { content: string; src: string }) => {
    let loc = document.getElementById('page-storage');
    let page = document.createElement('div');
    page.innerHTML = ReactDOMServer.renderToString(<PageImageComponent content={content} src={src} />);
    loc!.appendChild(page);
};
