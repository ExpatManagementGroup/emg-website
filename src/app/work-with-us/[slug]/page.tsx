import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { storyblokEditable } from "@storyblok/react";
import styles from "../../page.module.css";
import WorkWithUsMoreJobs from "@/components/work_with_us/WorkWithUsMoreJobs";
import { draftMode } from "next/headers";
import { Metadata, ResolvingMetadata } from 'next'

export async function generateStaticParams() {
  const posts = await getStoryblokApi().get(`cdn/stories/`, {
    "starts_with": "work-with-us/",
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

  const job = await fetchData(params.slug);
  const moreJobs = await fetchMoreJobs();
  const { isEnabled } = await draftMode()
  return (
    <>
    <main className={styles.main} {...storyblokEditable}>
      <StoryblokStory story={job.data.story} />
      <WorkWithUsMoreJobs jobs={moreJobs.data.stories} slug={params.slug} morejobsheader={job.data.story.content.morejobs_headline} />
    </main>
    </>
  );
}

async function fetchData(slug: string) {
  const { isEnabled } = await draftMode()
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/work-with-us/${slug}`, {
    "version": isEnabled ? "draft" : "published"
  }, {
    cache: isEnabled ? 'no-store' : 'default'
  });
}
async function fetchMoreJobs() {
  const { isEnabled } = await draftMode()
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories`, {
    "starts_with": "work-with-us",
    "version": isEnabled ? "draft" : "published",
    "content_type": "job",
    "per_page": 4,
  }, {
    cache: isEnabled ? 'no-store' : 'default'
  });
}