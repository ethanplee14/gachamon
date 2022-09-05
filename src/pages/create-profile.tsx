import Link from "next/link";
import {signIn, signOut, useSession} from "next-auth/react";
import SocialButton from "../components/social-btn";
import Head from "../components/head";


export default function CreateProfile() {
  const session = useSession()
  return <>
    <Head title={"Create Profile - Gachamon"} description={"Gachamon create profile!"}/>

    <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-7xl leading-normal font-extrabold text-yellow-300">
        <Link href={"/"}><a>GACHA<span className="text-blue-700">MON</span></a></Link>
      </h1>
      <div className="card bg-base-200 w-96 p-4 shadow">
        {
          session.status == "authenticated" ?
            <div className={"flex flex-col gap-4"}>
              <h3 className={"text-xl font-mono"}>You are already signed in!</h3>
              <Link href={"/"}><a className="btn">Go home</a></Link>
              <button className="btn" onClick={() => signOut()}>Sign out!</button>
            </div> :
            <>
              <h3 className={"text-xl mb-4 font-mono"}>Sign In</h3>
              <SocialButton
                className="animate-wiggle"
                alt={"Discord"}
                svgPath={"/socials/discord-icon.svg"}
                text={"Discord"}
                onClick={() => signIn("discord")}
              />
              {/*<div className="divider">OR</div>*/}
              {/*<LabeledFormControl label={"Email"}>*/}
              {/*  <input type="text" className="input" placeholder={"leet.trainer@poke.com"}/>*/}
              {/*</LabeledFormControl>*/}
            </>
        }
      </div>
    </main>
  </>
}
