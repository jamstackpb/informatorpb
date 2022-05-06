import { getScienceContent } from '@/ssg/science';

type KoloNaukoweProps = Omit<ReturnType<typeof getScienceContent> extends Array<infer R> ? R : never, 'pageType'>;
export const KoloNaukowe: React.FC<KoloNaukoweProps> = ({ content, matter: { name, video, website } }) => {
    return (
        <>
            <h1 className="w-max mx-auto">{name}</h1>

            {video !== '---' && (
                    <div id="player" className="flex justify-center mx-auto">
                        <iframe
                            id="video"
                            className="aspect-video"
                            src={video}
                            height={200}
                            frameBorder="0"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
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
