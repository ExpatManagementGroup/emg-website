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

// Cache tags so the Storyblok publish webhook (src/app/api/revalidate/route.ts)
// can revalidate published content on demand, without waiting for the TTL.
// Every published fetch also carries STORYBLOK_TAG, which the webhook uses as
// a broad fallback when the payload does not identify the story.
export const STORYBLOK_TAG = 'storyblok';
export const GLOBAL_SETTINGS_TAG = 'storyblok:global-settings';

// Tag for a single story fetch (slug is the story's full_slug).
export function storyTag(slug: string) {
  return `storyblok:story:${slug.replace(/^\/+|\/+$/g, '')}`;
}

// Tag for list fetches of the stories inside a folder (e.g. "insights/").
export function listTag(folder: string) {
  return `storyblok:list:${folder.replace(/\/+$/g, '')}`;
}

// Tag for datasource_entries fetches (e.g. topics, countries).
export function datasourceTag(name: string) {
  return `storyblok:datasource:${name}`;
}

// Fetch options for Storyblok API calls:
// - draft content: never cached
// - published content: cached in the Next.js data cache, revalidated every
//   REVALIDATE_SECONDS or on demand through the given cache tags
export function storyblokFetchOptions(isDraft: boolean, tags: string[] = []) {
  return isDraft
    ? { cache: 'no-store' as const }
    : { next: { revalidate: REVALIDATE_SECONDS, tags: [STORYBLOK_TAG, ...tags] } };
}
