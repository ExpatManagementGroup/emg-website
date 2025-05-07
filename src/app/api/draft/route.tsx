// route handler enabling draft mode
import { draftMode, cookies } from 'next/headers'
import { getStoryblokApi, storyblokInit, apiPlugin } from '@storyblok/react'
import { redirect } from 'next/navigation'

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN || process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
  use: [apiPlugin]
});
 
export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  //Check if the secret is correct and next parameters are present
  if (secret !== process.env.STORYBLOK_PREVIEW_TOKEN && secret !== process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN ) {
    return new Response(`Unauthorized you buffoon`, { status: 401 })
  }
  let searchslug = slug
  if ( slug === 'netherlands' 
       || slug === 'belgium' 
       || slug === 'germany' 
       || slug === 'luxembourg' 
       || slug === 'global'
  ) {
    searchslug = `locations/${slug}`
  }
  if (!slug) {
    searchslug = 'home'
  }


  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS
  const posts = await getStoryblokApi().get(`cdn/stories`, {
    'starts_with': searchslug || 'immigration',
    version: 'draft'
  })

  
  const post = posts.data.stories[0]
  // return new Response(JSON.stringify(post, null, 2))

  // If the slug doesn't exist prevent draft mode from being enabled
  if (!post) {
    return new Response(`Invalid slug: ${slug}`, { status: 401 })
  }

  // Enable Draft Mode by setting the cookie
  (await draftMode()).enable()

  // Get the cookie instance first
  const cookieStore = await cookies()
  const draftCookie = cookieStore.get('__prerender_bypass')
    
  // Then set it with the proper value handling
  cookieStore.set('__prerender_bypass', draftCookie?.value || '', {
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
    redirect(`/${post.full_slug}`)
  }
  // return new Response('Draft mode enabled, please switch back to the editing URL, you should see a little red \'draft mode\' in the top left of the screen', { status: 200 })
}