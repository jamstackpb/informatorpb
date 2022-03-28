import { MatterInterface } from '@/src/utils/matterInterface';
import { getFieldsOfStudy } from '@/ssg/fieldofstudy';
import { Graduate } from '@/ssg/graduate';
import { getScienceContent } from '@/ssg/science';
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
    whichPage?: number;
}
enum SizeType {
    /** Dimensions are fixed */
    FIXED = 'fixed',
    /** Dimensions are calculated based on the parent element */
    STRETCH = 'stretch',
}

export const FlipBook: React.FC<IFlipBook> = ({ pages, graduate, science, foStudy, whichPage }) => {
    const [pageFlip, setPageFlip] = useState<PageFlip>();
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(router.query.page ? parseInt(router.query.page as string) : 0);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        const pf = new PageFlip(document.getElementById('flipbook-container')!, {
            width: 1280 / 2,
            height: 720,
            showCover: true,
            drawShadow: true,
            flippingTime: 800,
            startZIndex: 0,
            swipeDistance: 10,
            mobileScrollSupport: true,
            disableFlipByClick: true,
            // usePortrait: false,
            // autoSize: true,
            size: SizeType.FIXED,
        });
        pages.sort((a, b) => a?.changedToMatter.pageNumber - b?.changedToMatter.pageNumber);
        pages.map((p) => {
            AddPlainPage({ content: p.clean });
        });
        foStudy.map((g) => {
            AddPagesWithContent(g);
        });
        AddFrontPage(
            '',
            'prose h-full w-full flex flex-col py-[49%]',
            'text-white text-4xl text-center',
            'Nasi Absolwenci',
            '',
        );

        graduate.map((g) => {
            AddPagesWithContent(g);
        });

        AddFrontPage(
            '',
            'prose w-full h-full flex flex-col py-[49%]',
            'text-white text-4xl text-center',
            'Koła naukowe na naszej uczelni!',
            '',
        );

        science.map((g) => {
            AddPagesWithContent(g);
        });
        pf.on('changeState', () => {
            console.log('change state');
            setCurrentPage(pf.getCurrentPageIndex());
        });
        pf.loadFromHTML(document.querySelectorAll('.page'));
        setPageFlip(pf);
        setTotalPages(pf.getPageCount());
        return () => {
            pf.destroy();
        };
    }, [setCurrentPage]);

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
        <div className="w-full ">
            <Wrapper className="container mx-auto max-w-full  ">
                <div className="mt-12 max-w-full">
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
                    <div className="flex flex-row relative mt-0 md:mt-10" id="page-counter">
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
                </div>
            </Wrapper>
        </div>
    );
};
