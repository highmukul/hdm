import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import { CaptainAuthProvider } from '../hooks/useCaptainAuth'; // Correct path
import { CartProvider } from '../context/CartContext';
import { ThemeProvider } from '../context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAnalytics } from '../hooks/useAnalytics';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { trackEvent } = useAnalytics();
  
  useEffect(() => {
    const handleRouteChange = (url) => {
      trackEvent('page_view', { page_path: url });
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, trackEvent]);

  const isCaptainRoute = router.pathname.startsWith('/captain');

  const AuthWrapper = isCaptainRoute ? CaptainAuthProvider : AuthProvider;

  return (
    <AuthWrapper>
      <CartProvider>
        <ThemeProvider>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Hadoti Daily</title>
          </Head>
          <Component {...pageProps} />
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
        </ThemeProvider>
      </CartProvider>
    </AuthWrapper>
  );
}

export default MyApp;
