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

    const createFlipBook = (pf: PageFlip) => {
        const arrayOfSectionsNames: Array<ToCItem> = [];
        foStudy.map((g) => {
            index++;
            g.pagenumber = index;
            arrayOfSectionsNames.push({
                section: 'Kierunki',
                pageNumber: index,
                title: g.matter.name,
            });
            AddPagesWithContent(g);
        });
        index++;
        AddFrontPage({ title: 'Koła naukowe na naszej uczelni!' });
        science.map((g) => {
            index++;
            arrayOfSectionsNames.push({ section: g.matter.section, pageNumber: index, title: g.matter.name });
            AddPagesWithContent(g);
        });
        index++;
        AddFrontPage({ title: 'Nasi Absolwenci' });

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

    // const onKeyPress = (e: KeyboardEvent) => {
    //     const { key } = e;

    //     if (bookFlip && bookFlip.pageFlip) {
    //         if (key == 'ArrowRight') {
    //             if (bookFlip.currentPage + 2 < bookFlip?.pageFlip?.getPageCount())
    //                 router.push({ pathname: '/', query: { page: bookFlip.currentPage + 2 } });
    //         }
    //         if (key == 'ArrowLeft') {
    //             if (bookFlip.currentPage - 2 >= 0)
    //                 router.push({ pathname: '/', query: { page: bookFlip.currentPage - 2 } });
    //         }
    //     }
    // };

    useEffect(() => {
        if (bookFlip?.pageFlip) {
            bookFlip.setCurrentPage(parseInt(router.query.page as string));
        }
    }, [router.query.page, bookFlip?.pageFlip]);

    useEffect(() => {
        if (bookFlip?.pageFlip) {
            bookFlip.pageFlip.turnToPage(bookFlip.currentPage);
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
        // window.addEventListener('keydown', onKeyPress);
        return () => {
            // window.removeEventListener('keydown', onKeyPress);
        };
    }, []);

    return (
        <Wrapper>
            <BookFlip ref={setRef} createPages={createFlipBook} />
            <div className="md:visible hidden absolute z-10 bottom-10 w-full">
                <div className="flex flex-row relative mt-0 " id="page-counter">
                    <div className="flex flex-row justify-center items-center">
                        <Btn onClick={bookFlip?.prevPage} className="mr-4" id="prev">
                            <Chevron className="rotate-180" color="white" />
                        </Btn>
                        <div className="flex flex-row gap-1">
                            Strona <div id="page-current">{bookFlip?.currentPage}</div> z{' '}
                            <div id="page-total">{totalPages}</div>
                        </div>
                        <Btn onClick={bookFlip?.nextPage} className="ml-4" id="next">
                            <Chevron className="" color="white" />
                        </Btn>
                    </div>
                </div>
                <TableOfContents tableOfContentsArray={tableOfContentArray} />
            </div>
            <div className="visible md:hidden absolute z-10 bottom-10 w-full">
                <div className="flex flex-row justify-between items-center px-4">
                    <Btn onClick={bookFlip?.prevPage} className="mr-4" id="prev">
                        <Chevron className="rotate-180" color="white" />
                    </Btn>
                    <div className="flex flex-row gap-1">
                        Strona <div id="page-current">{bookFlip?.currentPage}</div> z{' '}
                        <div id="page-total">{totalPages}</div>
                    </div>
                    <Btn onClick={bookFlip?.nextPage} className="ml-4" id="next">
                        <Chevron className="" color="white" />
                    </Btn>
                </div>
            </div>
            <div className="absolute z-10 top-4 right-4">
                <TableOfContents tableOfContentsArray={tableOfContentArray} />
            </div>
        </Wrapper>
    );
};
