import { storyblokEditable, getStoryblokApi, storyblokInit, apiPlugin} from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import styles from "../../page.module.css";
import WorkWithUsMoreJobs from "@/components/work_with_us/WorkWithUsMoreJobs";
import { draftMode } from "next/headers";

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
});

export default async function Slug({ params }: { params: { slug: string } }) {

  const job = await fetchData(params.slug);
  const moreJobs = await fetchMoreJobs();

  return (
    <>
    <main className={styles.main} {...storyblokEditable}>
      <StoryblokStory story={job.data.story} />
      <WorkWithUsMoreJobs jobs={moreJobs.data.stories} slug={params.slug} />
    </main>
    </>
  );
}

async function fetchData(slug: string) {
  const { isEnabled } = draftMode()
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/work-with-us/${slug}`, {
    "version": isEnabled ? "draft" : "published"
  }, {
    cache: isEnabled ? 'no-store' : 'default'
  });
}
async function fetchMoreJobs() {
  const { isEnabled } = draftMode()
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