import Head from "../components/head";
import Navbar from "../components/navbar";
import React from "react";
import {trpc} from "../utils/trpc";
import { HardDrive } from "react-feather";
import PCSlot from "../components/pc/pc-slot";
import LoadingDisplay from "../components/common/loading-display";
import {authRedirects} from "../server/auth-redirects";
import {GetServerSidePropsContext} from "next";


export default function Pc() {

  const pokemon = trpc.useQuery(["pokemon.getAll"], {
    refetchOnWindowFocus: false
  })

  return (<>
    <Head title={"PC - Gachamon"} description={"Looking through your friendos"}/>
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 flex">
        <Sidebar />
        <div className="flex-1">
          {
            pokemon.isLoading || pokemon.isFetching ?
              <div className={"mt-24"}><LoadingDisplay /></div> :
              pokemon.data?.length == 0 ?
                <p className={"text-center mt-12 text-xl"}>What are you doing here...? GO ROLL SOME POKEMON.</p> :
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-7xl mx-auto p-6">
                  {buildSlots()}
                </div>
          }
        </div>
      </main>
    </div>
  </>);

  function buildSlots() {
    return pokemon.data?.map(data => <PCSlot key={"slot-" + data.id} {...data}/>)
  }

  function Sidebar() {
    return <div className="w-16 bg-base-200 border-r border-gray-700 shadow flex flex-col items-center py-8">
      <a className="btn btn-square btn-ghost flex-col" title={"Access your PC."}><HardDrive /> PC</a>
    </div>
  }
}

export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
  const redirects = await authRedirects(req, res)
  return Object.assign(redirects, {props: {}})
}

