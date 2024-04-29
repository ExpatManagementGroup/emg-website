import { ISbStoriesParams, storyblokEditable, getStoryblokApi, storyblokInit, apiPlugin, setComponents} from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import styles from "./page.module.css";
import Post_1 from "../../../components/pages/Post_1"; 
import { draftMode } from "next/headers";

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
});

export default async function Slug({ params }: { params: { slug: string } }) {

  setComponents({
    post_one: Post_1,
  })  

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
  const isEnabled = draftMode().isEnabled;
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/insights/${slug}`, { 
    version: isEnabled ? "draft" : "published"
  }, {
    cache: isEnabled ? 'no-store' : 'default'
  });
}
async function fetchTopicData() {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/datasource_entries`, {
    "datasource": "topics",
  });
}