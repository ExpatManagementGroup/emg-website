"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import { ReactNode } from "react"; // Import ReactNode type
import components from "./storyblokComponents";

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN  || 'NULL',
  use: [apiPlugin],
  components
});
 
export default function StoryblokProvider({ children }: { children: ReactNode }) { 
  return children;
}