import { Poppins } from 'next/font/google';
import "./globals.css";
// import SmoothScroll from './components/SmoothScroll';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReduxProvider } from './redux/provider';
import StoreInitializer from './redux/StoreInitializer';
import { ModalProvider } from './components/context/ModalContext';
import { HideNavFooterProvider } from './components/context/HideNavFooterContext';

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

<head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="format-detection" content="telephone=no" />
<meta name="mobile-web-app-capable" content="yes" />
      {/* Umami Analytics */}
      <script 
        defer 
        src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || "https://cloud.umami.is/script.js"}
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "d1ff84bb-5098-45e2-b135-568ef7264eff"}
      ></script>
      </head>

      <body className={poppins.className} suppressHydrationWarning>
      
        <ReduxProvider>
          <StoreInitializer />
          <ModalProvider>
            <HideNavFooterProvider>
              {/* <SmoothScroll> */}
                <ToastContainer />
                {children}
              {/* </SmoothScroll> */}
            </HideNavFooterProvider>
          </ModalProvider>
        </ReduxProvider>     
      </body>
    </html>
  );
}
