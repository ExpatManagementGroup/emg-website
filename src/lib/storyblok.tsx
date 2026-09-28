import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import components from "../components/storyblokComponents";

const accessToken = process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN || process.env.STORYBLOK_PREVIEW_TOKEN || process.env.STORYBLOK_API_TOKEN  || process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN;

export const getStoryblokApi = storyblokInit({
  accessToken: accessToken,
  apiOptions: {
    region: 'eu'
  },
  use: [apiPlugin],
  components: {...components}
});

// How long published Storyblok content is cached before it is revalidated.
// Draft (preview) content is never cached.
export const REVALIDATE_SECONDS = 300;

// Fetch options for Storyblok API calls:
// - draft content: never cached
// - published content: cached in the Next.js data cache and revalidated
//   every REVALIDATE_SECONDS
export function storyblokFetchOptions(isDraft: boolean) {
  return isDraft
    ? { cache: 'no-store' as const }
    : { next: { revalidate: REVALIDATE_SECONDS } };
}
