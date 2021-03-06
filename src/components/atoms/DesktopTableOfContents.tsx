import { ToCItem } from '@/src/bookflip/models';
import { Dispatch, SetStateAction } from 'react';

interface DesktopTableOfContentProps {
    groupBySection: [string, ToCItem[]][];
    setPage: (pageNumber: number) => void;
    open: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const DesktopTableOfContents: React.FC<DesktopTableOfContentProps> = ({
    groupBySection,
    setPage,
    open,
    setIsOpen,
}) => {
    return (
        <>
            {open ? (
                <div
                    onClick={() => setIsOpen(false)}
                    className={
                        open
                            ? ' fixed top-0 left-0  w-full h-full outline-none overflow-x-hidden overflow-y-auto flex justify-center items-center bg-opacity-40 bg-black '
                            : ' fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto '
                    }
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
                            <div className=" relative p-4 h-80vh overflow-auto">
                                {groupBySection.map(([sectionName, items]) => (
                                    <div className="mb-4" key={sectionName}>
                                        <div
                                            className="flex flex-row cursor-pointer"
                                            onClick={() => {
                                                setPage(
                                                    items.length > 1 ? items[0]?.pageNumber - 1 : items[0]?.pageNumber,
                                                );
                                                setIsOpen(false);
                                            }}
                                        >
                                            <div className=" align-bottom font-bold">{sectionName}</div>
                                            <div className="ml-auto">
                                                {items.length > 1 ? items[0]?.pageNumber - 1 : items[0]?.pageNumber}
                                            </div>
                                        </div>
                                        {items.length > 1 && (
                                            <div className="ml-2">
                                                {items.map((item) => (
                                                    <div
                                                        key={item.pageNumber}
                                                        className="flex flex-row cursor-pointer border-b"
                                                        onClick={() => {
                                                            setPage(item.pageNumber);
                                                            setIsOpen(false);
                                                        }}
                                                    >
                                                        <div className="cursor-pointer align-bottom">{item.title}</div>
                                                        <div className="ml-auto">{item.pageNumber}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className=" flex flex-shrink-0 flex-wrap items-center justify-center p-4 border-t border-gray-200 rounded-b-md">
                                <button
                                    onClick={() => setIsOpen((prev) => (prev = !prev))}
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
            ) : null}
        </>
    );
};
