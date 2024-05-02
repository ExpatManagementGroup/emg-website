import { storyblokEditable, getStoryblokApi, storyblokInit, apiPlugin} from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import styles from "../page.module.css";
import { draftMode } from "next/headers";
import { Metadata, ResolvingMetadata } from 'next'

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
});

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
 
  // fetch data
  const pagedata = await fetchSlugData()
  const metadata = {
    title: pagedata.data.story.content.meta_title,
    description: pagedata.data.story.content.meta_description,
    ogimage: pagedata.data.story.content.og_image?.filename ? `${pagedata.data.story.content.og_image.filename}/m/1200x630/smart/filters:format(jpg)` : '',
  }
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  const ogimg = { url: metadata.ogimage, width: 1200, height: 630 }
 
  return {
    title: metadata.title || (await parent).title,
    description: metadata.description || (await parent).description,
    openGraph: {
      images: [ogimg, ...previousImages],
    },
  }
}

export default async function Slug({ params }: { params: { slug: string } }) {

  const slugData  = await fetchSlugData();
  const clientCaseStories = await fetchClientsData();
  const talentData = await fetchTalentTestimonialData();

  slugData.data.story = {
    ...slugData.data.story,
    content: {
      ...slugData.data.story.content,
      clientCaseStories: clientCaseStories.data.stories,
      talentTestimonials: talentData.data.stories
    }
  }

  return (
    <>
    <main className={`${styles.main} our_clients`} {...storyblokEditable}>
       <StoryblokStory story={slugData.data.story} />
    </main>
    </>
  );
}

async function fetchSlugData() {
  const { isEnabled } = draftMode()
  return getStoryblokApi().get(`cdn/stories/our-clients`, { 
    // 'is_startpage': true,
    'version': isEnabled ? "draft" : "published"
  }, {
    cache: isEnabled ? 'no-store' : 'default'
  } );
}
async function fetchClientsData() {
  const { isEnabled } = draftMode()
  return getStoryblokApi().get(`cdn/stories`, {
    "starts_with": "our-clients/",
    "is_startpage": false,
    "version": isEnabled ? "draft" : "published"
  }, {
    cache: isEnabled ? 'no-store' : 'default'
  });
}
async function fetchTalentTestimonialData() {
  const { isEnabled } = draftMode()
  return getStoryblokApi().get(`cdn/stories/`, {
    "starts_with": "testimonials-clients/",
    "per_page": 5,
    "version": isEnabled ? "draft" : "published"
  }, {
    cache: isEnabled ? 'no-store' : 'default'
  });
}