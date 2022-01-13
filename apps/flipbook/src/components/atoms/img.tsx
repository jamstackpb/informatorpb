import Image from 'next/image';

export const Img = ({ src }: { src: string }) => {
    return <Image unoptimized layout="fill" loader={(e) => e.src} src={src} />;
};
