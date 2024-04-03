import { ISbStoriesParams, storyblokEditable, getStoryblokApi} from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import styles from "../../page.module.css";
import CCOtherCases from "@/components/clientCases/CCOtherCases";

export default async function Slug({ params }: { params: { slug: string } }) {

  const { data } = await fetchData(params.slug);
  const othercases = await fetchOtherCCDataExcluding(params.slug);
  
  return (
    <>
    <main className={styles.main} {...storyblokEditable}>
       <StoryblokStory story={data.story} />
       {/* {JSON.stringify(data.story)} */}
        <CCOtherCases stories={othercases} />
    </main>
    </>
  );
}

async function fetchData(slug: string) {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/client-cases/${slug}`, {
    "version": "draft"
  }, {cache: "no-store"});
}

async function fetchOtherCCDataExcluding(slug:string) {
  return getStoryblokApi().get(`cdn/stories`, {
    "starts_with": "client-cases/",
    "excluding_slugs": `client-cases/${slug}`
  }, {cache: "no-store"});
}
