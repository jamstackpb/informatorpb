import { currentPageAtom } from '@/src/state';
import { useAtom } from 'jotai';

import { useEffect, useRef, useState } from 'react';
interface TableOfContentProps {
    tableOfContentsArray: Array<{ [key: string]: string | number }>;
}
export const TableOfContents: React.FC<TableOfContentProps> = ({ tableOfContentsArray }) => {
    const [, setPage] = useAtom(currentPageAtom);
    const [open, setOpen] = useState(false);
    const [tableOfContents, setTableOfContents] = useState<Array<{ [key: string]: string | number }>>();

    useEffect(() => {
        setTableOfContents(tableOfContentsArray);
    }, [tableOfContentsArray]);

    return (
        <div className="flex justify-center">
            {console.log(tableOfContents)}
            <div className="">
                <button
                    onClick={() => setOpen((prev) => (prev = !prev))}
                    type="button"
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                    Spis treści
                </button>
            </div>

            <div
                className={
                    open
                        ? ' fixed top-0 left-0  w-full h-full outline-none overflow-x-hidden overflow-y-auto flex justify-center items-center bg-opacity-40 bg-black '
                        : ' fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto '
                }
                // id="exampleModalCenter"
                // aria-labelledby="exampleModalCenterTitle"
                // aria-modal="true"
                // role="dialog"
            >
                <div className=" relative w-auto pointer-events-none transition-all duration-1000">
                    <div className=" border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current z-50">
                        <div className="r flex flex-shrink-0 items-center justify-center p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal text-gray-800">Spis tresci</h5>
                            <button
                                type="button"
                                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className=" relative p-4 max-h-96 overflow-auto">
                            {tableOfContents?.map((item) => (
                                <div className="flex flex-row pb-2">
                                    <div
                                        className="cursor-pointer align-bottom"
                                        onClick={() => setPage(item.pageNumber as number)}
                                    >
                                        {item.section}
                                    </div>
                                    <div className="flex-1 flex items-center justify-end py-2 before:border-dotted before:border-b-2 before:border-black before:w-2/3 before:block" />
                                    <div className="ml-2">{item.pageNumber}</div>
                                </div>
                            ))}
                        </div>
                        <div className=" flex flex-shrink-0 flex-wrap items-center justify-center p-4 border-t border-gray-200 rounded-b-md">
                            <button
                                onClick={() => setOpen((prev) => (prev = !prev))}
                                type="button"
                                className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                                data-bs-dismiss="modal"
                            >
                                Zamknij
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
