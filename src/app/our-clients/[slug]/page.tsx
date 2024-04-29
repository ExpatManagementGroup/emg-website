import { storyblokEditable, getStoryblokApi, storyblokInit, apiPlugin} from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import styles from "../../page.module.css";
import CCOtherCases from "@/components/clientCases/CCOtherCases";
import { draftMode } from "next/headers";

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
      <StoryblokStory story={page.data.story} />
      <CCOtherCases stories={othercases.data.stories} />
    </main>
    </>
  );
}

async function fetchData(slug: string) {
  const { isEnabled } = draftMode();
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/our-clients/${slug}`, {
    "version": isEnabled ? "draft" : "published"
  }, {
    cache: isEnabled ? 'no-store' : 'default'
  });
}
async function fetchOtherCCDataExcluding(slug:string) {
  const { isEnabled } = draftMode();
  return getStoryblokApi().get(`cdn/stories`, {
    "starts_with": "our-clients/",
    "is_startpage": false,
    "excluding_slugs": `our-clients/${slug}`,
    "version": isEnabled ? "draft" : "published"
  }, {
    cache: isEnabled ? 'no-store' : 'default'
  });
}
async function fetchTestimonialData() {
  const { isEnabled } = draftMode();
  return getStoryblokApi().get(`cdn/stories`, {
    "starts_with": "testimonials-clients/",
    "per_page": 5,
    "version": isEnabled ? "draft" : "published"
  }, {
    cache: isEnabled ? 'no-store' : 'default'
  });
}