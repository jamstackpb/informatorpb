import ReactDOM from 'react-dom';

export const FlipBookPage = ({ element }: { element: React.ReactElement }) => {
    let loc = document.getElementById('page-storage');
    let page = document.createElement('div');
    page.className = 'page';
    const pageContent = document.createElement('div');
    ReactDOM.render(element, pageContent);
    page.appendChild(pageContent);
    loc?.appendChild(page);
};
