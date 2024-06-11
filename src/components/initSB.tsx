import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import components from "./storyblokComponents";

export default function InitSB() {
  storyblokInit({
    accessToken: process.env.STORYBLOK_API_TOKEN  || 'NULL',
    apiOptions: {
      region: 'eu'
    },
    use: [apiPlugin],
    components
  });
}