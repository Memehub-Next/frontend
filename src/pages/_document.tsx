import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <Script src="/node_modules/focus-visible/dist/focus-visible.min.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
