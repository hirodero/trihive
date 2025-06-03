'use client'
import "./globals.css";
import Navigation from "./components/ui/Navigation";
import Footer from "./components/ui/Footer";
import { Toaster } from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import { Auth0Provider } from '@auth0/auth0-react';
import { AdminProvider } from "./context/AdminContext";
export default function RootLayout({ children }) {
  const router = usePathname();
  const hideFooterPages = ['/trivia/games/'];
  const shouldShowFooter = !hideFooterPages.some(path => router.startsWith(path));

  return (
    <html lang="en" className="scrollbar scrollbar-track-lime-700 scrollbar-thumb-lime-400">
      <body className="flex flex-col min-h-screen -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_20%,#280_100%)]">
        <Auth0Provider
          domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
          clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
          authorizationParams={{
            redirect_uri: typeof window !== 'undefined' ? window.location.origin : '',
            scope: 'openid profile email', 
            response_type: 'id_token token'
          }}
        >
          <AdminProvider>
          <header className="fixed w-full z-50">
            <Navigation />
          </header>
          <main>
            {children}
            <Toaster position="top-right" />
          </main>
          <footer className="mt-auto w-full">
            {shouldShowFooter && <Footer />}
          </footer>
          </AdminProvider>
        </Auth0Provider>
      </body>
    </html>
  );
}
