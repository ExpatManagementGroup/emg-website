"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import { ReactNode } from "react"; // Import ReactNode type
 
import Page from "./pages/Page";
import Post_1 from "./pages/Post_1"; 
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
import CCPage from "./clientCases/CCPage";
import CCHeader from "./clientCases/CCHeader";
import CCAbout from "./clientCases/CCAbout";
import CCTestimonial from "./clientCases/CCTestimonial";
import CCTalent from "./clientCases/CCTalent";
import CCOtherCases from "./clientCases/CCOtherCases";
import BlogSlider from "./blog/BlogSlider";

const components = {
  page: Page,
  post_one: Post_1,
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
  our_story_hero: OurStoryHero,
  our_story_intro: OurStoryIntro,
  our_story_journey: OurStoryJourney,
  our_story_journey_step: OurStoryJourneyStep,
  our_story_journey_step_last: OurStoryJourneyStepLast,
  blog_slider: BlogSlider,
  client_case: CCPage,
  case_header: CCHeader,
  case_about: CCAbout,
  case_testimonial: CCTestimonial,
  case_talent: CCTalent,
  case_othercases: CCOtherCases

};


storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  components
});
 
export default function StoryblokProvider({ children }: { children: ReactNode }) { 
  return children;
}