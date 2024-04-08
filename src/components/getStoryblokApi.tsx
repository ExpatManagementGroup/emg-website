import {
  StoryblokClient,
  apiPlugin,
  getStoryblokApi as getStoryblokApiDefault,
  storyblokInit
} from "@storyblok/react/rsc"

const storyblokApi: StoryblokClient | undefined = undefined

export const AppStoryblokInit = () => {
  storyblokInit({
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
    use: [apiPlugin],
  })

  return getStoryblokApiDefault()
}

export const getStoryblokApi = (): StoryblokClient => {
  if (storyblokApi !== undefined) return storyblokApi
  return AppStoryblokInit()
}