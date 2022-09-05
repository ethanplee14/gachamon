import Head from "next/head"
import {ReactNode} from "react";

export interface BaseLayoutProps {
  title?: string
  description?: string
  favicon?: string,
  children?: ReactNode
}

export default function BaseLayout(props: BaseLayoutProps) {
  return <>
    <Head>
      <title>{props.title}</title>
      <meta name={"description"} content={props.description}/>
      <link rel="icon" href={props.favicon ?? "./favicon.ico"}/>
    </Head>
    {props.children}
  </>
}
