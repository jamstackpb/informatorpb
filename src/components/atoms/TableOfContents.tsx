import { getTableOfContents } from '@/ssg/spistresci';

type TableOfContentsProps = Omit<ReturnType<typeof getTableOfContents> extends Array<infer R> ? R : never, 'pageType'>;

export const TableOfContents: React.FC<TableOfContentsProps> = ({ matter: { chapters } }) => {
    return (
        <>
            {chapters.map((chapter) => {
                return (
                    <div>
                        <a href={`/?page=${chapter.page}`}> {chapter.section}</a>
                    </div>
                );
            })}

            {console.log(chapters)}
        </>
    );
};
