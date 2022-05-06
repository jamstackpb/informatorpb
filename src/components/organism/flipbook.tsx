import { insertMarkdownPage } from '@/src/bookflip';
import { AddPagesWithContent, AddFrontPage } from '@/src/components/atoms/AddPage';
import { currentPageAtom } from '@/src/state';
import { Wrapper, LogoPB, Btn } from '@/src/styles/styleBook';
import { getFieldsOfStudy, Graduate, getScienceContent } from '@/ssg';
import { useAtom } from 'jotai';
import { TableOfContents } from '../atoms/TableOfContents';
import { useRouter } from 'next/router';
import { PageFlip } from 'page-flip';
import React, { useEffect, useState } from 'react';
import { Chevron } from '../atoms/chevron';
import { ToCItem } from '@/src/bookflip/models';

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
enum SizeType {
    /** Dimensions are fixed */
    FIXED = 'fixed',
    /** Dimensions are calculated based on the parent element */
    STRETCH = 'stretch',
}

export const FlipBook: React.FC<IFlipBook> = ({ pages, graduate, science, foStudy }) => {
    const [pageFlip, setPageFlip] = useState<PageFlip>();
    const [tableOfContentArray, setTableOfContentArray] = useState<Array<ToCItem>>([]);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
    const [totalPages, setTotalPages] = useState(0);
    let index = 0;

    const calculateRatio = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < window.innerHeight) {
                return {
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            } else {
                return {
                    width: window.innerWidth / 2.0,
                    height: window.innerHeight,
                };
            }
        }
        return {
            width: 640,
            height: 740,
        };
    };

    useEffect(() => {
        const arrayOfSectionsNames: Array<ToCItem> = [];
        const pf = new PageFlip(document.getElementById('flipbook-container')!, {
            ...calculateRatio(),
            minWidth: 320,
            minHeight: 528.75,
            showCover: true,

            drawShadow: true,
            flippingTime: 800,
            startZIndex: 0,
            swipeDistance: 10,
            mobileScrollSupport: true,
            disableFlipByClick: true,
            // useMouseEvents: false,
            clickEventForward: false,
            // usePortrait: false,
            //autoSize: false,
            size: SizeType.STRETCH,
        });
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
        pf.on('changeState', () => {
            setCurrentPage(pf.getCurrentPageIndex());
        });
        pf.loadFromHTML(document.querySelectorAll('.page'));
        setPageFlip(pf);
        setTableOfContentArray(arrayOfSectionsNames);
        setTotalPages(index);
        return () => {
            pf.destroy();
        };
    }, []);

    useEffect(() => {
        if (pageFlip) {
            setCurrentPage(parseInt(router.query.page as string));
        }
    }, [router.query.page, pageFlip]);

    useEffect(() => {
        if (pageFlip) {
            pageFlip.turnToPage(currentPage);
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
    }, [currentPage, pageFlip]);

    const nextPage = () => {
        const performTurn = currentPage + 2 > (pageFlip?.getPageCount() || 2) ? false : true;
        if (performTurn) {
            pageFlip?.turnToNextPage();
            setCurrentPage(pageFlip?.getCurrentPageIndex() || currentPage);
            router.push(`/?page=${pageFlip!.getCurrentPageIndex()}`);
        }
    };
    const prevPage = () => {
        const performTurn = currentPage - 2 < 0 ? false : true;
        if (performTurn) {
            pageFlip?.turnToPrevPage();
            setCurrentPage(pageFlip?.getCurrentPageIndex() || currentPage);
            router.push(`/?page=${pageFlip!.getCurrentPageIndex()}`);
        } else router.push(`/?page=0`);
    };

    return (
        <Wrapper>
            <div id="flipbook-container">
                <div className="page page-cover" data-density="hard">
                    <h1>
                        <LogoPB src="/images/logo_PB.png" />
                    </h1>
                </div>
                <div id="page-storage"></div>
                <div className="page page-cover page-cover-bottom" data-density="hard">
                    <div className="page-content"></div>
                </div>
            </div>
            <div className="md:visible hidden absolute z-10 bottom-10 w-full">
                <div className="flex flex-row relative mt-0 " id="page-counter">
                    <div className="flex flex-row justify-center items-center">
                        <Btn onClick={prevPage} className="mr-4" id="prev">
                            <Chevron className="rotate-180" color="white" />
                        </Btn>
                        <div className="flex flex-row gap-1">
                            Strona <div id="page-current">{currentPage}</div> z <div id="page-total">{totalPages}</div>
                        </div>
                        <Btn onClick={nextPage} className="ml-4" id="next">
                            <Chevron className="" color="white" />
                        </Btn>
                    </div>
                </div>
                <TableOfContents tableOfContentsArray={tableOfContentArray} />
            </div>
            <div className="visible md:hidden absolute z-10 bottom-10 w-full">
                <div className="flex flex-row justify-between items-center px-4">
                    <Btn onClick={prevPage} className="mr-4" id="prev">
                        <Chevron className="rotate-180" color="white" />
                    </Btn>
                    <div className="flex flex-row gap-1">
                        Strona <div id="page-current">{currentPage}</div> z <div id="page-total">{totalPages}</div>
                    </div>
                    <Btn onClick={nextPage} className="ml-4" id="next">
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
