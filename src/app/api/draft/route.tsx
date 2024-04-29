// route handler enabling draft mode
import { draftMode, cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getStoryblokApi, storyblokInit, apiPlugin } from '@storyblok/react/rsc'

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
});
 
export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  //Check if the secret is correct and next parameters are present
  if (secret !== process.env.STORYBLOK_PREVIEW_TOKEN) {
    return new Response(`Unauthorized you buffoon`, { status: 401 })
  }
  let searchslug = slug
  if ( slug === '/netherlands' 
       || slug === '/belgium' 
       || slug === '/germany' 
       || slug === '/luxembourg' 
       || slug === '/global'
  ) {
    searchslug = `/locations/${slug}`
  }
  if (!slug) {
    searchslug = 'home'
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS
  const post = await getStoryblokApi().get(`cdn/stories/${searchslug}`, {
    version: 'draft'
  })

  // If the slug doesn't exist prevent draft mode from being enabled
  if (!post) {
    return new Response('Invalid slug', { status: 401 })
  }

  // Enable Draft Mode by setting the cookie
  draftMode().enable()

  const draft = cookies().get('__prerender_bypass')
    
  cookies().set('__prerender_bypass', draft?.value || '', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      path: '/',
  });
 
  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  if (!slug) {
    redirect(`/`)
  } else {
    redirect(`/${post.data.story.slug}`)
  }
}