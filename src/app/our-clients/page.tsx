import { ISbStoriesParams, storyblokEditable, getStoryblokApi, storyblokInit, apiPlugin} from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import styles from "../page.module.css";

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
});

export default async function Slug({ params }: { params: { slug: string } }) {

  const slugData  = await fetchSlugData();
  const clientCaseStories = await fetchClientsData();
  const talentData = await fetchTalentTestimonialData();

  slugData.data.story = {
    ...slugData.data.story,
    content: {
      ...slugData.data.story.content,
      clientCaseStories: clientCaseStories.data.stories,
      talentTestimonials: talentData.data.stories
    }
  }

  return (
    <>
    <main className={`${styles.main} our_clients`} {...storyblokEditable}>
       <StoryblokStory story={slugData.data.story} />
    </main>
    </>
  );
}

async function fetchSlugData() {
  return getStoryblokApi().get(`cdn/stories/our-clients`, { 
    // 'is_startpage': true,
    'version': "draft" 
  }, {
    cache: 'no-store'
  } );
}
async function fetchClientsData() {
  return getStoryblokApi().get(`cdn/stories`, {
    "starts_with": "our-clients/",
    "is_startpage": false,
    "version": "draft"
  });
}
async function fetchTalentTestimonialData() {
  return getStoryblokApi().get(`cdn/stories/`, {
    "starts_with": "testimonials-clients/",
    "per_page": 5
  });
}