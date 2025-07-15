import { storyblokEditable } from "@storyblok/react";
import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from '@storyblok/react/rsc';
import styles from "../page.module.css";
import { draftMode } from 'next/headers'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from "next/navigation";

// Force dynamic rendering to handle draft-only pages
export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateStaticParams() {
  // Return empty array to allow all dynamic routes (including draft-only)
  // This prevents 404s for unpublished pages during live editing
  return []
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  // read route params
  const id = params.slug

  try {
    // fetch data
    const pagedata = await fetchSlugData(id)

    // Check if we got valid data
    if (!pagedata?.data?.story?.content) {
      console.log('No valid story data for metadata, using defaults');
      return {
        title: 'Page Not Found',
        description: 'This page could not be found',
      };
    }

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
  } catch (error) {
    console.log('Error in generateMetadata, using defaults:', error);
    return {
      title: 'Draft Page',
      description: 'Draft content',
    };
  }
}

export default async function Slug(props: { params: Promise<{ slug: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const thisSlug = params.slug;
  
  // Check for Storyblok preview parameters to enable draft mode
  const hasStoryblokParams = '_storyblok' in searchParams || '_storyblok_tk' in searchParams;
  
  if (hasStoryblokParams) {
    console.log('Storyblok preview parameters detected, enabling draft mode...');
    // Enable draft mode for this request
    const draftModeObj = await draftMode();
    await draftModeObj.enable();
  }
  
  const slugData  = await fetchSlugData(params.slug);
  const blogPosts = await fetchBlogPostsData();
  const topics = await fetchTopicData();

  // if (!thisSlug || !slugData || !slugData.data.story) {
  //   return notFound();
  // }

  slugData.data.story = {
    ...slugData.data.story,
    content: {
      ...slugData.data.story.content,
      blogPosts: blogPosts.data.stories,
      topics: topics.data.datasource_entries,
    }
  }
  const { isEnabled } = await draftMode()

  return (
    <>
    <main className={`${styles.main} ${thisSlug}`} {...storyblokEditable}>
      <StoryblokStory story={slugData.data.story} />
    </main>
    </>
  );
}

async function fetchSlugData(slug: string) {
  const { isEnabled } = await draftMode()
  
  console.log('=== FETCH DEBUG ===');
  console.log('Fetching slug:', slug);
  console.log('Draft mode enabled:', isEnabled);
  
  try {
    const storyPath = (slug === 'netherlands' || slug === 'belgium' || slug === 'germany' || slug === 'luxembourg' || slug === 'global') 
      ? `locations/${slug}` 
      : slug;
    
    console.log('Story path:', storyPath);
    console.log('Trying to fetch with access token ending in:', process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN?.slice(-8) || 'no token');
    
    // Try draft first if draft mode is enabled
    if (isEnabled) {
      try {
        console.log('Trying to fetch draft version...');
        const story = await getStoryblokApi().get(`cdn/stories/${storyPath}`, {
          version: "draft"
        }, {
          cache: 'no-store'
        });
        console.log('Draft story found:', story.data.story.name);
        return story;
      } catch (draftError: any) {
        console.log('Draft fetch failed with error:', draftError.message || draftError);
        console.log('Trying published version as fallback...');
        // Fall back to published if draft doesn't exist
      }
    }
    
    // Try published version
    console.log('Fetching published version...');
    const story = await getStoryblokApi().get(`cdn/stories/${storyPath}`, { 
      version: "published"
    }, {
      cache: isEnabled ? 'no-store' : 'default'
    });
    console.log('Published story found:', story.data.story.name);
    return story;
    
  } catch (error: any) {
    console.error('=== FETCH ERROR ===');
    console.error('Error fetching data:', error.message || error);
    console.error('Error status:', error.status);
    console.error('Full error details:', JSON.stringify(error, null, 2));
    
    // Let's try to list available stories to debug
    try {
      console.log('=== DEBUGGING: Listing available stories ===');
      
      // Check draft stories first
      const draftStories = await getStoryblokApi().get('cdn/stories', {
        version: "draft",
        per_page: 100, // Increase limit to see more stories
        search_term: slug // Try to search for the specific slug
      });
      console.log(`Found ${draftStories.data.stories.length} draft stories matching "${slug}":`);
      draftStories.data.stories.forEach((s: any) => {
        console.log(`  - ${s.full_slug} (name: ${s.name}, id: ${s.id}, published: ${s.published_at ? 'yes' : 'no'})`);
      });
      
      // If no match with search, try without search term
      if (draftStories.data.stories.length === 0) {
        console.log('No stories found with search term, listing all draft stories...');
        const allDrafts = await getStoryblokApi().get('cdn/stories', {
          version: "draft",
          per_page: 50
        });
        console.log(`Available draft stories (first 50):`);
        allDrafts.data.stories.forEach((s: any) => {
          console.log(`  - ${s.full_slug} (name: ${s.name}, id: ${s.id}, published: ${s.published_at ? 'yes' : 'no'})`);
        });
      }
      
      // Also check published stories
      const publishedStories = await getStoryblokApi().get('cdn/stories', {
        version: "published",
        per_page: 100,
        search_term: slug
      });
      console.log(`Found ${publishedStories.data.stories.length} published stories matching "${slug}":`);
      publishedStories.data.stories.forEach((s: any) => {
        console.log(`  - ${s.full_slug} (name: ${s.name}, id: ${s.id})`);
      });
      
    } catch (listError) {
      console.log('Could not list stories:', listError);
    }
    
    // Create a fallback response instead of notFound() for debugging
    return {
      data: {
        story: {
          name: `Error fetching ${slug}`,
          content: {
            component: 'page',
            body: []
          }
        }
      }
    };
  }
}
async function fetchBlogPostsData() {
  return getStoryblokApi().get(`cdn/stories`, {
    "starts_with": "insights/",
    "is_startpage": false
  },)   
}
async function fetchTopicData() {
  return getStoryblokApi().get(`cdn/datasource_entries`, {
    "datasource": "topics",
    "version": "published"
  });
}