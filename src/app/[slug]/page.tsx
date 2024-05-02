import { storyblokEditable, getStoryblokApi, storyblokInit, apiPlugin} from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import styles from "../page.module.css";
import { draftMode } from 'next/headers'
import { Metadata, ResolvingMetadata } from 'next'


storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
});

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
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
  const thisSlug = params.slug;
  const slugData  = await fetchSlugData(params.slug);
  const blogPosts = await fetchBlogPostsData();

  slugData.data.story = {
    ...slugData.data.story,
    content: {
      ...slugData.data.story.content,
      blogPosts: blogPosts.data.stories,
    }
  }

  return (
    <>
    <main className={`${styles.main} ${thisSlug}`} {...storyblokEditable}>
       <StoryblokStory story={slugData.data.story} />
    </main>
    </>
  );
}

async function fetchSlugData(slug: string) {
  const { isEnabled } = draftMode()

  if ( slug === 'netherlands' || slug === 'belgium' || slug === 'germany' || slug === 'luxembourg' || slug === 'global') {
    return getStoryblokApi().get(`cdn/stories/locations/${slug}`, { 
      version: isEnabled ? "draft" : "published"
    }, {
      cache: isEnabled ? 'no-store' : 'default'
    } );
  }
  else {
    return getStoryblokApi().get(`cdn/stories/${slug}`, { 
      version: isEnabled ? "draft" : "published"
    }, {
      cache: isEnabled ? 'no-store' : 'default'
    } );
  }
}
async function fetchBlogPostsData() {
  return getStoryblokApi().get(`cdn/stories`, {
    "starts_with": "insights/",
    "is_startpage": false
  },)   
}