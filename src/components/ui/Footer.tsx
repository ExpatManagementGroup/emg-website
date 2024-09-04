import LogoWithSubline from "./LogoWithSubline"
import styles from "./Footer.module.css"
import Link from "next/link";
import CMForm from "../CMForm";
import { render } from "storyblok-rich-text-react-renderer";
import CurrentYear from "../CurrentYear";

export default function Footer(props: any) {
  const navdata = props.navData;
  const footerData = props.footerData;
  const footer = footerData.data.story.content;

  return(
    <div className={styles.footer}>
      <LogoWithSubline className={styles.footer_logo} />      
      <div className={styles.footer_row_nav_and_form}>
        <div className={styles.locations}>
          <h3 className={styles.footer_nav_header}>Locations</h3>
          <ul className={styles.footer_linklist}>
            <li><a href="/netherlands">The Netherlands</a></li>
            <li><a href="/belgium">Belgium</a></li>
            <li><a href="/luxembourg">Luxembourg</a></li>
            <li><a href="/germany">Germany</a></li>
            <li><a href="/global">Global</a></li>
          </ul>
        </div>
        { navdata.data.story.content.navigation_items && 
          navdata.data.story.content.navigation_items.map((item: any, index: number) => {
          
          // If there's a subnav
          if (item.component == 'navigation_subnavigation') {
            return (
              <div key={index}>
                <h3 className={styles.footer_nav_header}>{item.label}</h3>
                <ul className={styles.footer_linklist}>
                  {item.navigation_subnavigation_items.map((subnavItem: any, index: number) => {
                    return (
                      <li key={index}>
                        <Link href={subnavItem.href}>
                          <span>{subnavItem.label}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          }
        })}
        <div>
          <h3 className={styles.footer_nav_header}>Need help?</h3>
          <ul className={styles.footer_linklist}>
            { navdata.data.story.content.navigation_items && 
              navdata.data.story.content.navigation_items.map((item: any, index: number) => {
              
              // If it's a regular nav item
              if (item.component == 'navigation_item') {
                return (
                  <li key={index}>
                    <Link 
                      className={`${styles.navigation_item} navigation_item`} 
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              }
            })}
          </ul>
          <div className={styles.footer_social}>
            <a href={footer.instagram_link} target="_blank">
              <svg className="instagram_logo" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 1.62225C11.403 1.62225 11.688 1.63125 12.6375 1.67475C15.0765 1.78575 16.2157 2.943 16.3267 5.364C16.3702 6.31275 16.3785 6.59775 16.3785 9.00075C16.3785 11.4045 16.3695 11.6888 16.3267 12.6375C16.215 15.0562 15.0787 16.2157 12.6375 16.3267C11.688 16.3702 11.4045 16.3792 9 16.3792C6.597 16.3792 6.312 16.3702 5.36325 16.3267C2.91825 16.215 1.785 15.0525 1.674 12.6368C1.6305 11.688 1.6215 11.4037 1.6215 9C1.6215 6.597 1.63125 6.31275 1.674 5.36325C1.78575 2.943 2.922 1.785 5.36325 1.674C6.31275 1.63125 6.597 1.62225 9 1.62225ZM9 0C6.55575 0 6.24975 0.0105 5.28975 0.054C2.02125 0.204 0.20475 2.0175 0.05475 5.289C0.0105 6.24975 0 6.55575 0 9C0 11.4443 0.0105 11.751 0.054 12.711C0.204 15.9795 2.0175 17.796 5.289 17.946C6.24975 17.9895 6.55575 18 9 18C11.4443 18 11.751 17.9895 12.711 17.946C15.9765 17.796 17.7975 15.9825 17.9452 12.711C17.9895 11.751 18 11.4443 18 9C18 6.55575 17.9895 6.24975 17.946 5.28975C17.799 2.02425 15.9832 0.20475 12.7117 0.05475C11.751 0.0105 11.4443 0 9 0ZM9 4.3785C6.44775 4.3785 4.3785 6.44775 4.3785 9C4.3785 11.5522 6.44775 13.6222 9 13.6222C11.5522 13.6222 13.6215 11.553 13.6215 9C13.6215 6.44775 11.5522 4.3785 9 4.3785ZM9 12C7.34325 12 6 10.6575 6 9C6 7.34325 7.34325 6 9 6C10.6567 6 12 7.34325 12 9C12 10.6575 10.6567 12 9 12ZM13.8045 3.11625C13.2075 3.11625 12.7237 3.6 12.7237 4.19625C12.7237 4.7925 13.2075 5.27625 13.8045 5.27625C14.4007 5.27625 14.8837 4.7925 14.8837 4.19625C14.8837 3.6 14.4007 3.11625 13.8045 3.11625Z" fill="#04171D"/>
              </svg>
            </a>
            <a href={footer.linkedin_link} target="_blank">
              <svg className="linkedin_logo" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.60382 7.21656V7.1922C8.59846 7.2003 8.59281 7.20865 8.58789 7.21656H8.60382ZM14.8176 0H1.1822C0.529405 0 0 0.513263 0 1.14631V14.8538C0 15.4868 0.529405 16 1.1822 16H14.8176C15.4704 16 16 15.4868 16 14.8538V1.14631C16 0.513263 15.4704 0 14.8176 0ZM4.84982 13.3936H2.4335V6.16889H4.84982V13.3936ZM3.64171 5.18278H3.62627C2.81505 5.18278 2.29062 4.62771 2.29062 3.93401C2.29062 3.22563 2.83102 2.68609 3.65763 2.68609C4.48424 2.68609 4.99328 3.22563 5.00896 3.93401C5.00896 4.62771 4.48424 5.18278 3.64171 5.18278ZM13.5639 13.3936H11.1477V9.52835C11.1477 8.5575 10.798 7.89496 9.9233 7.89496C9.25574 7.89496 8.85812 8.34162 8.68348 8.77294C8.61959 8.92753 8.60386 9.14293 8.60386 9.35885V13.3937H6.18725C6.18725 13.3937 6.2191 6.84691 6.18725 6.16898H8.60386V7.1923C8.92457 6.70037 9.49894 5.99914 10.7819 5.99914C12.3719 5.99914 13.5639 7.03195 13.5639 9.25105L13.5639 13.3936Z" fill="#04171D"/>
              </svg>
            </a>
          </div>
        </div>
        <div className={styles.cmform_container}>
          <h2 className={styles.cmform_title}>Fancy some <span className="h_italics">frequent updates?</span></h2>
          <CMForm className={styles.cmform} />
        </div>
      </div>
      <div className={styles.footer_row_hygiene}>
        <div>{render(footer.hygiene)}</div>
        <div>© <span className="year"><CurrentYear /></span> Expat Management Group</div>
      </div>
    </div>
  )
}