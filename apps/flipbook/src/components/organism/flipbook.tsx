import { Graduate } from '@/ssg/graduate';
import { getScienceContent } from '@/ssg/science';
import { PageFlip } from 'page-flip';
import React, { useEffect, useState } from 'react';
import { Wrapper, Btn, LogoPB, WrapperMobile } from '../../styles/styleBook';
import { AddFrontPage } from '../atoms/AddFrontPage';

import { AddPage, AddPagesWithContent, AddPlainPage } from '../atoms/AddPage';


import { Chevron } from '../atoms/chevron';


interface IFlipBook {
    pages: Array<{
        
        changedToMatter: {
            [key: string]: any;
        };
        clean: string;
    }>;
    graduate: ReturnType<typeof Graduate>;
    science: ReturnType<typeof getScienceContent>

    // science: Array<{
    //     matter: {
    //         [key: string]: string;
    //     },
    //     content: string;
    // }>;
    // science: Array<{matter:{name: string, website:string, video:string, pageType: string}}>
}
enum SizeType {
    /** Dimensions are fixed */
    FIXED = 'fixed',
    /** Dimensions are calculated based on the parent element */
    STRETCH = 'stretch',
}
export const FlipBook: React.FC<IFlipBook> = ({ pages, graduate, science }) => {
    useEffect(() => {
        const pageFlip = new PageFlip(document.getElementById('flipbook-container')!, {
            width: 1280 / 2,
            height: 720,
            showCover: true,
            drawShadow: true,
            flippingTime: 800,
            startZIndex: 0,
            swipeDistance: 10,
            mobileScrollSupport: true,
            disableFlipByClick: true,
            usePortrait: true,
            autoSize: true,
            size: SizeType.FIXED,
        });
        let index = 0;
        pages.sort((a, b) => a?.changedToMatter.pageNumber - b?.changedToMatter.pageNumber);
        let loc = document.getElementById('page-storage');
        pages.map((p) => {
            AddPlainPage({ content: p.clean });
            index++;
        });
        AddFrontPage(
            '',
            'prose h-full w-full flex flex-col py-[49%]',
            'text-white text-4xl text-center',
            'Nasi Absolwenci',
            '',
        );
        index++;
        graduate.map((g) => {
            AddPagesWithContent(g)            
            index++;
        });

        AddFrontPage(
            '',
            'prose w-full h-full flex flex-col py-[49%]',
            'text-white text-4xl text-center',
            'Koła naukowe na naszej uczelni!',
            '',
        );
        index++;
        
        
        science.map((g) => {
            AddPagesWithContent(g) 
            index++;            
        });
        
        pageFlip.on('changeState', () => {
            loc = document.getElementById('page-current');
            loc!.innerHTML = (pageFlip.getCurrentPageIndex() + 1).toString();
        });
        pageFlip.on('init', () => {
            loc = document.getElementById('page-total');
            loc!.innerHTML = pageFlip.getPageCount().toString();
        });
        let prev = document.getElementById('prev');
        prev?.addEventListener('click', () => {
            pageFlip.turnToPrevPage();
            loc = document.getElementById('page-current');
            loc!.innerHTML = (pageFlip.getCurrentPageIndex() + 1).toString();
        });
        let next = document.getElementById('next');
        next?.addEventListener('click', () => {
            if (pageFlip.getCurrentPageIndex() + 2 < pageFlip.getPageCount()) {
                pageFlip.turnToNextPage();
            }
            loc = document.getElementById('page-current');
            loc!.innerHTML = (pageFlip.getCurrentPageIndex() + 1).toString();
        });
        pageFlip.loadFromHTML(document.querySelectorAll('.page'));
    }, [pages, graduate, science]);
    return (
        <div>
            <WrapperMobile>
                <div className="p-2 text-3xl font-bold">
                    Niestety wersja mobilna flipbooka nie jest dostępna w tej chwili
                </div>
            </WrapperMobile>
            <Wrapper className="container mx-auto">
                <div className="mt-12 max-w-full">
                    <div id="flipbook-container" className="mt-[-2%] stop-scrolling">
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
                    <div className="flex flex-row relative mt-10" id="page-counter">
                        <Btn className="mr-4" id="prev">
                            <Chevron className="rotate-180" color="white" />
                        </Btn>
                        <div className="flex flex-row gap-1 mt-6">
                            Strona <div id="page-current">1</div> z <div id="page-total">-</div>
                        </div>
                        <Btn className="ml-4" id="next">
                            <Chevron className="" color="white" />
                        </Btn>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};
