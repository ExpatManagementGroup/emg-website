"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import { ReactNode } from "react"; // Import ReactNode type
import Page from "./pages/Page";
import PageHero from "./PageHero";
import PageTextblock from "./PageTextblock";
import PageQuote from "./PageQuote";
import PageHeadline from "./PageHeadline";
import PageRelocationServices from "./PageRelocationServices";
import PageRelocationMoreCountries from "./PageRelocationMoreCountries";
import PageImmigrationServices from "./PageImmigrationServices";
import PageBreak from "./PageBreak";
import Post_1 from "./pages/Post_1"; 
import Job from "./pages/Job";
import Employee from "./pages/Employee";
import Navigation from "./Navigation";
import HomeHero from "./home/HomeHero";
import HomeWhatWeDo from "./home/HomeWhatWeDo";
import HomeServices from "./home/HomeServices";
import HomeProcess from "./home/HomeProcess";
import HomeStats from "./home/HomeStats";
import HomeTestimonials from "./home/HomeTestimonials";
import HomeClientLogos from "./home/HomeClientLogos";
import HomeFAQs from "./home/HomeFAQs";
import HomeMembers from "./home/HomeMembers";
import OurStoryHero from "./our_story/OurStoryHero";
import OurStoryIntro from "./our_story/OurStoryIntro";
import OurStoryJourney from "./our_story/OurStoryJourney";
import OurStoryJourneyStep from "./our_story/OurStoryJourneyStep";
import OurStoryJourneyStepLast from "./our_story/OurStoryJourneyStepLast";
import OurClientsFeed from "./our_clients/OurClientsFeed";
import OurClientsValues from "./our_clients/OurClientsValues";
import OurClientsStats from "./our_clients/OurClientsStats";
import OurPeopleList from "./our_people/OurPeopleList";
import OurPeopleFooter from "./our_people/OurPeopleFooter";
import CCPage from "./clientCases/CCPage";
import CCHeader from "./clientCases/CCHeader";
import CCAbout from "./clientCases/CCAbout";
import CCTestimonial from "./clientCases/CCTestimonial";
import CCTalent from "./clientCases/CCTalent";
import CCOtherCases from "./clientCases/CCOtherCases";
import BlogSlider from "./blog/BlogSlider";
import WorkWithUsJobFeed from "./work_with_us/WorkWithUsJobfeed";
import WorkWithUsTestimonials from "./work_with_us/WorkWithUsTestimonials";
import WorkWithUsBenefits from "./work_with_us/WorkWithUsBenefits";
import OurCultureIntro from "./our_culture/OurCultureIntro";
import OurCultureDiversity from "./our_culture/OurCultureDiversity";
import OurCultureCommunity from "./our_culture/OurCultureCommunity";
import FAQHero from "./faq/FAQHero";
import FAQLists from "./faq/FAQLists";
import ContactUs from "./pages/ContactUs";
import LocationHero from "./locations/LocationHero";
import LocationOffice from "./locations/LocationOffice";
import LocationServices from "./locations/LocationServices";
import LocationTextAndImage from "./locations/LocationTextAndImage";

const components = {
  page: Page,
  page_hero: PageHero,
  page_textblock: PageTextblock,
  page_quote: PageQuote,
  page_headline: PageHeadline,
  page_relocation_services: PageRelocationServices,
  page_immigration_services: PageImmigrationServices,
  page_break: PageBreak,
  relocation_more_countries: PageRelocationMoreCountries,
  post_one: Post_1,
  job: Job,
  employee: Employee,
  navigation: Navigation,
  hero_home: HomeHero,
  home_what_we_do: HomeWhatWeDo,
  home_services: HomeServices,
  home_process: HomeProcess,
  home_stats: HomeStats,
  home_testimonials: HomeTestimonials,
  home_client_logos: HomeClientLogos,
  home_faqs: HomeFAQs,
  home_members: HomeMembers,
  our_clients_feed: OurClientsFeed,
  our_clients_values: OurClientsValues,
  our_clients_stats: OurClientsStats,
  our_story_hero: OurStoryHero,
  our_story_intro: OurStoryIntro,
  our_story_journey: OurStoryJourney,
  our_story_journey_step: OurStoryJourneyStep,
  our_story_journey_step_last: OurStoryJourneyStepLast,
  our_people_list: OurPeopleList,
  our_people_footer: OurPeopleFooter,
  our_culture_intro: OurCultureIntro,
  our_culture_diversity: OurCultureDiversity,
  our_culture_community: OurCultureCommunity,
  work_with_us_jobfeed: WorkWithUsJobFeed,
  work_with_us_testimonials: WorkWithUsTestimonials,
  work_with_us_benefits: WorkWithUsBenefits,
  blog_slider: BlogSlider,
  client_case: CCPage,
  case_header: CCHeader,
  case_about: CCAbout,
  case_testimonial: CCTestimonial,
  case_talent: CCTalent,
  case_othercases: CCOtherCases,
  faq_hero: FAQHero,
  faq_lists: FAQLists,
  contact_us: ContactUs,
  location_hero: LocationHero,
  location_office: LocationOffice,
  location_services: LocationServices,
  location_text_and_image: LocationTextAndImage
};

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  components
});
 
export default function StoryblokProvider({ children }: { children: ReactNode }) { 
  return children;
}