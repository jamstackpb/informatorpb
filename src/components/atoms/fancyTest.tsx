import { useState } from 'react';
import { currentPageAtom } from '@/src/state';
import { useAtom } from 'jotai';

export const FancyTest: React.FC<{
    table: {
        section: string;
        page: number;
    }[];
}> = ({ table }) => {
    const [clicked, setClicked] = useState(false);
    const [, setPage] = useAtom(currentPageAtom);
    return (
        <>
            {clicked && (
                <div
                    className="absolute bottom-0 right-0 transition-all h-full w-full bg-white px-20 py-10"
                    onClick={() => setClicked(!clicked)}
                >
                    <div className="mb-2">
                        {table.map((chapter) => {
                            return (
                                <a
                                    className="block cursor-pointer text-sm mb-1 text-gray-700 hover:text-black"
                                    onClick={() => setPage(chapter.page)}
                                >
                                    {chapter.section}
                                </a>
                            );
                        })}
                    </div>
                </div>
            )}
            {!clicked && (
                <div
                    className="rounded text-sm bottom-2 right-2 absolute cursor-pointer transition-all bg-green-100 inline-block p-2 font-bold"
                    onClick={() => setClicked(!clicked)}
                >
                    <div className="">spis treści</div>
                </div>
            )}
        </>
    );
};
(' ');
