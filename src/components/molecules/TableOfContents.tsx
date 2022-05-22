import { ToCItem } from '@/src/bookflip/models';

import { MobileTableOfContents, DesktopTableOfContents } from '../atoms';

import { useEffect, useState } from 'react';
interface TableOfContentProps {
    tableOfContentsArray: Array<ToCItem>;
    setPage: (pageNumber: number) => void;
}
export const TableOfContents: React.FC<TableOfContentProps> = ({ tableOfContentsArray, setPage }) => {
    const [isMobile, setIsMobile] = useState<boolean>();
    const [open, setOpen] = useState(false);
    const groupBySection = Object.entries(
        tableOfContentsArray.reduce((a, b) => {
            a[b.section] ||= [];
            a[b.section].push(b);
            return a;
        }, {} as Record<string, ToCItem[]>),
    );

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < window.innerHeight) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        }
    }, []);

    return (
        <div className="flex justify-center h-full">
            <div className="">
                <button
                    onClick={() => setOpen((prev) => (prev = !prev))}
                    type="button"
                    className="inline-block px-6 py-2.5 bg-white text-gray-700 font-bold text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg hover:text-white focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 focus:text-white active:bg-blue-800 active:shadow-lg active:text-white transition duration-150 ease-in-out"
                >
                    Spis treści
                </button>
            </div>
            {isMobile ? (
                <MobileTableOfContents
                    setPage={setPage}
                    groupBySection={groupBySection}
                    open={open}
                    setIsOpen={setOpen}
                />
            ) : (
                <DesktopTableOfContents
                    setPage={setPage}
                    groupBySection={groupBySection}
                    open={open}
                    setIsOpen={setOpen}
                />
            )}
        </div>
    );
};
