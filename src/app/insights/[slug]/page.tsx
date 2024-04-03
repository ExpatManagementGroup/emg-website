import { ISbStoriesParams, storyblokEditable, getStoryblokApi} from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import styles from "./page.module.css";


export default async function Slug({ params }: { params: { slug: string } }) {

  const { data } = await fetchData(params.slug);
  
  return (
    <>
    <main className={styles.main} {...storyblokEditable}>
       <StoryblokStory story={data.story} />
    </main>
    </>
  );
}

export async function fetchData(slug: string) {
  let sbParams: ISbStoriesParams = { version: "draft" };
 
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/insights/${slug}`, sbParams, {cache: "no-store"});
}


