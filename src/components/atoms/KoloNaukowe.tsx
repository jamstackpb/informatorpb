import { getScienceContent } from '@/ssg/science';

type KoloNaukoweProps = Omit<ReturnType<typeof getScienceContent> extends Array<infer R> ? R : never, 'pageType'>;
export const KoloNaukowe: React.FC<KoloNaukoweProps> = ({ content, matter: { name, video, website } }) => {
    return (
        <>
            <h1 className="max-w-full mx-auto">{name}</h1>

            {video !== '---' && (
                <div className="flex justify-center mx-auto">
                    <iframe className="aspect-video max-w-full " src={video} height={200} />
                </div>
            )}
            {website !== '---' && (
                <div className=" mx-auto">
                    {' '}
                    Sprawdź nas na <a href={website}> {website}</a>
                </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </>
    );
};
