import { storyblokEditable, getStoryblokApi, storyblokInit, apiPlugin} from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import styles from "../../page.module.css";

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
});

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
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/our-people/${slug}`, {
    "version": "draft"
  }, {
    "cache": "no-cache"
  });
}