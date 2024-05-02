import { getStoryblokApi } from '@storyblok/react/rsc';
import styles from './Search.module.css';
import Picture from '../Picture';
import Button from './Button';

export default async function Seachresults( { searchTerm }: { searchTerm: string}) {

  const data = await fetchSearchData(searchTerm);

  return (
    <div className={styles.search_results}>
      { data && data.data.stories.length === 0 && searchTerm &&
        <div className={styles.results}>
          <h3 className={styles.results_title}>No results found for &quot;{searchTerm}&quot;</h3>
          <p>Try searching for single words that are likely to appear in the title or description of the article you are looking for.</p>
        </div>
      }
      { data && data.data.stories.length > 0 && searchTerm &&
        <div className={styles.results}>
          <h3 className={styles.results_title}>Search results:</h3>
          {
            data.data.stories.map((story: any) => {
              return (
                <div className={styles.result} key={story.id}>
                  <Picture 
                    src={story.content.featured_image.filename}
                    alt={story.content.featured_image.alt}
                    className={styles.image}
                    aspectRatioDesktop='1'
                    aspectRatioMobile='1'
                    sizes='(min-width: 840px) 10vw, 15vw'
                  />
                  <div className={styles.info}>
                    <h3 className={styles.title} dangerouslySetInnerHTML={{__html: highlightText(story.content.title, searchTerm)}}></h3>
                    <div className={styles.description} dangerouslySetInnerHTML={{__html: highlightText(story.content.description, searchTerm)}}></div>
                    <Button 
                      href={story.full_slug}
                      type="Link"
                      text='Read'
                      className={styles.button}
                    />
                  </div>
                </div>
              )
            })
          }
        </div>
      }
    </div>
  )
}

function highlightText(text: string, term: string) {
  return text.replace(new RegExp(`(${term})`, 'gi'), '<mark>$1</mark>');
}
async function fetchSearchData(searchterm: string) {
  const storyblokApi = getStoryblokApi();
  const data = storyblokApi.get(`cdn/stories`, {
    'starts_with': 'insights/', 
    'is_startpage': false,
    'per_page': 9,
    'filter_query': {
      __or: [
        {
          'title': {
            'like': `*${searchterm}*`
          }
        },
        {
          'description': {
            'like': `*${searchterm}*`
          }
        }
      ]
    }
  });
  return data;
}