import { storyblokEditable, getStoryblokApi, storyblokInit, apiPlugin} from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import styles from "./page.module.css";

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
});

const storyblokApi = getStoryblokApi();

export default async function Home() {
  const homeData = await fetchData();
  const blogPosts = await fetchBlogPostsData();
  const talentData = await fetchTalentTestimonialData();
  const talentTestimonials = talentData.data.stories;
  const clientCases = await fetchClientsData();
  const clientCaseStories = clientCases.data.stories;
  homeData.data.story = {
    ...homeData.data.story,
    content: {
      ...homeData.data.story.content,
      blogPosts: blogPosts.data.stories,
      talentTestimonials: talentTestimonials,
      clientCaseStories: clientCaseStories
    }
  }
  return (
    <>
    <main className={styles.main} {...storyblokEditable}>
       <StoryblokStory story={homeData.data.story} />
    </main>
    </>
  );
}

async function fetchData() {
  return storyblokApi.get(`cdn/stories/home`, {
    "version": "draft",
    "resolve_relations": "blogPosts.posts"
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
    "starts_with": "testimonials/",
    "per_page": 5
  });
}
async function fetchClientsData() {
  return getStoryblokApi().get(`cdn/stories/`, {
    "starts_with": "client-cases/",
  });
}