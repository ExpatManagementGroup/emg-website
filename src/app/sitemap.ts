import { MetadataRoute } from 'next';
import {
  getStoryblokApi,
  storyblokFetchOptions,
  datasourceTag,
  SITEMAP_TAG,
} from '@/lib/storyblok';

// Generated at build time and cached/revalidated like every other published
// Storyblok fetch (see storyblokFetchOptions).
//
// Replaces next-sitemap, which could only see prerendered routes and
// therefore missed every page served by the dynamic [slug] route
// (e.g. /our-culture, /our-story and the location pages).

const SITE_URL = process.env.SITE_URL || 'https://www.expatmanagementgroup.com';

// The homepage is the Storyblok story "home", served at "/" by src/app/page.tsx.
const HOME_SLUG = 'home';

// Location stories are served by the root [slug] route without their
// folder prefix (mirrors the slug mapping in src/app/[slug]/page.tsx).
const LOCATION_SLUGS = ['netherlands', 'belgium', 'germany', 'luxembourg', 'global'];

// Storyblok folders that hold fragments rendered inside other pages
// (events, testimonials, site settings); they have no URL of their own.
const NON_ROUTABLE_FOLDERS = [
  'events',
  'testimonials-clients',
  'testimonials-employees',
  'global-settings',
];

// App Router pages that exist as code (src/app/**/page.tsx), independent of
// a matching Storyblok startpage story. Already-covered paths are skipped
// during dedupe. These render lists of other stories, so their entries carry
// no lastModified (a story's own published_at would go stale as soon as a
// listed item changes).
const STATIC_PAGE_PATHS = ['', '/insights', '/our-clients', '/our-people', '/work-with-us'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [stories, topics] = await Promise.all([
    fetchAllPublishedStories(),
    fetchTopics(),
  ]);

  const seen = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];

  for (const story of stories) {
    const path = storyPath(story);
    if (!path && path !== '') continue;
    if (seen.has(path)) continue;
    seen.add(path);

    if (STATIC_PAGE_PATHS.includes(path)) {
      entries.push({ url: SITE_URL + path });
    } else {
      entries.push({
        url: SITE_URL + path,
        lastModified: story.published_at ? new Date(story.published_at) : undefined,
      });
    }
  }

  for (const topic of topics) {
    const path = `/insights/topics/${topic.value}`;
    if (seen.has(path)) continue;
    seen.add(path);
    entries.push({ url: SITE_URL + path });
  }

  for (const path of STATIC_PAGE_PATHS) {
    if (seen.has(path)) continue;
    seen.add(path);
    entries.push({ url: SITE_URL + path });
  }

  return entries;
}

// Maps a Storyblok story to the URL path the App Router actually serves it
// at, or null when the story has no public page of its own. Paths are always
// bare: with Next's default trailingSlash:false, slash variants only
// 308-redirect, and Storyblok hands back startpage full_slugs with a
// trailing slash (e.g. "insights/"), so it is stripped here.
function storyPath(story: any): string | null {
  const fullSlug: string = story.full_slug.replace(/\/+$/, '');

  // Pages excluded from indexing are not advertised in the sitemap.
  if (story.content?.meta_nofollow === true) {
    return null;
  }

  if (fullSlug === HOME_SLUG) {
    return '';
  }

  const folder = fullSlug.includes('/') ? fullSlug.split('/')[0] : null;
  if (folder && NON_ROUTABLE_FOLDERS.includes(folder)) {
    return null;
  }

  // locations/netherlands etc. are served at /netherlands by the [slug] route.
  if (folder === 'locations') {
    const locationSlug = fullSlug.split('/')[1];
    return LOCATION_SLUGS.includes(locationSlug) ? `/${locationSlug}` : null;
  }

  return `/${fullSlug}`;
}

async function fetchAllPublishedStories() {
  const api = getStoryblokApi();
  const stories: any[] = [];
  let page = 1;
  let total = Infinity;

  // cdn/stories returns at most 100 stories per request.
  while (stories.length < total) {
    const { data, headers }: { data: any; headers: any } = await api.get(
      'cdn/stories',
      {
        version: 'published',
        per_page: 100,
        page,
      },
      storyblokFetchOptions(false, [SITEMAP_TAG])
    );
    stories.push(...data.stories);
    total = Number(headers.total);
    if (data.stories.length === 0) break;
    page += 1;
  }

  return stories;
}

async function fetchTopics() {
  try {
    const { data }: { data: any } = await getStoryblokApi().get(
      'cdn/datasource_entries',
      {
        datasource: 'topics',
        version: 'published',
      },
      storyblokFetchOptions(false, [datasourceTag('topics'), SITEMAP_TAG])
    );
    return data.datasource_entries as { value: string }[];
  } catch {
    // A failing datasource should not break the whole sitemap.
    return [];
  }
}
