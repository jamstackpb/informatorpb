import { FlipBookRender } from '@/src/bookflip/FlipBookBook';
import styled from '@emotion/styled';
import { FlipSetting, PageFlip } from 'page-flip';
import React, { useEffect, useImperativeHandle, useState } from 'react';

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
    fullscreen?: boolean;
    setFullscreen?: (e: boolean) => void;
}

export const BookFlip = React.forwardRef<BookFlipActions, IBookFlip>(({ createPages, onChangePage, children }, ref) => {
    const [pageFlip, setPageFlip] = useState<PageFlip>();
    const [currentPage, setCurrentPage] = useState(0);
    const [fullscreen, setFullscreen] = useState(false);

    const calculateRatio = (fs?: boolean): Partial<FlipSetting> => {
        let width = 640;
        let height = 740;
        let disableFlipByClick = false;
        let useMouseEvents = true;
        if (typeof window !== 'undefined') {
            if (window.innerWidth > window.innerHeight) {
                width = ((fs ? 1.0 : 0.9) * window.innerWidth) / 2.0;
                height = (fs ? 1.0 : 0.9) * window.innerHeight;
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
        const calc = calculateRatio(fullscreen);
        const pf = new PageFlip(document.getElementById('flipbook-container')!, {
            width: 640,
            height: 740,
            ...calc,
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
        setPageFlip(pf);
        return () => {
            pf.destroy();
        };
    }, [fullscreen]);
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
            setFullscreen,
            fullscreen,
        }),
        [currentPage, pageFlip],
    );

    return (
        <>
            {pageFlip && (
                <FlipBookRender
                    onRender={() => {
                        pageFlip.loadFromHTML(document.querySelectorAll('.page'));
                    }}
                >
                    {children}
                </FlipBookRender>
            )}
            <FlipBookContainer fullscreen={fullscreen} id="flipbook-container">
                <div id="page-storage"></div>
                <div className="page page-cover page-cover-bottom" data-density="hard">
                    <div className="page-content"></div>
                </div>
            </FlipBookContainer>
        </>
    );
});

const FlipBookContainer = styled.div<{ fullscreen?: boolean }>`
    width: 100vw;
    height: 100vh;
`;
