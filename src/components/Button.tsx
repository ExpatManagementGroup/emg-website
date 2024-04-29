'use client';
import Link from "next/link";
import { ButtonHTMLAttributes } from "react";
import { storyblokEditable } from "@storyblok/react";

export default function Button(
  props: {
    type: string, 
    buttontype?: ButtonHTMLAttributes<HTMLButtonElement>['type'], 
    className?: string, 
    text?: string, 
    href?: string,
    bgcolor?: string,
    arrow?: string,
    scrollLink?: boolean,
    children?: any,
    style?: any
  } 
) {
  const classNames = [
    'button',
    props.className,
    props.bgcolor ? 'button-bg-' + props.bgcolor : 'button-bg-orange',
    props.arrow ? 'button-arrow-' + props.arrow : 'button-arrow-right',
  ]
  if ( props.type === 'button' ) return (
    <button 
      type={props.buttontype ? props.buttontype : 'button'}
      className={classNames.join(' ')}
      {...storyblokEditable(props)}
    >
        {props.text}
    </button>
  )
  else if ( props.type === 'a' ) return (
    <a 
      href={props.href}
      className={classNames.join(' ')}
      {...storyblokEditable(props)}
    >
      {props.text}
    </a>
  )
  else if ( props.type === 'Link' && props.href ) return (
    <Link 
      href={props.href}
      className={classNames.join(' ')}
      {...storyblokEditable(props)}
      onClick={(e) => {
        if ( !props.scrollLink ) return;
        e.preventDefault();
        // get the href hash
        const hash = props.href ? props.href.split('#')[1] : '#';
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        //change focus to the me element
        document.getElementById(hash)?.focus();
        //change the URL to add the hash
        window.history.pushState(null, '', '#'+hash);
      }}
      style={props.style}
    >
      {props.text}
    </Link>
  )
  else return (
    <i>Button type not recognized, maybe you need to add a href or type?</i>
  );
}