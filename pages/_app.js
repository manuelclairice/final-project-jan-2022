import { css, Global } from '@emotion/react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
              sans-serif;
            background-color: #fff;
          }
          main {
            margin: 0 8px;
          }
        `}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
