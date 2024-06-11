import { storyblokEditable, getStoryblokApi } from "@storyblok/react/rsc";
import styles from "./page.module.css";
import PostCard from "@/components/PostCard";
import Events from "@/components/Events";
import Link from "next/link";
import Pill from "@/components/ui/Pill";
import { draftMode } from "next/headers";
import Pagination from "@/components/blog/Pagination";
import Search from "@/components/ui/Search";
import Seachresults from "@/components/ui/Searchresults";
import SearchresultsLoading from "@/components/ui/SearchresultsLoading";
import { Suspense } from "react";
import { Metadata, ResolvingMetadata } from 'next'
import InitSB from "@/components/initSB";

InitSB();

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
 
  // fetch data
  const pagedata = await fetchSlugData()
  const metadata = {
    title: pagedata.data.story.content.meta_title,
    description: pagedata.data.story.content.meta_description,
    ogimage: pagedata.data.story.content.og_image?.filename ? `${pagedata.data.story.content.og_image.filename}/m/1200x630/smart/filters:format(jpg)` : '',
  }
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  const ogimg = { url: metadata.ogimage, width: 1200, height: 630 }
 
  return {
    title: metadata.title || (await parent).title,
    description: metadata.description || (await parent).description,
    openGraph: {
      images: [ogimg, ...previousImages],
    },
  }
}

export default async function Home({searchParams}:{searchParams?: {
  query?: string;
  page?: string;
}}) {

  const query = searchParams?.query || '';
  const keystring = `search=${searchParams?.query}`;

  const { data, headers }: { data: any, headers: any} = await fetchData();
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

  return (
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
          const thisTopic = allTopicsData.data.datasource_entries.find((entry: any) => entry.value === topic);
          return (
            <Link href={`/insights/topics/${topic}`} key={topic}>
              <Pill bgcolor={`var(--EMG-${bgcolor}`}>
                {thisTopic.name ? thisTopic.name : 'no topic'}
              </Pill> 
            </Link>
          )
        })}
      </div>
      <Search placeholder="Search" query={query} />
      <Suspense 
        key={keystring} 
        fallback={ query != '' && <SearchresultsLoading /> }
      >
        <Seachresults searchTerm={query} />
      </Suspense>
      <div key={featuredStory.id} className={styles.blogroll_hero}>
        <PostCard
          featured_image_url={featuredStory.content.featured_image?.filename}
          featured_image_alt={featuredStory.content.featured_image?.alt}
          title={featuredStory.content.title}
          country={featuredStory.content.country}
          topicSlug={featuredStory.content.topic}
          // topicName={allTopicsData.data.datasource_entries.find((entry: any) => entry.value === featuredStory.content.topic)?.name}
          topicName="no topic"
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
            const hasTopic = allTopicsData.data.datasource_entries.find((topic: any) => topic.value === story.content.topic)
            const thisTopicName = hasTopic ? hasTopic.name : 'no topic'
            return (
              <PostCard
                key={story.id}
                featured_image_url={story.content.featured_image.filename}
                featured_image_alt={story.content.featured_image.alt}
                title={story.content.title}
                country={story.content.country}
                topicSlug={story.content.topic}
                // topicName={allTopicsData.data.datasource_entries.find((entry: any) => entry.value === story.content.topic)?.name}
                topicName={thisTopicName}
                date={story.content.date}
                slug={story.slug}
                reading_time={story.content.reading_time}
              />
            )
          }
        })}
      </div>
      <Pagination pages={totalPages} nextPage={2} />
    </main>
  );
}

async function fetchData() {
  const { isEnabled } = draftMode()
  const storyblokApi = getStoryblokApi();
  const data = storyblokApi.get(`cdn/stories`, {
    'starts_with': 'insights/', 
    'is_startpage': false,
    'version': isEnabled ? "draft" : "published",
    'per_page': 17,
    'sort_by': 'content.date:desc'
  }, {
    cache: isEnabled ? 'no-store' : 'default',
  }).then(response => {
    return {
      data: response.data,
      headers: response.headers,
    }
  });
  return data;
}
async function fetchEventsData() {
  const { isEnabled } = draftMode()
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories`, {
    'starts_with': 'events/', 
    'is_startpage': false,
    'version': isEnabled ? "draft" : "published",
  }, {
    cache: isEnabled ? 'no-store' : 'default'
  });
}
async function fetchTopicData() {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/datasource_entries`, {
    "datasource": "topics",
  });
}

async function fetchSlugData() {
  const { isEnabled } = draftMode()
  return getStoryblokApi().get(`cdn/stories/insights`, { 
    version: isEnabled ? "draft" : "published"
  }, {
    cache: isEnabled ? 'no-store' : 'default'
  } );
}