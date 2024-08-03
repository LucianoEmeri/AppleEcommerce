import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import { FooterWithSitemap } from '@/components/Footer/Footer';
import ShowComponent from '@/components/ShowComponent/ShowComponent';
import ShowCarousel from '@/components/ShowCarousel/ShowCarousel';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'Apple Argentina',
  description: 'Productos Apple',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="description" content="Productos Apple" />
        <title>Apple Argentina</title>
      </head>
      <body>
        <AuthProvider>
          <ShowComponent>
            <Navbar />
            <ShowCarousel />
          </ShowComponent>
            {children}
          <ShowComponent>
            <FooterWithSitemap />
          </ShowComponent>
        </AuthProvider>
      </body>
    </html>
  );
}
