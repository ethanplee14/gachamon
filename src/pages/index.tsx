import {GetServerSidePropsContext} from "next";
import {authRedirects} from "../server/auth-redirects";
import Navbar from "../components/navbar";
import Head from "../components/head";
import {HardDrive} from "react-feather";
import GachaRoller from "../components/gacha/gacha-roller";
import React from "react";
import Link from "next/link";


export default function Home() {
  return (<>
    <Head title={"Gachamon"} description={"Gotta catch them all"}/>
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 flex">
        <Sidebar />
        <div className="flex-1 mt-8">
          <GachaRoller />
        </div>
      </main>
    </div>
  </>);

};

function Sidebar() {
  return <div className="w-16 bg-base-200 border-r border-gray-700 shadow flex flex-col items-center py-8">
    <Link href={"/pc"}>
      <a className="btn btn-square btn-ghost flex-col" title={"Access your PC."}><HardDrive /> PC</a>
    </Link>
  </div>
}

export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
  const redirects = await authRedirects(req, res)
  return Object.assign(redirects, {props: {}})
}

