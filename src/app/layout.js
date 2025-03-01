import { Poppins } from 'next/font/google';
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: "LIMI | Lighting Made Limitless",
  description: "A Journey Through Time",
  icons: {
    icon: [
      { url: '/images/svgLogos/__Icon_Wordmark_Colored.svg', type: 'image/svg+xml' }
    ],
    shortcut: [
      { url: '/images/svgLogos/__Icon_Wordmark_Colored.svg', type: 'image/svg+xml' }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={poppins.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
