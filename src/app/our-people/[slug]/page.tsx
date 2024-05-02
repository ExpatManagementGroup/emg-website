import { storyblokEditable, getStoryblokApi, storyblokInit, apiPlugin} from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import styles from "../../page.module.css";
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
  // read route params
  const id = params.slug
 
  // fetch data
  const pagedata = await fetchData(id)
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

  const employee = await fetchData(params.slug);

  return (
    <>
    <main className={styles.main} {...storyblokEditable}>
      <StoryblokStory story={employee.data.story} />
    </main>
    </>
  );
}

async function fetchData(slug: string) {
  const { isEnabled } = draftMode()
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/our-people/${slug}`, {
    "version": isEnabled ? "draft" : "published"
  }, {
    cache: isEnabled ? 'no-store' : 'default'
  });
}