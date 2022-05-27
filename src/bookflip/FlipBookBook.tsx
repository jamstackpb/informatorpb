import React, { ReactElement, ReactNode, useEffect } from 'react';
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
                }
                return [c];
            })}
        </>
    );
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
