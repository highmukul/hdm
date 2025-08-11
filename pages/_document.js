import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const setInitialTheme = `
    function getInitialTheme() {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme) return storedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    const theme = getInitialTheme();
    document.documentElement.classList.add(theme);
  `;

  return (
    <Html>
      <Head />
      <body>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
