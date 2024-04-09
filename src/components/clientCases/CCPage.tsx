import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
 
const Page = ({ blok }: { blok: any }) => (
  <>
  <div {...storyblokEditable(blok)}>
    {blok.body.map((nestedBlok: any) => { 
      if (nestedBlok.component === "case_talent") {
        nestedBlok.allTestimonials = blok.allTestimonials;
      }
      return (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      )
    })}
  </div>
  </>
);
 
export default Page;