import CCTalentDisplay from './CCTalentDisplay'
import { storyblokEditable } from '@storyblok/react/rsc';

export default function CCTalent( { blok }: { blok: any }) {

  const allTestimonials = blok.allTestimonials;
  const testimonialUuids = blok.testimonials.join(',')
  const chosenTestimonials = allTestimonials.filter((testimonial: any) => testimonialUuids.includes(testimonial.uuid))

  return (
    <div {...storyblokEditable(blok)}>
      {/* {JSON.stringify(chosenTestimonials, null, 2)} */}
      <CCTalentDisplay blok={blok} data={chosenTestimonials} />
    </div>
  )
}