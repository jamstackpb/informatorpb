import { insertMarkdownPage } from '@/src/bookflip';
import { AddPagesWithContent, AddFrontPage } from '@/src/components/atoms/AddPage';
import { Wrapper, LogoPB, Btn } from '@/src/styles/styleBook';
import { getFieldsOfStudy, Graduate, getScienceContent } from '@/ssg';
import { TableOfContents } from '../atoms/TableOfContents';
import { useRouter } from 'next/router';
import { PageFlip } from 'page-flip';
import React, { useEffect, useState } from 'react';
import { Chevron } from '../atoms/chevron';
import { ToCItem } from '@/src/bookflip/models';
import { BookFlip, BookFlipActions } from '@/src/bookflip/BookFlip';
import { useImperativeRef } from '@/src/hooks/useImperativeRef';

interface IFlipBook {
    pages: Array<{
        changedToMatter: {
            [key: string]: any;
        };
        clean: string;
    }>;
    graduate: ReturnType<typeof Graduate>;
    science: ReturnType<typeof getScienceContent>;
    foStudy: ReturnType<typeof getFieldsOfStudy>;
    // tableOfContents: ReturnType<typeof getTableOfContents>;

    whichPage?: number;
}

export const FlipBook: React.FC<IFlipBook> = ({ pages, graduate, science, foStudy }) => {
    const [tableOfContentArray, setTableOfContentArray] = useState<Array<ToCItem>>([]);
    const router = useRouter();
    const [totalPages, setTotalPages] = useState(0);
    let index = 0;
    const [bookFlip, setRef] = useImperativeRef<BookFlipActions>();
    const [queryLoaded, setQueryLoaded] = useState(false);

    const createFlipBook = (pf: PageFlip) => {
        const arrayOfSectionsNames: Array<ToCItem> = [];
        AddFrontPage({ title: 'Informator PB' });
        index++;
        foStudy.map((g) => {
            g.pagenumber = index;
            arrayOfSectionsNames.push({
                section: 'Kierunki',
                pageNumber: index,
                title: g.matter.name,
            });
            AddPagesWithContent(g);
            index++;
        });
        AddFrontPage({ title: 'Koła naukowe na naszej uczelni!' });
        index++;
        science.map((g) => {
            index++;
            arrayOfSectionsNames.push({ section: g.matter.section, pageNumber: index, title: g.matter.name });
            AddPagesWithContent(g);
        });
        AddFrontPage({ title: 'Nasi Absolwenci' });
        index++;

        graduate.map((g) => {
            index++;
            arrayOfSectionsNames.push({ section: g.matter.section, pageNumber: index, title: g.matter.name });
            g.pagenumber = index;

            AddPagesWithContent(g);
        });
        pages.sort((a, b) => a?.changedToMatter.pageNumber - b?.changedToMatter.pageNumber);
        const pageSections: string[] = [];
        pages.map((p) => {
            index++;
            if (!pageSections.includes(p.changedToMatter.section)) {
                pageSections.push(p.changedToMatter.section);
                arrayOfSectionsNames.push({
                    section: p.changedToMatter.section,
                    pageNumber: index,
                    title: p.changedToMatter.section,
                });
            }
            insertMarkdownPage({ content: p.clean });
        });
        setTableOfContentArray(arrayOfSectionsNames);
        setTotalPages(index);
    };

    useEffect(() => {
        if (router.query.page === undefined) {
            return;
        }
        if (bookFlip?.pageFlip && !queryLoaded) {
            const pageNumber = parseInt(router.query.page as string);
            if (pageNumber !== bookFlip.currentPage) {
                bookFlip.setCurrentPage(pageNumber);
                setQueryLoaded(true);
            }
        }
    }, [router.query.page, bookFlip?.pageFlip, queryLoaded]);

    useEffect(() => {
        if (bookFlip?.pageFlip) {
            let videos = document.querySelectorAll('iframe, video');
            Array.prototype.forEach.call(videos, function (video) {
                if (video.tagName.toLowerCase() === 'video') {
                    video.pause();
                } else {
                    let src = video.src;
                    video.src = src;
                }
            });
        }
    }, [bookFlip?.currentPage, bookFlip?.pageFlip]);

    useEffect(() => {
        return () => {};
    }, []);

    return (
        <Wrapper>
            <BookFlip
                ref={setRef}
                createPages={createFlipBook}
                onChangePage={(pageNumber) => {
                    router.push(`/?page=${pageNumber}`);
                }}
            />
            <div className="md:visible hidden absolute z-10 bottom-10 w-full">
                <div className="flex flex-row relative mt-0 " id="page-counter">
                    <div className="flex flex-row justify-around items-center">
                        <Btn onClick={bookFlip?.prevPage} id="prev">
                            <Chevron className="rotate-180" color="white" />
                        </Btn>
                        <div className="flex flex-row gap-1">
                            Strona <div id="page-current">{bookFlip?.currentPage}</div> z{' '}
                            <div id="page-total">{totalPages}</div>
                        </div>
                        <Btn onClick={bookFlip?.nextPage} id="next">
                            <Chevron className="" color="white" />
                        </Btn>
                    </div>
                </div>
                <TableOfContents
                    setPage={(pn) => bookFlip?.setCurrentPage(pn)}
                    tableOfContentsArray={tableOfContentArray}
                />
            </div>
            <div className="visible md:hidden absolute z-10 bottom-10 w-full">
                <div className="flex flex-row justify-around items-center px-4">
                    <Btn onClick={bookFlip?.prevPage} id="prev">
                        <Chevron className="rotate-180" color="white" />
                    </Btn>
                    <div className="flex flex-row gap-1">
                        Strona <div id="page-current">{bookFlip?.currentPage}</div> z{' '}
                        <div id="page-total">{totalPages}</div>
                    </div>
                    <Btn onClick={bookFlip?.nextPage} id="next">
                        <Chevron className="" color="white" />
                    </Btn>
                </div>
            </div>
            <div className="absolute z-10 top-4 right-4">
                <TableOfContents
                    setPage={(pn) => bookFlip?.setCurrentPage(pn)}
                    tableOfContentsArray={tableOfContentArray}
                />
            </div>
        </Wrapper>
    );
};
