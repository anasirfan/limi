import { Poppins } from 'next/font/google';
import "./globals.css";
import SmoothScroll from './components/SmoothScroll';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: "LIMI | Lighting Made Limitless",
  description: "Explore smart modular lighting designed to fit your mood, your style, your life.",

  openGraph: {
    title: "LIMI | Lighting Made Limitless",
    description: "Explore smart modular lighting designed to fit your mood, your style, your life.",
    url: "https://www.limilighting.co.uk",  // Use same format as canonical
    siteName: "LIMI Lighting",
    images: [
      {
        url: "https://www.limilighting.co.uk/og-image.jpg", // Use full absolute URL
        width: 1200,
        height: 630,
        alt: "LIMI Smart Lighting Preview",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "LIMI | Lighting Made Limitless",
    description: "Explore smart modular lighting designed to fit your mood, your style, your life.",
    images: ["https://www.limilighting.co.uk/og-image.jpg"], // Use absolute URL
  },

  icons: {
    icon: [
      { url: '/images/svgLogos/__Logo_Icon_Colored.svg', type: 'image/svg+xml' }
    ],
    shortcut: [
      { url: '/images/svgLogos/__Logo_Icon_Colored.svg', type: 'image/svg+xml' }
    ]
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'https://www.limilighting.co.uk', // Same format as OG url
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className} suppressHydrationWarning>
        <SmoothScroll>
          <ToastContainer />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
