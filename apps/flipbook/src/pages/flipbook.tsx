import { PageFlip } from 'page-flip';
import { useEffect, useState } from 'react';
import { Wrapper } from './styles/styleBook';
import { MarkdownContentPages }from './styles/styleMD';
interface IFlipBook {
    pages: Array<{
        clean: string;
        changedToMatter: {
            [key: string]: any;
        };
    }>;
}


export const FlipBook: React.FC<IFlipBook> = ({ pages }) => {
    useEffect(() => {
        const pageFlip = new PageFlip(document.getElementById('flipbook-container')!, {
            width: 800,
            height: 800,
            showCover: true,
            drawShadow: true,
            flippingTime: 800,
            autoSize: true,
            startZIndex: 0,
            mobileScrollSupport: true,
        });

        pages.sort((a, b) => a.changedToMatter.pageNumber - b.changedToMatter.pageNumber);
        pages.map((page) => {
            console.log(page.changedToMatter.pageNumber);
        });

    

        let loc = document.getElementById('page-storage')
        for (let i = 0; i < pages.length; i++)
        {
            let page = document.createElement('div')
            let pageContent = document.createElement('div')
            let pageText = document.createElement('div')
            page.className = 'page'
            pageContent.className = 'page-content'
            pageText.className = 'page-text'
            pageText.innerHTML = pages[i].clean
            pageContent.appendChild(pageText)
            page.appendChild(pageContent)
            loc!.appendChild(page)
        }
        pageFlip.on('changeState', (e) => {
            if(e.data === 'fold_corner')
            {
                console.log(pageFlip.getCurrentPageIndex());
            }
        });
        pageFlip.on('changeState', () => {
            loc = document.getElementById('page-current');
            loc!.innerHTML = (pageFlip.getCurrentPageIndex()+1).toString();
        });

        loc = document.getElementById('page-total')
        loc!.innerHTML = (pages.length+2).toString();
        let prev = document.getElementById('prev');
        prev?.addEventListener('click', () => {
            pageFlip.turnToPrevPage()
            loc = document.getElementById('page-current');
            loc!.innerHTML = (pageFlip.getCurrentPageIndex() + 1).toString();
        })
        let next = document.getElementById('next');
        next?.addEventListener('click', () => {
            if (pageFlip.getCurrentPageIndex() < pages.length + 1){
                pageFlip.turnToNextPage();
            }
            loc = document.getElementById('page-current');
            loc!.innerHTML = (pageFlip.getCurrentPageIndex() + 1).toString();
        })
        pageFlip.loadFromHTML(document.querySelectorAll('.page')); 
    });

    return (
        <Wrapper>
            <div className="container stop-scrolling">
                <MarkdownContentPages>
                    <div id="flipbook-container">
                        <div className="page page-cover page-cover-top" data-density="hard">
                            <div className="page-content">
                               <h1>Informator Politechniki Białostockiej</h1>
                            </div>
                        </div>

                        <div id="page-storage"></div>

                        <div className="page page-cover page-cover-bottom" data-density="hard">
                            <div className="page-content">
                                <h1>THE END</h1>
                            </div>
                        </div>
                    </div>
                </MarkdownContentPages>

                <div id="page-counter">
                    <button id="prev">Wstecz</button>
                    Strona <div id="page-current">1</div> z <div id="page-total">-</div>
                    <button id="next">Naprzód</button>
                </div>
            </div>
        </Wrapper>
    );
};
