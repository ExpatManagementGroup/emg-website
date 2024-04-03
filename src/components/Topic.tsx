import { getStoryblokApi } from "@storyblok/react/rsc";

export default async function Topic(props: {name: string}) {
  
  const navData = await fetchTopicData();
  const topic = navData.data.datasource_entries.find((entry:any) => entry.value === props.name);
  if (!topic) return null;

  return (
    <> {topic.name} </>
  )
}

export async function fetchTopicData() {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/datasource_entries`, {
    "datasource": "topics",
  });
}