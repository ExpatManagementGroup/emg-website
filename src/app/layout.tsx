import type { Metadata } from "next";
import { getStoryblokApi } from "@storyblok/react";
import StoryblokProvider from "../components/StoryblokProvider";
import { agrandir, reckless } from "../../styles/fonts";
import Navigation from "../components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import { draftMode } from "next/headers";
import InitSB from "@/components/initSB";
import Popup from "@/components/Popup";
import { GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script';
import Link from "next/link";
import "./globals.css";

InitSB();

export const metadata: Metadata = {
  metadataBase: new URL('https://emg-website-preview.netlify.app'),
  title: "Immigration en Relocation Services - Expat Management Group",
  description: "Delivers professional and corporate immigration solutions to the Netherlands, Belgium, Luxembourg and Germany.",
  openGraph: {
    images: [
      {
        url: "/assets/img/og_image.png",
        width: 1200,
        height: 630,
        alt: "Og Image Alt",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {

  const navData = await fetchNavData();
  const footerData = await fetchFooterData();
  const popupData = await fetchPopupData();
  const { isEnabled } = await draftMode();

  if (isEnabled) {
    return (
      <StoryblokProvider>
        <html lang="en">
          <body className={`${agrandir.variable} ${reckless.variable}`}>
            {popupData.data.story.content.display_popup &&
              <Popup delay={popupData.data.story.content.delay} headline={popupData.data.story.content.headline} />
            }
            <Navigation navData={navData} />
              {children}
            { isEnabled && <div style={{
              'position': 'fixed',
              'top': '200px',
              'left': '-100px',
              'width': '424px',
              'textAlign': 'center',
              'background': 'var(--EMG-Sorbet)',
              'color': 'var(--EMG-Aero-Orange)',
              'borderRadius': '3px',
              'fontSize': '1.5rem',
              'fontWeight': 'bold',
              'fontFamily': 'sans-serif',
              'padding': '.5em',
              'zIndex': '1001',
              'transformOrigin': '0% 0%',
              'transform': 'rotate(-45deg)',
              'boxShadow': '0 0 10px rgba(0,0,0,0.5)',
              'opacity': '0.95',
            }}>Draft Mode <Link href="/api/exit-draft?slug=">(exit)</Link></div>}
            <Footer navData={navData} footerData={footerData} />
          </body>
        </html>
      </StoryblokProvider>
    );
  }
  else {
    return (
      <html lang="en">
      <GoogleTagManager gtmId="GTM-MC4XFKQL" />
      <body className={`${agrandir.variable} ${reckless.variable}`}>
        {popupData.data.story.content.display_popup &&
          <Popup delay={popupData.data.story.content.delay} headline={popupData.data.story.content.headline} />
        }
        <Navigation navData={navData} />
          {children}
        <Footer navData={navData} footerData={footerData} />
        <Script
          id="cookieyes-script"
          src={`https://cdn-cookieyes.com/client_data/27fbaa7ff2975a61d7c5bbfa/script.js`}
          strategy="beforeInteractive"
        >
        </Script>
        <Script
          id="hs-script-loader"
          src="//js-eu1.hs-scripts.com/145878577.js"
          strategy="afterInteractive"
          async
          defer
        >
        </Script>
      </body>
    </html>
    );
  }
}

async function fetchNavData() {
  return getStoryblokApi().get(`cdn/stories/global-settings/navigation`, { 
    version: "draft" 
  } );
}
async function fetchFooterData() {
  return getStoryblokApi().get(`cdn/stories/global-settings/footer`, { 
    version: "draft" 
  } );
}
async function fetchPopupData() {
  return getStoryblokApi().get(`cdn/stories/global-settings/popup-settings`, { 
    version: "draft" 
  } );
}