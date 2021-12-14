import React from 'react';

const Container: React.FC = ({ children }) => {
    return <div className="bg-pb w-full h-full pt-6 pb-6">{children}</div>;
};

const LogoContainer: React.FC = ({children}) => {
    return <div className="flex justify-center">{children}</div>
}
const LogoPB: React.FC<{src: string}> = ({src}) => <img
    className = "ml-3 object-contain" 
    src={src} />
const Godlo: React.FC<{src: string}> = ({src}) => <img
    className = "mr-3 object-contain" 
    src={src} />

const logo = 'https://pb.edu.pl/wp-content/themes/pb/assets/img/logo-pb-w.png';
const godlo = 'https://pb.edu.pl/wp-content/themes/pb/assets/img/godlo.png';
export const Header: React.FC = () => {
    return (
        <Container>
            <LogoContainer>
                <Godlo src = {godlo} /> 
                <div className="border-l-2 h-18"></div>
                <LogoPB src = {logo} />
            </LogoContainer>
        </Container>
    );
};
