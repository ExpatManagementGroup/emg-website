import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from '@storyblok/react/rsc';
import styles from "./page.module.css";
import { draftMode } from 'next/headers'
import { Metadata, ResolvingMetadata } from 'next'

// Initialize the Storyblok API after the initialization
const storyblokApi = getStoryblokApi();

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const searchParams = await props.searchParams;
 
  // fetch data
  const pagedata = await fetchData()
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

export default async function Home() {
  const homeData = await fetchData();
  const blogPosts = await fetchBlogPostsData();
  const talentData = await fetchTalentTestimonialData();
  const talentTestimonials = talentData.data.stories;
  const clientCases = await fetchClientsData();
  const clientCaseStories = clientCases.data.stories;
  const topics = await fetchTopicData();
  homeData.data.story = {
    ...homeData.data.story,
    content: {
      ...homeData.data.story.content,
      blogPosts: blogPosts.data.stories,
      talentTestimonials: talentTestimonials,
      clientCaseStories: clientCaseStories,
      topics: topics.data.datasource_entries
    }
  }
  const { isEnabled } = await draftMode()
  return (
    <>
    <main className={`${styles.main} home`}>
      {/* { JSON.stringify(homeData) } */}
      <StoryblokStory story={homeData.data.story} /> 
    </main>
    </>
  );
}

async function fetchData() {
  const { isEnabled } = await draftMode()
  return storyblokApi.get(`cdn/stories/home`, {
    "version": isEnabled ? "draft" : "published",
    "resolve_relations": "blogPosts.posts"
  }, {
    cache: isEnabled ? 'no-store' : 'default'
  });
}
async function fetchBlogPostsData() {
  return storyblokApi.get(`cdn/stories`, {
    "starts_with": "insights/",
    "is_startpage": false,
    "version": "published",
  },)   
}
async function fetchTalentTestimonialData() {
  return storyblokApi.get(`cdn/stories/`, {
    "starts_with": "testimonials-clients/",
    "per_page": 5,
    "version": "published"
  });
}
async function fetchClientsData() {
  return storyblokApi.get(`cdn/stories/`, {
    "starts_with": "our-clients/",
    "is_startpage": false,
    "version": "published"
  });
}
async function fetchTopicData() {
  return storyblokApi.get(`cdn/datasource_entries`, {
    "datasource": "topics",
    "version": "published"
  });
}