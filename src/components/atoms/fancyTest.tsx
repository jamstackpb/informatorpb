import { useState } from 'react';
import { getTableOfContents } from '@/ssg';
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
        <div
            className={
                (clicked &&
                    ' absolute  bottom-0 right-0 border-2 border-cyan-900 cursor-pointer transition-all h-full w-full bg-green-700') ||
                ' bottom-0 right-0 absolute border-2 border-cyan-900 cursor-pointer transition-all h-20 w-10 bg-green-700'
            }
            onClick={() => setClicked(!clicked)}
        >
            <div className={(clicked && 'text-center') || ''}>
                {(clicked &&
                    table.map((chapter) => {
                        return (
                            <a className="block cursor-pointer text-sm mb-1" onClick={() => setPage(chapter.page)}>
                                {chapter.section}
                            </a>
                        );
                    })) ||
                    'SPIS'}
            </div>

            {/* uzyc memo? */}
        </div>
    );
};
(' ');
