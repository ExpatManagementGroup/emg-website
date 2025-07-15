"use client";
import { ReactNode } from "react";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import components from "./storyblokComponents";

export default function StoryblokProvider({ children }: { children: ReactNode }) { 
  storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN || process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
    use: [apiPlugin],
    components,
    apiOptions: {
      region: 'eu'
    }
  });
  
  return children;
}