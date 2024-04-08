import { storyblokEditable, getStoryblokApi, storyblokInit, apiPlugin} from "@storyblok/react/rsc";
import styles from "./page.module.css";
import Topic from "@/components/Topic";
import PostCard from "@/components/PostCard";
import Events from "@/components/Events";
import Link from "next/link";
import Pill from "@/components/Pill";

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
});

export default async function Home() {
  const { data } = await fetchData();
  const allTopics = data.stories.map((story: any) => story.content.topic);
  //remove duplicated from allTopics
  const allTopicsOnce = [...new Set(allTopics)];
  const featuredStory = data.stories[0];

  const eventsData = await fetchEventsData();
  const events = eventsData.data.stories;
  
  return (
    <>
    <main className={styles.blogroll} {...storyblokEditable}>

      <div className={styles.topics}>
        { allTopicsOnce.map((topic: any, index: number) => {
          let bgcolor = index === 0 ? 'Aero-Orange' :
                      index === 1 ? 'Citrus' :
                      index === 2 ? 'Ocean' :
                      index === 3 ? 'Sorbet' :
                      index === 4 ? 'Hazy-white' :
                      index === 5 ? 'White' :
                      index === 6 ? 'Ocean-Tone-3' : 'orange';
          return (
            <Link href={`/insights/topics/${topic}`} key={topic}>
              <Pill bgcolor={`var(--EMG-${bgcolor}`}>
                <Topic name={topic}/>
              </Pill> 
            </Link>
          )
        })}
      </div>
      <div key={featuredStory.id} className={styles.blogroll_hero}>
        <PostCard
          featured_image_url={featuredStory.content.featured_image?.filename}
          featured_image_alt={featuredStory.content.featured_image?.alt}
          title={featuredStory.content.title}
          country={featuredStory.content.country}
          topic={featuredStory.content.topic}
          date={featuredStory.content.date}
          slug={featuredStory.slug}
          isFeature={true}
          description={featuredStory.content.description}
        />
        <div className={styles.blogroll_hero_events}>
          <Events data={events} />
        </div>
      </div>
      <div className={styles.post_list}>
        { data.stories.map((story: any, index: number) => {
          if (index !== 0) {
            return (
              <PostCard
                key={story.id}
                featured_image_url={story.content.featured_image.filename}
                featured_image_alt={story.content.featured_image.alt}
                title={story.content.title}
                country={story.content.country}
                topic={story.content.topic}
                date={story.content.date}
                slug={story.slug}
              />
            )
          }
        })}
      </div>
       {/* <pre style={{ 'paddingTop': '100px' }}>{JSON.stringify(data.stories, null, 2)}</pre> */}
    </main>
    </>
  );
}

async function fetchData() {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories`, {'starts_with': 'insights/', 'is_startpage': false} );
}
async function fetchEventsData() {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories`, {'starts_with': 'events/', 'is_startpage': false} );
}


