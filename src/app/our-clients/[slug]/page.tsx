import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { storyblokEditable } from "@storyblok/react";
import styles from "../../page.module.css";
import CCOtherCases from "@/components/clientCases/CCOtherCases";
import { draftMode } from "next/headers";
import { Metadata, ResolvingMetadata } from 'next'
import InitSB from "@/components/initSB";

InitSB();

export async function generateStaticParams() {
  const posts = await getStoryblokApi().get(`cdn/stories/`, {
    "starts_with": "our-clients/",
    "is_startpage": false
  })
   
  return posts.data.stories.map((post: any) => ({
    slug: post.slug,
  }))
}

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  // read route params
  const id = params.slug

  // fetch data
  const pagedata = await fetchData(id)
  const metadata = {
    title: pagedata.data.story.content.seo_title,
    description: pagedata.data.story.content.seo_description,
    ogimage: pagedata.data.story.content.seo_image?.filename ? `${pagedata.data.story.content.seo_image.filename}/m/1200x630/smart/filters:format(jpg)` : '',
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

  const page = await fetchData(params.slug);
  // const othercases = await fetchOtherCCDataExcluding(params.slug);
  const fetchedTestimonials = await fetchTestimonialData();
  page.data.story = {
    ...page.data.story,
    content: {
      ...page.data.story.content,
      allTestimonials: fetchedTestimonials.data.stories || ['dbd']
    }
  }
  const { isEnabled } = await draftMode()
  return (
    <>
    <main className={styles.main} {...storyblokEditable}>
      <StoryblokStory story={page.data.story} />
    </main>
    </>
  );
}

async function fetchData(slug: string) {
  const { isEnabled } = await draftMode();
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/our-clients/${slug}`, {
    "version": isEnabled ? "draft" : "published"
  }, {
    cache: isEnabled ? 'no-store' : 'default'
  });
}
// async function fetchOtherCCDataExcluding(slug:string) {
//   const { isEnabled } = draftMode();
//   return getStoryblokApi().get(`cdn/stories`, {
//     "starts_with": "our-clients/",
//     "is_startpage": false,
//     "excluding_slugs": `our-clients/${slug}`,
//     "version": isEnabled ? "draft" : "published"
//   }, {
//     cache: isEnabled ? 'no-store' : 'default'
//   });
// }
async function fetchTestimonialData() {
  const { isEnabled } = await draftMode();
  return getStoryblokApi().get(`cdn/stories`, {
    "starts_with": "testimonials-clients/",
    "per_page": 5,
    "version": isEnabled ? "draft" : "published"
  }, {
    cache: isEnabled ? 'no-store' : 'default'
  });
}