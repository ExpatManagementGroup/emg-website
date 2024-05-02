import { draftMode, cookies } from 'next/headers';

export async function GET(request: Request) {
  
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  draftMode().disable();
  
  const cookieStore = cookies();
  const cookie = cookieStore.get("__prerender_bypass")!;
  cookies().set({
    name: "__prerender_bypass",
    value: cookie?.value,
    expires: new Date(0), // Set expiration date to the past
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "none",
  });



  // return new Response('', {
  //   status: 200,
  //   headers: {
  //     Location: `/${slug}`,
  //   },
  // })
  return new Response('Exited Draft mode, please switch back to the editing URL', { status: 200 })
}