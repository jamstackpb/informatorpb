import { currentPageAtom } from '@/src/state';
import { getFieldsOfStudy, Graduate, getScienceContent, getTableOfContents } from '@/ssg';
import { max } from 'date-fns';
import { useAtom } from 'jotai';

import { useRouter } from 'next/router';
import { PageFlip } from 'page-flip';
import React, { useEffect, useState } from 'react';
import { Wrapper, Btn, LogoPB } from '../../styles/styleBook';
import { AddFrontPage } from '../atoms/AddFrontPage';
import { AddPagesWithContent, AddPlainPage } from '../atoms/AddPage';
import { Chevron } from '../atoms/chevron';

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
    tableOfContents: ReturnType<typeof getTableOfContents>;

    whichPage?: number;
}
enum SizeType {
    /** Dimensions are fixed */
    FIXED = 'fixed',
    /** Dimensions are calculated based on the parent element */
    STRETCH = 'stretch',
}

export const FlipBook: React.FC<IFlipBook> = ({ pages, graduate, science, foStudy, tableOfContents }) => {
    const [pageFlip, setPageFlip] = useState<PageFlip>();
    const router = useRouter();
    const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
    const [totalPages, setTotalPages] = useState(0);
    let index = 0;
    useEffect(() => {
        const pf = new PageFlip(document.getElementById('flipbook-container')!, {
            width: 640,
            height: 740,
            minWidth: 470,
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
        const tableOfContent = tableOfContents.flatMap((g) => {
            return g.matter.chapters;
        });
        tableOfContents.map((g) => {
            AddPagesWithContent(g, tableOfContent);
        });
        foStudy.map((g) => {
            index++;
            g.pagenumber = index;
            AddPagesWithContent(g, tableOfContent);
        });
        index++;
        AddFrontPage(
            '',
            'prose w-full h-full flex flex-col py-[49%]',
            'text-white text-4xl text-center',
            'Koła naukowe na naszej uczelni!',
            '',
        );
        science.map((g) => {
            index++;
            g.pagenumber = index;
            AddPagesWithContent(g, tableOfContent);
        });
        index++;
        AddFrontPage(
            '',
            'prose h-full w-full flex flex-col py-[49%]',
            'text-white text-4xl text-center',
            'Nasi Absolwenci',
            '',
        );

        graduate.map((g) => {
            index++;
            g.pagenumber = index;
            AddPagesWithContent(g, tableOfContent);
        });
        pages.sort((a, b) => a?.changedToMatter.pageNumber - b?.changedToMatter.pageNumber);
        pages.map((p) => {
            index++;
            AddPlainPage({ content: p.clean, pageNumber: index, table: tableOfContent });
        });

        pf.on('changeState', () => {
            setCurrentPage(pf.getCurrentPageIndex());
        });
        pf.loadFromHTML(document.querySelectorAll('.page'));
        setPageFlip(pf);
        setTotalPages(pf.getPageCount());

        return () => {
            pf.destroy();
        };
    }, []);
    useEffect(() => {
        let page = document.querySelector('page');
        console.log(page);
    }, [currentPage]);

    useEffect(() => {
        if (pageFlip) {
            setCurrentPage(parseInt(router.query.page as string));
        }
    }, [router.query.page, pageFlip]);

    useEffect(() => {
        if (pageFlip) {
            pageFlip.turnToPage(currentPage);
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
            <div className="flex flex-row relative mt-0 z-50" id="page-counter">
                <Btn onClick={prevPage} className="mr-4" id="prev">
                    <Chevron className="rotate-180" color="white" />
                </Btn>
                <div className="flex flex-row gap-1 mt-6">
                    Strona <div id="page-current">{currentPage}</div> z <div id="page-total">{totalPages}</div>
                </div>
                <Btn onClick={nextPage} className="ml-4" id="next">
                    <Chevron className="" color="white" />
                </Btn>
            </div>
        </Wrapper>
    );
};
