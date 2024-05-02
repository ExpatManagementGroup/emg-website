import type { Metadata } from "next";
import { ISbStoriesParams, getStoryblokApi, storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import StoryblokProvider from "../components/StoryblokProvider";
import { agrandir, reckless } from "../../styles/fonts";
import "./globals.css";
import Navigation from "../components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import { draftMode } from "next/headers";
import { Suspense } from "react";
import Loading from "./loading";

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
});


export const metadata: Metadata = {
  metadataBase: new URL('https://emg-website-preview.netlify.app'),
  title: "Immigration en Relocation Services - Expat Management Group",
  description: "Delivers professional and corporate immigration solutions to the Netherlands, Belgium, Lucembourg and Germany.",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navData = await fetchNavData();

  const { isEnabled } = draftMode();

  return (
    <StoryblokProvider>
      <html lang="en">
        <body className={`${agrandir.variable} ${reckless.variable}`}>
          <Navigation navData={navData} />
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
          { isEnabled && <div style={{
            'position': 'fixed',
            'bottom': '0',
            'right': '0',
            'background': 'red',
            'color': 'white',
            'zIndex': '1000',
          }}>Draft Mode</div>}
          <Footer navData={navData} />
        </body>
      </html>
    </StoryblokProvider>
  );
}

async function fetchNavData() {
  return getStoryblokApi().get(`cdn/stories/global-settings/navigation`, { 
    version: "draft" 
  } );
}