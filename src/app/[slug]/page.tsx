import { storyblokEditable } from "@storyblok/react";
import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from '@storyblok/react/rsc';
import styles from "../page.module.css";
import { draftMode } from 'next/headers'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from "next/navigation";

// Force dynamic rendering to handle draft-only pages
export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateStaticParams() {
  return [
    { slug: 'immigration' },
    { slug: 'relocation' },
    { slug: 'our-story' },
    { slug: 'our-culture' },
    { slug: 'faq' },
    { slug: 'contact-us' }
  ]
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  // read route params
  const id = params.slug

  // fetch data
  const pagedata = await fetchSlugData(id)

  const metadata = {
    title: pagedata.data.story.content.meta_title,
    description: pagedata.data.story.content.meta_description,
    ogimage: pagedata.data.story.content.og_image?.filename ? `${pagedata.data.story.content.og_image.filename}/m/1200x630/smart/filters:format(jpg)` : '',
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  const openGraphImages = [...previousImages]

  if (metadata.ogimage) {
    const ogimg = { url: metadata.ogimage, width: 1200, height: 630 }
    openGraphImages.splice(0, openGraphImages.length, ogimg)
  }

  return {
    title: metadata.title || (await parent).title,
    description: metadata.description || (await parent).description,
    openGraph: {
      images: openGraphImages,
    },
  }
}

export default async function Slug(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const thisSlug = params.slug;
  const slugData  = await fetchSlugData(params.slug);
  const blogPosts = await fetchBlogPostsData();
  const topics = await fetchTopicData();

  // if (!thisSlug || !slugData || !slugData.data.story) {
  //   return notFound();
  // }

  slugData.data.story = {
    ...slugData.data.story,
    content: {
      ...slugData.data.story.content,
      blogPosts: blogPosts.data.stories,
      topics: topics.data.datasource_entries,
    }
  }
  const { isEnabled } = await draftMode()

  return (
    <>
    <main className={`${styles.main} ${thisSlug}`} {...storyblokEditable}>
      <StoryblokStory story={slugData.data.story} />
    </main>
    </>
  );
}

async function fetchSlugData(slug: string) {
  const { isEnabled } = await draftMode()
  try {
    if ( slug === 'netherlands' || slug === 'belgium' || slug === 'germany' || slug === 'luxembourg' || slug === 'global') {
      const story = await getStoryblokApi().get(`cdn/stories/locations/${slug}`, {
        version: isEnabled ? "draft" : "published"
      }, {
        cache: isEnabled ? 'no-store' : 'default'
      } );
      return story;
    }
    else {
      const story = await getStoryblokApi().get(`cdn/stories/${slug}`, { 
        version: isEnabled ? "draft" : "published"
      }, {
        cache: isEnabled ? 'no-store' : 'default'
      } );
      return story;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return notFound();
  }
}
async function fetchBlogPostsData() {
  return getStoryblokApi().get(`cdn/stories`, {
    "starts_with": "insights/",
    "is_startpage": false
  },)   
}
async function fetchTopicData() {
  return getStoryblokApi().get(`cdn/datasource_entries`, {
    "datasource": "topics",
    "version": "published"
  });
}