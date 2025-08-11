import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { ThemeProvider } from '../context/ThemeContext';
import { SettingsProvider } from '../context/SettingsContext';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SettingsProvider>
        <CartProvider>
          <ThemeProvider>
            <Toaster position="top-center" />
            <Component {...pageProps} />
          </ThemeProvider>
        </CartProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default MyApp;
