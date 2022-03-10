interface AbsolwentProps {
    image: string;
    faculty: string;
    academicTitle: string;
    name: string;
    job: string;
    content: string;
}

export const Absolwent: React.FC<AbsolwentProps> = (props) => {
    return (
        <>
            {' '}
            <div className="flex flex-row items-center">
                <img width={250} height={250} src={props.image} />
                <div className="pl-5">
                    <div>
                        <span className="font-extrabold">{props.faculty}</span>{' '}
                    </div>
                    <div>
                        <span className="font-extrabold">{props.academicTitle}</span> {props.name}
                    </div>

                    <div>
                        <span className="font-extrabold">Zawód:</span> {props.job}
                    </div>
                </div>{' '}
            </div>
            <div dangerouslySetInnerHTML={{ __html: props.content }}></div>
        </>
    );
};
