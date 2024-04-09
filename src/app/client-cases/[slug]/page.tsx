import { ISbStoriesParams, storyblokEditable, getStoryblokApi, storyblokInit, apiPlugin} from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import styles from "../../page.module.css";
import CCOtherCases from "@/components/clientCases/CCOtherCases";

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
});

export default async function Slug({ params }: { params: { slug: string } }) {

  const page = await fetchData(params.slug);
  const othercases = await fetchOtherCCDataExcluding(params.slug);
  const fetchedTestimonials = await fetchTestimonialData();
  page.data.story = {
    ...page.data.story,
    content: {
      ...page.data.story.content,
      allTestimonials: fetchedTestimonials.data.stories || ['dbd']
    }
  }
  
  return (
    <>
    <main className={styles.main} {...storyblokEditable}>
      {/* {JSON.stringify(page.data.story)} */}
      <StoryblokStory story={page.data.story} />
      <CCOtherCases stories={othercases.data.stories} />
    </main>
    </>
  );
}

async function fetchData(slug: string) {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/client-cases/${slug}`, {
    "version": "draft"
  });
}
async function fetchOtherCCDataExcluding(slug:string) {
  return getStoryblokApi().get(`cdn/stories`, {
    "starts_with": "client-cases/",
    "excluding_slugs": `client-cases/${slug}`
  });
}
async function fetchTestimonialData() {
  return getStoryblokApi().get(`cdn/stories`, {
    "starts_with": "testimonials/",
    "per_page": 5
  });
}