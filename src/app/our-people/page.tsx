import { storyblokEditable, getStoryblokApi, StoryblokComponent } from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import styles from "../page.module.css";
import { draftMode } from "next/headers";
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
  const pagedata = await fetchData()
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

const storyblokApi = getStoryblokApi();

export default async function OurPeople() {
  const ourPeopleData = await fetchData();
  const countriesData = await fetchCountryData();
  const employees = await fetchEmployeesData();
  ourPeopleData.data.story = {
    ...ourPeopleData.data.story,
    content: {
      ...ourPeopleData.data.story.content,
      employees: employees.data.stories,
      countries: countriesData.data.datasource_entries,
    }
  }
  const { isEnabled } = draftMode()
  return (
    <>
    <main className={`${styles.main} home`} {...storyblokEditable}>
      { isEnabled && 
        <StoryblokStory story={ourPeopleData.data.story} />
      }
      { !isEnabled &&
        <StoryblokComponent blok={ourPeopleData.data.story.content} />
      }
    </main>
    </>
  );
}

async function fetchData() {
  const { isEnabled } = draftMode()
  return storyblokApi.get(`cdn/stories/our-people`, {
    "version": isEnabled ? "draft" : "published",
  }, {
    cache: isEnabled ? 'no-store' : 'default'
  });
}
async function fetchEmployeesData() {
  const { isEnabled } = draftMode()
  return storyblokApi.get(`cdn/stories`, {
    "version": isEnabled ? "draft" : "published",
    "starts_with": "our-people/",
    "content_type": "employee",
  })   
}
async function fetchCountryData() {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/datasource_entries`, {
    "datasource": "countries",
    "per_page": 1000,
  });
}