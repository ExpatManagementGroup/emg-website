import { storyblokInit, apiPlugin } from "@storyblok/react";
import components from "./storyblokComponents";

export default function InitSB() {
  // Make sure we only initialize once in the same context
  try {
    return storyblokInit({
      accessToken: process.env.STORYBLOK_API_TOKEN || process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
      apiOptions: {
        region: 'eu'
      },
      use: [apiPlugin],
      components
    });
  } catch (e) {
    // If it's already initialized, just return
    console.log("Storyblok already initialized or initialization error");
    return;
  }
}