import React, { ReactNode } from 'react';
import { MatterInterface } from '@/src/utils/matterInterface';
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
    const title = document.createElement('h1');
    const faculty = document.createElement('h2');
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
