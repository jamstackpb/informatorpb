interface KoloNaukoweProps {
    video: string;
    name: string;
    website: string;
    content: string;
}

export const KoloNaukowe: React.FC<KoloNaukoweProps> = (props) => {
    return (
        <>
            <h1 className="w-max mx-auto">{props.name}</h1>
            {props.video !== '---' && (
                <div className="flex justify-center mx-auto">
                    <iframe className="aspect-video" src={props.video} height={200} />
                </div>
            )}
            {props.website !== '---' && (
                <div className=" mx-auto">
                    {' '}
                    Sprawdź nas na <a href={props.website}> {props.website}</a>
                </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: props.content }}></div>
        </>
    );
};
