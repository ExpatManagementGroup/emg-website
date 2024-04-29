import { storyblokEditable, getStoryblokApi, storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import styles from "./page.module.css";
import { draftMode } from 'next/headers'

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
});

const storyblokApi = getStoryblokApi();

export default async function Home() {
  const { isEnabled } = draftMode()
  const homeData = await fetchData();
  const blogPosts = await fetchBlogPostsData();
  const talentData = await fetchTalentTestimonialData();
  const talentTestimonials = talentData.data.stories;
  const clientCases = await fetchClientsData();
  const clientCaseStories = clientCases.data.stories;
  const topics = await fetchTopicData();
  homeData.data.story = {
    ...homeData.data.story,
    content: {
      ...homeData.data.story.content,
      blogPosts: blogPosts.data.stories,
      talentTestimonials: talentTestimonials,
      clientCaseStories: clientCaseStories,
      topics: topics.data.datasource_entries
    }
  }
  return (
    <>
    <main className={`${styles.main} home`} {...storyblokEditable}>
      <div 
        style={{
          "position": "absolute",
          "top": "0",
          "left": "0",
          "backgroundColor": "black",
          "color": "white",
        }}>
        {isEnabled ? "Draft" : "Published"} or what
        </div>
       <StoryblokStory story={homeData.data.story} />
    </main>
    </>
  );
}

async function fetchData() {
  const { isEnabled } = draftMode()
  return storyblokApi.get(`cdn/stories/home`, {
    "version": isEnabled ? "draft" : "published",
    "resolve_relations": "blogPosts.posts"
  }, {
    cache: isEnabled ? 'no-store' : 'default'
  });
}
async function fetchBlogPostsData() {
  return storyblokApi.get(`cdn/stories`, {
    "starts_with": "insights/",
    "is_startpage": false
  },)   
}
async function fetchTalentTestimonialData() {
  return getStoryblokApi().get(`cdn/stories/`, {
    "starts_with": "testimonials-clients/",
    "per_page": 5
  });
}
async function fetchClientsData() {
  return getStoryblokApi().get(`cdn/stories/`, {
    "starts_with": "our-clients/",
    "is_startpage": false
  });
}
async function fetchTopicData() {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/datasource_entries`, {
    "datasource": "topics",
  });
}