import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render(): JSX.Element {
        return (
            <Html lang="pl-PL">
                <Head></Head>
                <body style={{ margin: 0 }}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
