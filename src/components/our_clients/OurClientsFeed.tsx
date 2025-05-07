import styles from './OurClientsFeed.module.css';
import Slider from '../ui/Slider';
import OurClientsFeedCard from './OurClientsFeedCard';
import OurClientsFeedCardFirst from './OurClientsFeedCardFirst';
import { storyblokEditable } from '@storyblok/react';

export default function OurClientsFeed( { blok }: { blok: any }) {

  const clientStoryData = blok.clientCaseStories?.map((clientCaseStory: any) => {
    const client = clientCaseStory.content.body.find((obj: { component: string; }) => {
      return obj.component === 'case_header'
    })
    const quote = clientCaseStory.content.body.find((obj: { component: string; }) => {
      return obj.component === 'case_testimonial'
    })
    const about = clientCaseStory.content.body.find((obj: { component: string; }) => {
      return obj.component === 'case_about'
    })
    return {
      client: client?.case_company_logo?.alt,
      case: client?.case_title,
      logo: client?.case_company_logo,
      quote: {
        content: quote?.quote,
        name: quote?.name,
        jobtitle: quote?.jobtitle
      },
      stats: {
        stats_1: {
          number: about?.stats_1_number,
          title: about?.stats_1_title
        },
        stats_2: {
          number: about?.stats_2_number,
          title: about?.stats_2_title
        },
        stats_3: {
          number: about?.stats_3_number,
          title: about?.stats_3_title
        }
      },
      full_slug: clientCaseStory.full_slug
    }
  })
  // from clientStoryData, create a new Array of objects, where the first object is the first object of clientStoryData, and the subsequent objects are Arrays each containing two objects from clientStoryData
  const clientStoriesGrouped = []
  if (clientStoryData) {
    let counter = 1 //starts with one to skip the first object
    for(let i = 0; i < clientStoryData.length; i++) {
      if ( i === 0 ) {
        clientStoryData[i].number = i
        clientStoriesGrouped.push([clientStoryData[i]])
      } 
      else {
        if (i % 2 === 1) {
          clientStoryData[i].number = i
          clientStoriesGrouped.push([clientStoryData[i]])
        }
        else {
          clientStoryData[i].number = i
          clientStoriesGrouped[counter].push(clientStoryData[i])
          counter++
        }
      }
    }
  }

  return (
    <div className={styles.clientfeed} {...storyblokEditable(blok)}>
      <header className={styles.title}>
        <p className={styles.title_eyebrow}>{blok.title_eyebrow}</p>
        <h2 className={styles.title_main}>{blok.title_main}</h2>
      </header>
      {/* <pre>{JSON.stringify(clientStoriesGrouped[0][0], null, 2)}</pre> */}
      <div className={styles.clientfeed_slider_desktop}>
        <Slider 
          slidesPerViewDesktop={2} 
          slidesPerViewMobile={1} 
          sliderRef='clientSlider' 
          autoWidth={true} 
          loop={clientStoriesGrouped.length > 4 ? true : false}
          rewind
        >

          { clientStoriesGrouped.map((group: any, index: number) => {

            if (index === 0) {
              return (
                <div key={`client-${index}`}>
                  <OurClientsFeedCardFirst props={group[0]} />
                </div>
              )
            } 
            else {
              return (
                <div key={`client-${index}`}>
                  <OurClientsFeedCard props={group[0]}  />
                  {
                    group[1] && 
                    <OurClientsFeedCard props={group[1]} />
                  }
                </div>
              )
            }
          })}
        </Slider>
      </div>
      <div className={styles.clientfeed_slider_mobile}>
        <Slider 
          slidesPerViewDesktop={1} 
          slidesPerViewMobile={1} 
          sliderRef='clientSliderMobile' 
          autoWidth={true} 
          loop={true}
          rewind
        >
          { clientStoriesGrouped.map((group: any, index: number) => {
            return (
              <div key={`client-${index}`}>
                <OurClientsFeedCardFirst props={group[0]} />
              </div>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}