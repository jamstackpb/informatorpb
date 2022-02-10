import ReactDOM from 'react-dom';
const logo = 'https://pb.edu.pl/wp-content/themes/pb/assets/img/logo-pb-w.png';
const godlo = 'https://pb.edu.pl/wp-content/themes/pb/assets/img/godlo.png';
const LogoPB: React.FC<{ src: string }> = ({ src }) => <img className="ml-3 object-contain" src={src} />;
const Godlo: React.FC<{ src: string }> = ({ src }) => <img className="mr-3 object-contain" src={src} />;

export const Front = () => {
    return (
        <h1 className="flex flex-row justify-center items-center absolute top-0 inset-x-0">
            <Godlo src={godlo} />
            <div className="border-l-2 h-24"></div>
            <LogoPB src={logo} />
        </h1>
    );
};

export const AddFrontPage = (
        pageClass: string,
        pageContentClass: string,
        pageTextClass: string,
        pageTextContent: string,
        pageImgClass: string
        ) => {
            let loc = document.getElementById('page-storage')
            let page = document.createElement('div');
            let pageContent = document.createElement('div');
            let pageText = document.createElement('div');
            let pageImg = document.createElement('div');
            page.className = 'page' + ' ' + pageClass;
            pageContent.className = 'bg-green-900 max-w-full flex flex-col' + ' ' + pageContentClass;
            pageText.className = 'text-white text-4xl text-center' + ' ' + pageTextClass;
            pageText.innerHTML = pageTextContent;
            pageImg.className = pageImgClass;
            ReactDOM.render(<Front/>, pageImg)
            pageText.append(pageImg)
            pageContent.appendChild(pageText);
            page.appendChild(pageContent);
            loc!.appendChild(page);
} 