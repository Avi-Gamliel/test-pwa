import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icon-512x512.png" />
                <meta name="apple-mobile-web-app-capable" content="yes"></meta>
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"></meta>
                <meta name="theme-color" content="#14131c" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}