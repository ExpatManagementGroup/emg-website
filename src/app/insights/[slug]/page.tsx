import { ISbStoriesParams, storyblokEditable, getStoryblokApi, storyblokInit, apiPlugin} from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import styles from "./page.module.css";

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
});

export default async function Slug({ params }: { params: { slug: string } }) {

  const postData = await fetchData(params.slug);
  const allTopicsData = await fetchTopicData();
  postData.data.story = {
    ...postData.data.story,
    content: {
      ...postData.data.story.content,
      topics: allTopicsData.data.datasource_entries
    }
  }
  return (
    <>
    <main className={styles.main} {...storyblokEditable}>
       <StoryblokStory story={postData.data.story} />
    </main>
    </>
  );
}

async function fetchData(slug: string) {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/insights/${slug}`, { 
    version: "draft" 
  } );
}
async function fetchTopicData() {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/datasource_entries`, {
    "datasource": "topics",
  });
}