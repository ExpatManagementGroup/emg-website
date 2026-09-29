import { storyblokEditable } from "@storyblok/react";
import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi, storyblokFetchOptions, storyTag, listTag, datasourceTag } from "@/lib/storyblok";
import styles from "../page.module.css";
import { draftMode } from "next/headers";
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from "next/navigation";

// Revalidate the published page periodically; draft mode still renders dynamically.
export const revalidate = 300;

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;

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

const storyblokApi = getStoryblokApi();

export default async function OurPeople() {
  const [ourPeopleData, countriesData, jobs, testimonials, blogPosts, topics] = await Promise.all([
    fetchData(),
    fetchCountryData(),
    fetchJobsData(),
    fetchEmployeeTestimonialsData(),
    fetchBlogPostsData(),
    fetchTopicData()
  ]);
  ourPeopleData.data.story = {
    ...ourPeopleData.data.story,
    content: {
      ...ourPeopleData.data.story.content,
      jobs: jobs.data.stories,
      countries: countriesData.data.datasource_entries,
      testimonials: testimonials.data.stories,
      blogPosts: blogPosts.data.stories,
      topics: topics.data.datasource_entries
    }
  }
  const { isEnabled } = await draftMode()
  return (
    <>
    <main className={`${styles.main} work_with_us`} {...storyblokEditable}>
      <StoryblokStory story={ourPeopleData.data.story} />
    </main>
    </>
  );
}

async function fetchData() {
  const { isEnabled } = await draftMode()
  try {
    return storyblokApi.get(`cdn/stories/work-with-us`, {
      "version": isEnabled ? "draft" : "published",
    }, storyblokFetchOptions(isEnabled, [storyTag('work-with-us')]));
  } catch (error) {
    console.error(error);
    return notFound();
  }
}
async function fetchJobsData() {
  const { isEnabled } = await draftMode()
  try {
    return storyblokApi.get(`cdn/stories`, {
      "version": isEnabled ? "draft" : "published",
      "starts_with": "work-with-us/",
      "content_type": "job",
    }, storyblokFetchOptions(isEnabled, [listTag('work-with-us')]));  
  } catch (error) {
    console.error(error);
    return notFound();
  }
}
async function fetchEmployeeTestimonialsData() {
  const { isEnabled } = await draftMode()
  if (isEnabled) {
    return storyblokApi.get(`cdn/stories`, {
      "version": "draft",
      "starts_with": "testimonials-employees/",
      "content_type": "testimonial_employee",
    }, { cache: 'no-store' });
  }
  try {
    return await storyblokApi.get(`cdn/stories`, {
      "version": "published",
      "starts_with": "testimonials-employees/",
      "content_type": "testimonial_employee",
    }, storyblokFetchOptions(false, [listTag('testimonials-employees')]));
  } catch (error) {
    // Fall back to draft in case these testimonials were never published
    console.warn('Published employee testimonials not available, falling back to draft:', error);
    return storyblokApi.get(`cdn/stories`, {
      "version": "draft",
      "starts_with": "testimonials-employees/",
      "content_type": "testimonial_employee",
    }, { cache: 'no-store' });
  }
}
async function fetchCountryData() {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/datasource_entries`, {
    "datasource": "countries",
    "per_page": 1000,
  }, storyblokFetchOptions(false, [datasourceTag('countries')]));
}
async function fetchBlogPostsData() {
  return storyblokApi.get(`cdn/stories`, {
    "starts_with": "insights/",
    "is_startpage": false
  }, storyblokFetchOptions(false, [listTag('insights')]));  
}
async function fetchTopicData() {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/datasource_entries`, {
    "datasource": "topics",
  }, storyblokFetchOptions(false, [datasourceTag('topics')]));
}