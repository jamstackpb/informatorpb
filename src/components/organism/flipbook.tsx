import { PlainPage, LastPage } from '@/src/bookflip';
import { Wrapper, Background, Btn } from '@/src/styles/styleBook';
import { getFieldsOfStudy, Graduate, getScienceContent } from '@/ssg';
import { TableOfContents } from '../molecules/TableOfContents';
import { useRouter } from 'next/router';
import { PageFlip } from 'page-flip';
import React, { useEffect, useState, useRef } from 'react';
import { ToCItem } from '@/src/bookflip/models';
import { BookFlip, BookFlipActions } from '@/src/bookflip/BookFlip';
import { useImperativeRef } from '@/src/hooks/useImperativeRef';
import { FullScreen, Chevron, Front, PagesSection } from '../atoms';
import { FlipBookPage } from '@/src/bookflip/FlipBookPage';

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
    whichPage?: number;
}

export const FlipBook: React.FC<IFlipBook> = ({ pages, graduate, science, foStudy }) => {
    let index = 0;
    const [tableOfContentArray, setTableOfContentArray] = useState<Array<ToCItem>>([]);
    const router = useRouter();
    const [bookFlip, setRef] = useImperativeRef<BookFlipActions>();
    const [queryLoaded, setQueryLoaded] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [fullscreen, setFullscreen] = useState(false);
    const [secondPage, setSecondPage] = useState(-1);
    const createFlipBook = (pf: PageFlip) => {
        const arrayOfSectionsNames: Array<ToCItem> = [];
        index++;
        foStudy.map((g) => {
            g.pagenumber = index;
            arrayOfSectionsNames.push({
                section: 'Kierunki',
                pageNumber: index,
                title: g.matter.name,
            });
            index++;
        });
        index++;
        science.map((g) => {
            index++;
            arrayOfSectionsNames.push({ section: g.matter.section, pageNumber: index, title: g.matter.name });
        });
        index++;
        graduate.map((g) => {
            index++;
            arrayOfSectionsNames.push({ section: g.matter.section, pageNumber: index, title: g.matter.name });
            g.pagenumber = index;
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
        });
        if (index % 2 == 0) {
            FlipBookPage({ element: <PlainPage content="" /> });
            index++;
        }
        FlipBookPage({
            element: <LastPage />,
        });
        index++;
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
                bookFlip.pageFlip.flip(pageNumber);
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
            if (typeof window !== 'undefined') {
                if (window.innerWidth > window.innerHeight) {
                    setSecondPage(bookFlip?.currentPage ? bookFlip?.currentPage + 1 : -1);
                } else {
                    setSecondPage(-1);
                }
            }
        }
    }, [bookFlip?.currentPage, bookFlip?.pageFlip]);

    return (
        <Background>
            <Wrapper id="wrapper" className={fullscreen == true ? 'scale-100' : 'md:scale-90 scale-100'}>
                <BookFlip
                    ref={setRef}
                    createPages={createFlipBook}
                    onChangePage={(pageNumber) => {
                        router.push(`/?page=${pageNumber}`);
                    }}
                >
                    {[<Front key="Informator PB" title="Informator PB" />]}
                    {foStudy.map((g) => {
                        return <PagesSection key={g.pagenumber} {...g} />;
                    })}
                    {[<Front key="Koła naukowe na naszej uczelni!" title="Koła naukowe na naszej uczelni!" />]}
                    {science.map((g) => {
                        return <PagesSection key={g.pagenumber} {...g} />;
                    })}
                    {[<Front key="Nasi Absolwenci" title="Nasi Absolwenci" />]}
                    {graduate.map((g) => {
                        return <PagesSection key={g.pagenumber} {...g} />;
                    })}
                    {pages.map((p, i) => {
                        return <PlainPage key={`plain-${i}`} content={p.clean} />;
                    })}
                    {[<LastPage />]}
                </BookFlip>
                <div className="md:block hidden absolute z-10 bottom-12 w-full ">
                    <div className="flex flex-row relative mt-0 justify-center items-center" id="page-counter">
                        <div className="flex flex-row justify-around items-center bg-[#22c55e] rounded-full">
                            <Btn onClick={() => bookFlip?.pageFlip?.flipPrev()}>
                                <Chevron className="rotate-180" color="white" />
                            </Btn>
                            <Btn
                                onClick={() => setFullscreen(!fullscreen)}
                                className={secondPage != -1 ? 'mx-2' : 'mx-2 hidden'}
                            >
                                <FullScreen color="white" fullScreenmModeOn={fullscreen} />
                            </Btn>
                            {secondPage != -1 ? (
                                <div className="flex flex-row gap-1 mx-5">
                                    Strony{' '}
                                    <div id="page-current">
                                        {bookFlip?.currentPage} - {secondPage}
                                    </div>
                                    z <div id="page-total">{totalPages}</div>
                                </div>
                            ) : (
                                <div className="flex flex-row gap-1 mx-5">
                                    Strona <div id="page-current">{bookFlip?.currentPage}</div>z{' '}
                                    <div id="page-total">{totalPages}</div>
                                </div>
                            )}{' '}
                            <Btn onClick={() => bookFlip?.pageFlip?.flipNext()} id="next">
                                <Chevron className="" color="white" />
                            </Btn>
                        </div>
                    </div>
                </div>
                <div className="block md:hidden absolute z-10 bottom-12 w-full">
                    <div className="flex flex-row justify-around items-center px-4">
                        <div className="flex flex-row justify-around items-center bg-[#22c55e] rounded-full">
                            <Btn onClick={() => bookFlip?.pageFlip?.turnToPrevPage()}>
                                <Chevron className="rotate-180" color="white" />
                            </Btn>
                            <div className="flex flex-row gap-1 m-2">
                                Strona <div id="page-current">{bookFlip?.currentPage}</div> z{' '}
                                <div id="page-total">{totalPages}</div>
                            </div>
                            <Btn onClick={() => bookFlip?.pageFlip?.turnToNextPage()}>
                                <Chevron className="" color="white" />
                            </Btn>
                        </div>
                    </div>
                </div>
                <div className="absolute z-10 top-4 right-4">
                    <TableOfContents
                        setPage={(pn) => bookFlip?.pageFlip?.flip(pn)}
                        tableOfContentsArray={tableOfContentArray}
                    />
                </div>
            </Wrapper>
        </Background>
    );
};
