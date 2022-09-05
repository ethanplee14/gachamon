import NextHead from "next/head"
import {ReactNode} from "react";


export interface HeadProps {
  title?: string
  description?: string
  favicon?: string,
}

export default function Head(props: HeadProps) {
  return <NextHead>
    <title>{props.title}</title>
    <meta name={"description"} content={props.description}/>
    <link rel="icon" href={props.favicon ?? "./favicon.ico"}/>
  </NextHead>
}
