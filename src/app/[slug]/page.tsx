import { ISbStoriesParams, storyblokEditable, getStoryblokApi, storyblokInit, apiPlugin} from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import styles from "../page.module.css";
import { draftMode } from 'next/headers'

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
});

export default async function Slug({ params }: { params: { slug: string } }) {
  const { isEnabled } = draftMode()
  const thisSlug = params.slug;
  const slugData  = await fetchSlugData(params.slug);
  const blogPosts = await fetchBlogPostsData();

  slugData.data.story = {
    ...slugData.data.story,
    content: {
      ...slugData.data.story.content,
      blogPosts: blogPosts.data.stories,
    }
  }

  return (
    <>
    <main className={`${styles.main} ${thisSlug}`} {...storyblokEditable}>
    <div 
      style={{
        "position": "absolute",
        "top": "0",
        "left": "0",
        "backgroundColor": "black",
        "color": "white",
      }}>
      {isEnabled ? "Draft" : "Published"} or why {draftMode().isEnabled ? "Enabled" : "Disabled"}
      </div>
       <StoryblokStory story={slugData.data.story} />
    </main>
    </>
  );
}

async function fetchSlugData(slug: string) {
  
  if ( slug === 'netherlands' || slug === 'belgium' || slug === 'germany' || slug === 'luxembourg' || slug === 'global') {
    return getStoryblokApi().get(`cdn/stories/locations/${slug}`, { 
      version: "draft" 
    }, {
      cache: 'no-store'
    } );
  }
  else {
    return getStoryblokApi().get(`cdn/stories/${slug}`, { 
      version: "draft" 
    }, {
      cache: 'no-store'
    } );
  }
}
async function fetchBlogPostsData() {
  return getStoryblokApi().get(`cdn/stories`, {
    "starts_with": "insights/",
    "is_startpage": false
  },)   
}