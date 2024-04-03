import CCTalentDisplay from './CCTalentDisplay'
import { getStoryblokApi, storyblokEditable } from '@storyblok/react/rsc';

export default async function CCTalent( { blok }: { blok: any }) {
  const testimonialUuids = blok.testimonials.join(',')
  const { data } = await fetchData(testimonialUuids);
  return (
    <div {...storyblokEditable(blok)}>
      <CCTalentDisplay blok={blok} data={data} />
    </div>
  )
}

async function fetchData(uuids: string) {
  return getStoryblokApi().get(`cdn/stories/`, {
    'by_uuids': uuids,
  }, {cache: "no-store"});
}