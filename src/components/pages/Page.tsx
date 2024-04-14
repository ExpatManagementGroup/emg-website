import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
 
const Page = ({ blok }: { blok: any }) => (
  <>
  <div {...storyblokEditable(blok)}>
    { blok.body?.map((nestedBlok: any) => {
      if (nestedBlok.component === "blog_slider") {
        nestedBlok.blogPosts = blok.blogPosts;
        nestedBlok.topics = blok.topics;
        return <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      }
      else if (nestedBlok.component === "home_testimonials") {
        nestedBlok.talentTestimonials = blok.talentTestimonials;
        nestedBlok.clientCaseStories = blok.clientCaseStories;
        return <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      }
      else if (nestedBlok.component === "home_client_logos") {
        nestedBlok.clientCaseStories = blok.clientCaseStories;
        return <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      }
      else { 
        return <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} /> 
      }
    })} 
    {/* <pre>{JSON.stringify(blok.blogPosts, null, 1)}</pre> */}
  </div>
  </>
);
 
export default Page;