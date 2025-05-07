import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
 
const Page = ({ blok }: { blok: any }) => (
  <div className="blocks" {...storyblokEditable(blok)}>
    { blok.body?.map((nestedBlok: any) => {
      if (nestedBlok.component === "blog_slider") {
        nestedBlok.blogPosts = blok.blogPosts;
        nestedBlok.alltopics = blok.topics;
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
      else if (nestedBlok.component === "our_clients_feed") {
        nestedBlok.clientCaseStories = blok.clientCaseStories;
        return <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      }
      else if (nestedBlok.component === "our_people_list") {
        nestedBlok.employees = blok.employees;
        nestedBlok.countries = blok.countries;
        return <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      }
      else if (nestedBlok.component === "work_with_us_jobfeed") {
        nestedBlok.jobs = blok.jobs;
        nestedBlok.countries = blok.countries;
        return <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      }
      else if (nestedBlok.component === "work_with_us_testimonials") {
        nestedBlok.testimonials = blok.testimonials;
        // nestedBlok.countries = blok.countries;
        return <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      }
      else { 
        return <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} /> 
      }
    })} 
    {/* <pre>{JSON.stringify(blok.blogPosts, null, 1)}</pre> */}
  </div>
);
 
export default Page;