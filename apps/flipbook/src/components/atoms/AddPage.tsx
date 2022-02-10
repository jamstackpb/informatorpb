export const AddPage = (
        pageClass: string,
        pageContentClass: string,
        pageTextClass: string,
        pageTextContent: string
        ) => {
            let loc = document.getElementById('page-storage')
            let page = document.createElement('div');
            let pageContent = document.createElement('div');
            let pageText = document.createElement('div');
            page.className = 'page' + ' ' + pageClass;
            pageContent.className = pageContentClass;
            pageText.className = pageTextClass;
            pageText.innerHTML = pageTextContent;
            pageContent.appendChild(pageText);
            page.appendChild(pageContent);
            loc!.appendChild(page);
    }
export const AddPageImage = (
        pageClass: string,
        pageContentClass: string,
        pageTextClass: string,
        pageTextContent: string,
        pageImgClass: string,
        pageImgSrc: string,
        ) => {
            let loc = document.getElementById('page-storage')
            let page = document.createElement('div');
            let pageContent = document.createElement('div');
            let pageText = document.createElement('div');
            let pageImg = document.createElement('img');
            page.className = 'page' + ' ' + pageClass;
            pageContent.className = pageContentClass;
            pageText.className = pageTextClass;
            pageText.innerHTML = pageTextContent;
            pageImg.className = pageImgClass;
            pageImg.src = pageImgSrc;
            pageContent.appendChild(pageImg);
            pageContent.appendChild(pageText);
            page.appendChild(pageContent);
            loc!.appendChild(page);
        }