import { Graduate } from '@/ssg/graduate';

type AbsolwentProps = Omit<ReturnType<typeof Graduate> extends Array<infer R> ? R : never, 'pageType'>;

export const Absolwent: React.FC<AbsolwentProps> = ({
    content,
    matter: { academicTitle, faculty, image, job, name },
}) => {
    return (
        <>
            <div className="flex flex-row items-center">
                <img width={250} height={250} src={image} />
                <div className="pl-5">
                    <div>
                        <span className="font-extrabold">{faculty}</span>{' '}
                    </div>
                    <div>
                        <span className="font-extrabold">{academicTitle}</span> {name}
                    </div>

                    <div>
                        <span className="font-extrabold">Zawód:</span> {job}
                    </div>
                </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </>
    );
};
