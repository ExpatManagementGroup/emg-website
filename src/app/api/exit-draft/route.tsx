import { draftMode, cookies } from 'next/headers';
import { getStoryblokApi, storyblokInit, apiPlugin } from '@storyblok/react'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  (await draftMode()).disable();
  
  const cookieStore = await cookies();
  const cookie = cookieStore.get("__prerender_bypass")!;
  (await cookies()).set({
    name: "__prerender_bypass",
    value: cookie?.value,
    expires: new Date(0), // Set expiration date to the past
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "none",
  });

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

  // return new Response('', {
  //   status: 200,
  //   headers: {
  //     Location: `/${slug}`,
  //   },
  // })
  // return new Response('Exited Draft mode, please switch back to the editing URL', { status: 200 })
  if (!slug) {
    redirect(`/`)
  } else {
    redirect(`/${post.full_slug}`)
  }
}