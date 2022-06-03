import React, { ReactElement, ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export const FlipBookBook: React.FC = ({ children }) => {
    return (
        <>
            {(children as Array<Array<ReactElement>>).flatMap((c, i) => {
                if (Array.isArray(c)) {
                    return c.map((cc, j) => (
                        <div key={`${i},${j}`} className="page">
                            {cc}
                        </div>
                    ));
                } else {
                    return (
                        <div key={`${i}`} className="page">
                            {children}
                        </div>
                    );
                }
            })}
        </>
    );
};

export const FlipBookPageWithRef: React.FC = ({ children }) => {
    useEffect(() => {
        const loc = document.getElementById('page-storage');
        const page = document.createElement('div');
        page.className = 'page';
        const pageContent = document.createElement('div');
        ReactDOM.render(<>{children}</>, pageContent);
        page.appendChild(pageContent);
        loc?.appendChild(page);
    }, []);
    return <></>;
};

export const FlipBookRender: React.FC<{ onRender: () => void }> = ({ children, onRender }) => {
    useEffect(() => {
        let loc = document.getElementById('page-storage');
        ReactDOM.render(<FlipBookBook>{children}</FlipBookBook>, loc, () => {
            onRender();
        });
    }, []);
    return <></>;
};
