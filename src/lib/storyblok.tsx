import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import components from "../components/storyblokComponents";

const accessToken = process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN || process.env.STORYBLOK_PREVIEW_TOKEN || process.env.STORYBLOK_API_TOKEN  || process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN;

console.log('Storyblok API initialized with token:', accessToken ? `${accessToken.substring(0, 8)}...` : 'No token found');

export const getStoryblokApi = storyblokInit({
  accessToken: accessToken,
  apiOptions: {
    region: 'eu'
  },
  use: [apiPlugin],
  components: {...components}
});