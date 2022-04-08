import { AppProps } from 'next/app';
import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import { globalStyle } from '../utils';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Global styles={globalStyle} />
            <Component {...pageProps} />
        </>
    );
};

export default App;
