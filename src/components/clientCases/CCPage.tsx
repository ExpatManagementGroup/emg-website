import { storyblokEditable } from "@storyblok/react";
import { StoryblokServerComponent } from '@storyblok/react/rsc';
 
const CCPage = ({ blok }: { blok: any }) => (
  <>
  <div {...storyblokEditable(blok)}>
    {blok.body.map((nestedBlok: any) => { 
      if (nestedBlok.component === "case_talent") {
        nestedBlok.allTestimonials = blok.allTestimonials;
      }
      return (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      )
    })}
  </div>
  </>
);
 
export default CCPage;