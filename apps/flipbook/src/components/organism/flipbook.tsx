import styled from '@emotion/styled';
import { PageFlip } from 'page-flip';
import { useEffect } from 'react';
import { Wrapper, Btn, LogoPB } from '../../styles/styleBook';
import { MarkdownContentPages } from '../../styles/styleMD';
interface IFlipBook {
    pages: Array<
        | {
              clean: string;
              changedToMatter: {
                  [key: string]: any;
              };
          }
        | any
    >;
}
enum SizeType {
    /** Dimensions are fixed */
    FIXED = 'fixed',
    /** Dimensions are calculated based on the parent element */
    STRETCH = 'stretch',
}
export const FlipBook: React.FC<IFlipBook> = ({ pages }) => {
    useEffect(() => {
        const pageFlip = new PageFlip(document.getElementById('flipbook-container')!, {
            width: 1280 / 2.0,
            height: 720,
            showCover: true,
            drawShadow: true,
            flippingTime: 800,
            startZIndex: 0,
            swipeDistance: 15,
            mobileScrollSupport: true,
            disableFlipByClick: true,
            usePortrait: true,
            autoSize: true,
        });
        pages.sort((a, b) => a?.changedToMatter.pageNumber - b?.changedToMatter.pageNumber);
        let loc = document.getElementById('page-storage');
        for (let i = 0; i < pages.length; i++) {
            let page = document.createElement('div');
            let pageContent = document.createElement('div');
            let pageText = document.createElement('div');
            page.className = 'page';
            pageContent.className = 'page-content';
            pageText.className = 'page-text';
            pageText.innerHTML = pages[i]?.clean;
            pageContent.appendChild(pageText);
            page.appendChild(pageContent);
            loc!.appendChild(page);
        }
        pageFlip.on('changeState', () => {
            loc = document.getElementById('page-current');
            loc!.innerHTML = (pageFlip.getCurrentPageIndex() + 1).toString();
        });
        loc = document.getElementById('page-total');
        loc!.innerHTML = (pages.length + 2).toString();
        let prev = document.getElementById('prev');
        prev?.addEventListener('click', () => {
            pageFlip.turnToPrevPage();
            loc = document.getElementById('page-current');
            loc!.innerHTML = (pageFlip.getCurrentPageIndex() + 1).toString();
        });
        let next = document.getElementById('next');
        next?.addEventListener('click', () => {
            if (pageFlip.getCurrentPageIndex() < pages.length + 1) {
                pageFlip.turnToNextPage();
            }
            loc = document.getElementById('page-current');
            loc!.innerHTML = (pageFlip.getCurrentPageIndex() + 1).toString();
        });
        pageFlip.loadFromHTML(document.querySelectorAll('.page'));
    });
    return (
        <Wrapper>
            <div className="stop-scrolling max-w-full">
                <MarkdownContentPages>
                    <div id="flipbook-container">
                        <div className="page page-cover" data-density="hard">
                            <h1>
                                <LogoPB src="/logo_pb.png" />
                            </h1>
                        </div>
                        <div id="page-storage"></div>
                        <div className="page page-cover page-cover-bottom" data-density="hard">
                            <div className="page-content prose">
                                <h1>THE END</h1>
                            </div>
                        </div>
                    </div>
                </MarkdownContentPages>
                <div className="flex flex-row " id="page-counter">
                    <Btn className="mr-4" id="prev">
                        Wstecz
                    </Btn>
                    <div className="flex flex-row gap-1 mt-6">
                        Strona <div id="page-current">1</div> z <div id="page-total">-</div>
                    </div>
                    <Btn className="ml-4" id="next">
                        Naprzód
                    </Btn>
                </div>
            </div>
        </Wrapper>
    );
};
