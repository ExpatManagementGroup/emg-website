import { ISbStoriesParams, storyblokEditable, getStoryblokApi, storyblokInit, apiPlugin, setComponents} from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import styles from "./page.module.css";
import Post_1 from "../../../components/pages/Post_1"; 
import { draftMode } from "next/headers";
import PostCard from "@/components/PostCard";

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
  const morePostsData = await fetchMorePostsData(params.slug);
  postData.data.story = {
    ...postData.data.story,
    content: {
      ...postData.data.story.content,
      topics: allTopicsData.data.datasource_entries,
      morePosts: morePostsData.data.stories
    }
  }
  return (
    <>
    <main className={`${styles.main} ${postData.data.story.content.component}`} {...storyblokEditable}>
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
async function fetchMorePostsData(slug: string) {
  const { isEnabled } = draftMode()
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories`, {
    'starts_with': 'insights/', 
    'is_startpage': false,
    'excluding_slugs': `insights/${slug}`,
    'per_page': 2,
    'version': isEnabled ? "draft" : "published",
  }, {
    cache: isEnabled ? 'no-store' : 'default'
  });
}