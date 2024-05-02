import { storyblokEditable, getStoryblokApi, storyblokInit, apiPlugin} from "@storyblok/react/rsc";
import styles from "../../page.module.css";
import PostCard from "@/components/PostCard";
import Events from "@/components/Events";
import Link from "next/link";
import Pill from "@/components/ui/Pill";
import Pagination from "@/components/blog/Pagination";
import { notFound } from "next/navigation";

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
});

export default async function Archive({ params }: { params: { slug: string } }) {
  const archivepage = Number(params.slug.slice(5));
  if (isNaN(archivepage) || !archivepage) {
    notFound();
  }
  const { data, headers }: { data: any, headers: any} = await fetchData(archivepage);

  if (!data.stories.length) {
    notFound();
  }

  const allTopics = data.stories.map((story: any) => story.content.topic);
  //remove duplicated from allTopics
  const allTopicsOnce = [...new Set(allTopics)];
  const featuredStory = data.stories[0];
  const eventsData = await fetchEventsData();
  const events = eventsData.data.stories;
  const allTopicsData = await fetchTopicData();
  const totalPosts = Number(headers["total"]);
  const postsPerPage = Number(headers["per-page"])
  const totalAmountOfPages = Math.ceil(totalPosts / postsPerPage);
  const totalPages = Array.from({ length: totalAmountOfPages }, (_, i) => i + 1);
  const nextPage = totalAmountOfPages < archivepage ? archivepage + 1 : null;
  const prevPage = archivepage > 1 ? archivepage - 1 : null;

  return (
    <main className={styles.blogroll} {...storyblokEditable}>
      <h1 className={styles.archive_header}>Older Posts</h1>
      {/* <Pagination pages={totalPages} prevPage={prevPage} nextPage={nextPage} /> */}
      {/* <div className={styles.topics}>
        { allTopicsOnce.map((topic: any, index: number) => {
          let bgcolor = index === 0 ? 'Aero-Orange' :
                        index === 1 ? 'Citrus' :
                        index === 2 ? 'Ocean' :
                        index === 3 ? 'Sorbet' :
                        index === 4 ? 'Hazy-white' :
                        index === 5 ? 'White' :
                        index === 6 ? 'Ocean-Tone-3' : 'orange';
          const thisTopic = allTopicsData.data.datasource_entries.find((entry: any) => entry.value === topic);
          return (
            <Link href={`/insights/topics/${topic}`} key={topic}>
              <Pill bgcolor={`var(--EMG-${bgcolor}`}>
                {thisTopic.name}
              </Pill> 
            </Link>
          )
        })}
      </div> */}
      <div key={featuredStory.id} className={styles.blogroll_hero}>
        <PostCard
          featured_image_url={featuredStory.content.featured_image?.filename}
          featured_image_alt={featuredStory.content.featured_image?.alt}
          title={featuredStory.content.title}
          country={featuredStory.content.country}
          topicSlug={featuredStory.content.topic}
          topicName={allTopicsData.data.datasource_entries.find((entry: any) => entry.value === featuredStory.content.topic).name}
          date={featuredStory.content.date}
          slug={featuredStory.slug}
          isFeature={true}
          description={featuredStory.content.description}
          reading_time={featuredStory.content.reading_time}
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
                topicSlug={story.content.topic}
                topicName={allTopicsData.data.datasource_entries.find((entry: any) => entry.value === story.content.topic).name}
                date={story.content.date}
                slug={story.slug}
                reading_time={story.content.reading_time}
              />
            )
          }
        })}
      </div>
      <Pagination pages={totalPages} prevPage={prevPage} nextPage={nextPage} />
    </main>
  );
}

async function fetchData(archivepage: number) {
  const storyblokApi = getStoryblokApi();
  const data = storyblokApi.get(`cdn/stories`, {
    'starts_with': 'insights/', 
    'is_startpage': false,
    'version': "published",
    'sort_by': 'content.date:desc',
    'per_page': 17,
    'page': archivepage
  }, {
    cache: 'default',
  }).then(response => {
    return {
      data: response.data,
      headers: response.headers,
    }
  });
  return data;
}
async function fetchEventsData() {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories`, {
    'starts_with': 'events/', 
    'is_startpage': false,
    'version': "published",
  });
}
async function fetchTopicData() {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/datasource_entries`, {
    "datasource": "topics",
  });
}