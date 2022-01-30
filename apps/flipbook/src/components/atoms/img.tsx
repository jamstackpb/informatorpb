import Image from 'next/image';

export const Img = ({ src }: { src: string }) => {
    return <Image unoptimized layout="responsive" width={'50%'} height={'50%'} loader={(e) => e.src} src={src} />;
};
