import { FlipBookRender } from '@/src/bookflip/FlipBookBook';
import { FlipSetting, PageFlip } from 'page-flip';
import React, { useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';

interface IBookFlip {
    // pages: Array<{
    //     changedToMatter: {
    //         [key: string]: any;
    //     };
    //     clean: string;
    // }>;
    createPages: (pageFlip: PageFlip) => void;
    children: React.ReactNode;
    onChangePage: (pageNumber: number) => void;
}
enum SizeType {
    /** Dimensions are fixed */
    FIXED = 'fixed',
    /** Dimensions are calculated based on the parent element */
    STRETCH = 'stretch',
}

export interface BookFlipActions {
    pageFlip?: PageFlip;
    currentPage: number;
}

export const BookFlip = React.forwardRef<BookFlipActions, IBookFlip>(({ createPages, onChangePage, children }, ref) => {
    const [pageFlip, setPageFlip] = useState<PageFlip>();
    const [currentPage, setCurrentPage] = useState(0);
    const mainRef = useRef<HTMLDivElement>(null);

    const calculateRatio = (): Partial<FlipSetting> => {
        let width = 640;
        let height = 740;
        let disableFlipByClick = false;
        let useMouseEvents = true;
        if (typeof window !== 'undefined') {
            if (window.innerWidth > window.innerHeight) {
                width = window.innerWidth / 2.0;
                height = window.innerHeight;
                disableFlipByClick = false;
                useMouseEvents = true;
            } else {
                width = window.innerWidth;
                height = window.innerHeight;
                disableFlipByClick = true;
                useMouseEvents = false;
            }
        }
        return {
            width,
            height,
            disableFlipByClick,
            useMouseEvents,
        };
    };
    useEffect(() => {
        if (mainRef.current) {
            const pf = new PageFlip(mainRef.current, {
                width: 640,
                height: 740,
                minWidth: 320,
                minHeight: 528.75,
                showCover: true,
                drawShadow: true,
                flippingTime: 400,
                startZIndex: 0,
                swipeDistance: 30,
                mobileScrollSupport: true,
                clickEventForward: false,
                usePortrait: true,
                size: SizeType.STRETCH,
                ...calculateRatio(),
            });
            pf.on('flip', (e) => {
                setCurrentPage(e.data.valueOf() as number);
            });
            setPageFlip(pf);
        }
    }, [mainRef]);
    useEffect(() => {
        const onKeyPress = (e: KeyboardEvent) => {
            const { key } = e;
            if (key == 'ArrowRight') {
                pageFlip?.flipNext();
            }
            if (key == 'ArrowLeft') {
                pageFlip?.flipPrev();
            }
        };
        window.addEventListener('keydown', onKeyPress);
        return () => {
            window.removeEventListener('keydown', onKeyPress);
        };
    }, [pageFlip]);

    useEffect(() => {
        onChangePage(currentPage);
        if (pageFlip && pageFlip.getCurrentPageIndex() !== currentPage) {
            pageFlip?.flip(currentPage);
        }
    }, [currentPage]);

    useImperativeHandle(
        ref,
        () => ({
            pageFlip,
            currentPage,
        }),
        [currentPage, pageFlip],
    );

    useEffect(() => {
        if (pageFlip) {
            pageFlip.loadFromHTML(document.querySelectorAll('.page'));
            createPages(pageFlip);
        }
    }, [pageFlip]);

    return (
        <>
            {pageFlip && children}
            <div ref={mainRef} id="flipbook-container">
                <div id="page-storage"></div>
                <div className="page page-cover page-cover-bottom" data-density="hard">
                    <div className="page-content"></div>
                </div>
            </div>
        </>
    );
});
