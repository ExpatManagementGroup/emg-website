import { storyblokEditable, getStoryblokApi, storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import styles from "../page.module.css";
import { count } from "console";

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
});

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
  return (
    <>
    <main className={`${styles.main} home`} {...storyblokEditable}>
       <StoryblokStory story={ourPeopleData.data.story} />
    </main>
    </>
  );
}

async function fetchData() {
  return storyblokApi.get(`cdn/stories/our-people`, {
    "version": "draft",
  }, {
    cache: 'no-store'
  });
}
async function fetchEmployeesData() {
  return storyblokApi.get(`cdn/stories`, {
    "version": "draft",
    "starts_with": "our-people/",
    "content_type": "employee",
  },)   
}
async function fetchCountryData() {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/datasource_entries`, {
    "datasource": "countries",
    "per_page": 1000,
  });
}