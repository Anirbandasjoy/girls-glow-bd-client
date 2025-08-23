/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Roboto,
  Montserrat,
  Caladea,
  Tiro_Bangla,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ReduxWrapper from "@/redux/ReduxWrapper";
import { GoogleTagManager } from "@next/third-parties/google";
import { GTMPageViewTracker } from "@/components/GTMPageViewTracker";
import RightClickDisable from "@/components/RightClickDisable";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tiro_bangla = Tiro_Bangla({
  variable: "--font-tiro_bangla",
  weight: ["400"],
  subsets: ["latin"],
});
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const caladea = Caladea({
  variable: "--font-caladea",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Glow girls bd",
  description: "Glow girls bd description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Facebook Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1783814055829519');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1783814055829519&ev=PageView&noscript=1"
          />
        </noscript>
        {/* ✅ End Facebook Pixel */}
      </head>

      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />

      <ReduxWrapper>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${montserrat.className} ${roboto.variable} ${caladea.variable} ${tiro_bangla.variable} antialiased`}
        >
          <GTMPageViewTracker />
          <RightClickDisable />
          <main>{children}</main>
          <Toaster position="top-center" reverseOrder={false} />
          <div className="">
            {/* <FacebookMessengerButton />
            <CallButton />
            <TawkToChat /> */}
          </div>
        </body>
      </ReduxWrapper>
    </html>
  );
}

// cartcard
// carttable
