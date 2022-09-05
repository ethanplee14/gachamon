import Head from "next/head";
import Image from "next/image";
import {trpc} from "../utils/trpc";
import LoadingDisplay from "../components/common/loading-display";
import {GetServerSidePropsContext} from "next";
import {authRedirects} from "../server/auth-redirects";


export default function Home() {

  //isIdle when page first started but hasn't fetched any data yet. it's "Idle"
  const {isIdle, isLoading, data, mutate } = trpc.useMutation(["pokemon.roll"])
  return (<>
    <Head>
      <title>Gachamon</title>
      <meta name="description" content="Gotta catch them all" />
      <link rel="icon" href="./favicon.ico" />
    </Head>

    <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-yellow-300">
        GACHA<span className="text-blue-700">MON</span>
      </h1>
      <div className="flex flex-col w-full gap-4 items-center">
        {
          isLoading || data == undefined ?
            <LoadingDisplay /> :
            <>
              <p className={"uppercase font-mono font-semibold"}>{data.name}</p>
              <Image alt={data.name} src={data.sprite} width={"150"} height={"150"} />
            </>
        }
        <button className="btn w-1/3" onClick={_ => mutate()}>Re-roll</button>
      </div>
    </main>
  </>);
};

export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
  const redirects = await authRedirects(req, res)
  return Object.assign(redirects, {props: {}})
}

