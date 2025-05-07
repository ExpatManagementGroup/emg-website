import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import components from "../components/storyblokComponents";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN  || process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
  apiOptions: {
    region: 'eu'
  },
  use: [apiPlugin],
  components: {...components}
});