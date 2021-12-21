import React from 'react';

const fb_icon = 'images/fb_icon.svg';
const in_icon = 'images/in_icon.svg';
const instagram = 'images/instagram_icon.svg';
const youtube = 'images/yt_icon.svg';


const Wrapper: React.FC = ({ children }) => <div className="flex justify-center items-center mb-8">{children}</div>;

const FootIcons: React.FC = ({ children }) => <div className="max-w-full gap-5 h-12 flex">{children}</div>;

const Icon: React.FC<{ imagIcon: any }> = ({ imagIcon }) => (
    <img
        src={imagIcon}
        className="w-10 h-auto flex"></img>
);
export const InvertedButton: React.FC<{ahref:any; imagIcon:any}> =({ahref,imagIcon})=>(
    <a href={ahref} className={"h-10 w-10"}><Icon imagIcon={imagIcon}/></a>
)

export const Socialmedia = () => {
    return (
                <Wrapper>
                    <FootIcons>
                        <InvertedButton ahref="https://www.facebook.com/politechnikabialostocka/" imagIcon={fb_icon} />
                        <InvertedButton ahref="https://pl.linkedin.com/school/politechnika-bia%C5%82ostocka/" imagIcon={in_icon} />
                        <InvertedButton ahref="https://www.instagram.com/politechnika_bialostocka/" imagIcon={instagram} />
                        <InvertedButton ahref="https://www.youtube.com/channel/UComx9YaRB1AlVQ9tQkelQjw" imagIcon={youtube} />
                    </FootIcons>
                </Wrapper>
    );
};