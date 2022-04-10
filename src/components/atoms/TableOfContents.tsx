import { currentPageAtom } from '@/src/state';
import { useAtom } from 'jotai';
import { getTableOfContents } from '@/ssg/spistresci';
import Link from 'next/link';

type TableOfContentsProps = Omit<ReturnType<typeof getTableOfContents> extends Array<infer R> ? R : never, 'pageType'>;

export const TableOfContents: React.FC<TableOfContentsProps> = ({ matter: { chapters } }) => {
    const [, setPage] = useAtom(currentPageAtom);
    return (
        <>
            {chapters.map((chapter) => {
                return (
                    <a className="block cursor-pointer text-sm mb-1" onClick={() => setPage(chapter.page)}>
                        {chapter.section}
                    </a>
                );
            })}
            {/* uzyc memo? */}
        </>
    );
};
