import { storyblokEditable, getStoryblokApi} from "@storyblok/react/rsc";
import styles from "./page.module.css";
import Topic from "@/components/Topic";
import PostCard from "@/components/PostCard";
import Events from "@/components/Events";

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

  const eventsData = await fetchEventsData();
  const events = eventsData.data.stories;
  
  return (
    <>
    <main className={styles.blogroll} {...storyblokEditable}>

      <div className={styles.topics}>
        <h1><Topic name={slug} /></h1>
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
        { filteredStories.map((story: any, index: number) => {
          if (index !== 0) {
            return (
              <>
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
              </>
          )
          }
        })}
      </div>


       {/* <pre style={{ 'paddingTop': '100px' }}>{JSON.stringify(filteredStories, null, 2)}</pre> */}
    </main>
    </>
  );
}

export async function fetchData() {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories`, {
    'starts_with': 'insights/', 
    'is_startpage': false,
  }, {cache: "no-store"});
}
export async function fetchEventsData() {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories`, {'starts_with': 'events/', 'is_startpage': false}, {cache: "no-store"});
}

