import { storyblokEditable, getStoryblokApi, storyblokInit, apiPlugin} from "@storyblok/react/rsc";
import styles from "./page.module.css";
import PostCard from "@/components/PostCard";
import Events from "@/components/Events";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import InitSB from "@/components/initSB";

InitSB();

export async function generateStaticParams() {
  const storyblokApi = getStoryblokApi();
  const topicsData = await storyblokApi.get(`cdn/datasource_entries`, {
    "datasource": "topics",
  });
  return topicsData.data.datasource_entries.map((entry: any) => ({
    params: {
      slug: entry.value,
    },
  }));
}


export default async function TopicsPosts(props: { params: { slug: string } }) {
  const { data } = await fetchData();
  const slug = props.params.slug[0];

  const filteredStories = data.stories.filter((story: any) => story.content.topic === slug);
  

  const allTopics = data.stories.map((story: any) => story.content.topic);
  //remove duplicated from allTopics
  const allTopicsOnce = [...new Set(allTopics)];
  const featuredStory = filteredStories[0];

  if (!featuredStory) {
    notFound();
  }

  const eventsData = await fetchEventsData();
  const events = eventsData.data.stories;

  const allTopicsData = await fetchTopicData();
  
  return (
    <>
    <main className={styles.blogroll} {...storyblokEditable}>

      <div className={styles.topics}>
        <h1>{allTopicsData.data.datasource_entries.find((entry: any) => entry.value === slug)?.name}</h1>
      </div>
      { featuredStory && 
        <div key={featuredStory.id} className={styles.blogroll_hero}>
          <PostCard
            featured_image_url={featuredStory.content.featured_image?.filename}
            featured_image_alt={featuredStory.content.featured_image?.alt}
            title={featuredStory.content.title}
            country={featuredStory.content.country}
            topicSlug={featuredStory.content.topic}
            topicName={allTopicsData.data.datasource_entries.find((entry: any) => entry.value === featuredStory.content.topic)?.name}
            date={featuredStory.content.date}
            slug={featuredStory.slug}
            isFeature={true}
            description={featuredStory.content.description}
          />
          <div className={styles.blogroll_hero_events}>
            <Events data={events} />
          </div>
        </div>
      }
      <div className={styles.post_list}>
        { filteredStories.map((story: any, index: number) => {
          if (index !== 0) {
            return (
              <PostCard
                key={story.id}
                featured_image_url={story.content.featured_image.filename}
                featured_image_alt={story.content.featured_image.alt}
                title={story.content.title}
                country={story.content.country}
                topicSlug={story.content.topic}
                topicName={allTopicsData.data.datasource_entries.find((entry: any) => entry.value === story.content.topic)?.name}
                date={story.content.date}
                slug={story.slug}
              />
          )
          }
        })}
      </div>


       {/* <pre style={{ 'paddingTop': '100px' }}>{JSON.stringify(filteredStories, null, 2)}</pre> */}
    </main>
    </>
  );
}

async function fetchData() {
  const isEnabled = draftMode().isEnabled;
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories`, {
    'starts_with': 'insights/', 
    'is_startpage': false,
    'version': isEnabled ? "draft" : "published",
  }, {
    cache: isEnabled ? 'no-store' : 'default'
  } );
}
async function fetchEventsData() {
  const isEnabled = draftMode().isEnabled;
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories`, {
    'starts_with': 'events/', 
    'is_startpage': false,
    'version': isEnabled ? "draft" : "published",
  }, {
    cache: isEnabled ? 'no-store' : 'default'
  } );
}
async function fetchTopicData() {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/datasource_entries`, {
    "datasource": "topics",
  });
}