import { FlipSetting, PageFlip } from 'page-flip';
import React, { useEffect, useImperativeHandle, useState } from 'react';

interface IBookFlip {
    createPages: (pageFlip: PageFlip) => void;
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

export const BookFlip = React.forwardRef<BookFlipActions, IBookFlip>(({ createPages, onChangePage }, ref) => {
    let disableFlipByClick = false;
    let useMouseEvents = true;
    const [pageFlip, setPageFlip] = useState<PageFlip>();
    const [currentPage, setCurrentPage] = useState(0);
    const calculateRatio = (): Partial<FlipSetting> => {
        if (typeof window !== 'undefined') {
            if (document.getElementById('wrapper')) {
                disableFlipByClick = true;
                useMouseEvents = false;
            } else {
                disableFlipByClick = false;
                useMouseEvents = true;
            }
        }
        return {
            disableFlipByClick,
            useMouseEvents,
        };
    };

    useEffect(() => {
        const pf = new PageFlip(document.getElementById('flipbook-container')!, {
            ...calculateRatio(),
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
        });
        createPages(pf);
        pf.on('flip', (e) => {
            setCurrentPage(e.data.valueOf() as number);
        });
        pf.loadFromHTML(document.querySelectorAll('.page'));
        setPageFlip(pf);
    }, []);
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

    return (
        <div id="flipbook-container">
            <div id="page-storage"></div>
            <div className="page page-cover page-cover-bottom" data-density="hard">
                <div className="page-content"></div>
            </div>
        </div>
    );
});
