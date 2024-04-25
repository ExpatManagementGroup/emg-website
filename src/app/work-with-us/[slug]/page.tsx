import { storyblokEditable, getStoryblokApi, storyblokInit, apiPlugin} from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import styles from "../../page.module.css";
import WorkWithUsMoreJobs from "@/components/work_with_us/WorkWithUsMoreJobs";

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
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/work-with-us/${slug}`, {
    "version": "draft"
  }, {
    "cache": "no-cache"
  });
}
async function fetchMoreJobs() {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories`, {
    "starts_with": "work-with-us",
    "version": "published",
    "content_type": "job",
    "per_page": 4,
  }, {
    "cache": "no-cache"
  });
}