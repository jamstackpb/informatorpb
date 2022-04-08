import React from 'react';

const Container: React.FC = ({ children }) => {
    return <div className="bg-pb w-full h-full pt-6 pb-6">{children}</div>;
};

const Copyright: React.FC = ({ children }) => {
    return <div className="text-white text-center">{children}</div>
}
export const Footer: React.FC = () => {
    return (
        <Container>
            <Copyright>Copyright ©: JAMStackPB</Copyright>
        </Container>
    );
};
