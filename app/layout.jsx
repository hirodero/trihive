'use client'
import "./globals.css";
import Navigation from "./components/ui/Navigation";
import Footer from "./components/ui/Footer"
import { Toaster } from 'react-hot-toast';
import { usePathname } from 'next/navigation';
export default function RootLayout({ children }) {
  const router = usePathname();
  const hideFooterPages = ['/trivia/games/']
  const shouldShowFooter = !hideFooterPages.some(path => router.startsWith(path));
    return (
        <html className="scrollbar scrollbar-track-lime-700  scrollbar-thumb-lime-400" lang="en">
          <body className="flex flex-col min-h-screen -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_20%,#280_100%)]">
            <header className="fixed w-full z-50">
              <Navigation/>
            </header>
            <main className="">
                {children}
                <Toaster position="top-right" />
            </main>
            <footer className="mt-auto w-full">
              {shouldShowFooter&&
              <Footer />}
            </footer>
          </body>
        </html>
    );
  }