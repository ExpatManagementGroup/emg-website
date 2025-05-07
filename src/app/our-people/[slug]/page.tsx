import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { storyblokEditable } from "@storyblok/react";
import styles from "../../page.module.css";
import { draftMode } from "next/headers";
import { Metadata, ResolvingMetadata } from 'next'

export async function generateStaticParams() {
  const posts = await getStoryblokApi().get(`cdn/stories/`, {
    "starts_with": "our-people/",
    "is_startpage": false
  })
   
  return posts.data.stories.map((post: any) => ({
    slug: post.slug,
  }))
}

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  // read route params
  const id = params.slug

  // fetch data
  const pagedata = await fetchData(id)
  const metadata = {
    title: pagedata.data.story.content.meta_title,
    description: pagedata.data.story.content.meta_description,
    ogimage: pagedata.data.story.content.og_image?.filename ? `${pagedata.data.story.content.og_image.filename}/m/1200x630/smart/filters:format(jpg)` : '',
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  const openGraphImages = [...previousImages]

  if (metadata.ogimage) {
    const ogimg = { url: metadata.ogimage, width: 1200, height: 630 }
    openGraphImages.splice(0, openGraphImages.length, ogimg)
  }

  return {
    title: metadata.title || (await parent).title,
    description: metadata.description || (await parent).description,
    openGraph: {
      images: openGraphImages,
    },
  }
}

export default async function Slug(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  const employee = await fetchData(params.slug);
  const { isEnabled } = await draftMode()
  return (
    <>
    <main className={styles.main} {...storyblokEditable}>
      { employee.data.story.content.title !== '404' &&
        <StoryblokStory story={employee.data.story} />
      }
      { !isEnabled && employee.data.story.content.title === '404' &&
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          textAlign: 'center'
      
        }}>
          <h2 style={{ marginBottom: '1rem' }}>This post is unpublished or it was deleted.</h2>
          <p>Try viewing it in <strong>Draft Mode</strong> maybe? If you publish it it will start showing up in live.</p>
        </div>
      }
    </main>
    </>
  );
}

async function fetchData(slug: string) {
  const { isEnabled } = await draftMode()
  const storyblokApi = getStoryblokApi();
  const result = storyblokApi.get(`cdn/stories/our-people/${slug}`, {
    "version": isEnabled ? "draft" : "published"
  }, {
    cache: isEnabled ? 'no-store' : 'default'
  }).then(response => {
    return {
      data: response.data,
      headers: response.headers,
    }
  }).catch((error) => {
    return {
      data: {
        story: {
          content: {
            title: '404',
            description: 'Page not found',
            featured_image: {
              filename: 'https://a.storyblok.com/f/39866/1200x630/1b2f3c7c5e/placeholder.jpg'
            }
          }
        }
      },
      headers: {
        status: 404
      }
    };
  });
  return result;
}