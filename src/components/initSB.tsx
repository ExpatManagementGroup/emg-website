import { storyblokInit, apiPlugin } from "@storyblok/react";
import components from "./storyblokComponents";

export default function InitSB() {
  storyblokInit({
    accessToken: process.env.STORYBLOK_API_TOKEN  || process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
    apiOptions: {
      region: 'eu'
    },
    use: [apiPlugin],
    components: {...components}
  });
}