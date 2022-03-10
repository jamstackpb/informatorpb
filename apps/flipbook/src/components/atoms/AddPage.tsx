import React from 'react';
import ReactDOMServer from 'react-dom/server';

interface typOfStudy {
    stationary: boolean;
    partTime: boolean;
}

interface fosMatter {
    name: string;
    engineering: typOfStudy;
    master: typOfStudy;
    specialities: string;
    jobPerspectives: string;
    maturaSubjects: string;
    equation: string;
}

interface fosData {
    changedToMatter: fosMatter;
    clean: string;
    faculty: string;
}

export const AddFOSPage = (fos: fosData) => {
    const loc = document.getElementById('page-storage');
    const page = document.createElement('div');
    const calculator = document.createElement('div');
    const title = document.createElement('h1');
    const faculty = document.createElement('h2');
    const n1 = document.createElement('input');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const tr1 = document.createElement('tr');
    const tr2 = document.createElement('tr');
    const tr3 = document.createElement('tr');
    const th1 = document.createElement('th');
    const th2 = document.createElement('th');
    const th3 = document.createElement('th');
    const th4 = document.createElement('th');
    const th5 = document.createElement('th');
    const th6 = document.createElement('th');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');

    const pageContent = document.createElement('div');
    const pageText = document.createElement('div');
    page.className = 'page';
    title.innerText = fos.changedToMatter.name;
    faculty.innerText = 'Wydział ' + fos.faculty;
    pageContent.className = 'prose ml-4 mt-4 flex flex-col';
    calculator.className = 'h-24 bg-cyan-500';
    n1.type = 'number';
    n1.min = '0';
    n1.max = '100';
    n1.placeholder = '60';
    n1.id = 'nr1';
    n1.step = '1';
    n1.className = 'h-8 text-slate-700';
    n1.name = 'numer1';

    calculator.appendChild(n1);

    pageText.className = 'flex justify-center';
    pageText.innerHTML = fos.clean;

    th1.innerText = 'STUDIA I STOPNIA INŻYNIERSKIE, LICENCJACKIE';
    th2.innerText = 'STUDIA II STOPNIA MAGISTERSKIE';

    th1.colSpan = 2;
    th2.colSpan = 2;

    th3.innerText = 'stacjonarne';
    th4.innerText = 'niestacjonarne';
    th5.innerText = 'stacjonarne';
    th6.innerText = 'niestacjonarne';

    td1.textContent = fos.changedToMatter.engineering.stationary ? '✔' : '';
    td2.textContent = fos.changedToMatter.engineering.partTime ? '✔' : '';
    td3.textContent = fos.changedToMatter.master.stationary ? '✔' : '';
    td4.textContent = fos.changedToMatter.master.partTime ? '✔' : '';

    tr1.appendChild(th1);
    tr1.appendChild(th2);

    tr2.appendChild(th3);
    tr2.appendChild(th4);
    tr2.appendChild(th5);
    tr2.appendChild(th6);

    tr3.appendChild(td1);
    tr3.appendChild(td2);
    tr3.appendChild(td3);
    tr3.appendChild(td4);

    thead.appendChild(tr1);
    thead.appendChild(tr2);
    tbody.appendChild(tr3);

    table.appendChild(thead);
    table.appendChild(tbody);

    pageContent.appendChild(title);
    pageContent.appendChild(faculty);
    pageContent.appendChild(table);
    pageContent.appendChild(calculator);
    pageContent.appendChild(pageText);
    page.appendChild(pageContent);
    loc!.appendChild(page);
};

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

const FlipBookPage: React.FC = ({ children }) => {
    return (
        <div className="page">
            <div className="max-w-none flex">
                <div className={`prose flex flex-col p-8 m-0`}>{children}</div>
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
export const AddPlainPage = ({ content }: { content: string }) => {
    AddReactPage({ element: <PlainPage content={content} /> });
};
