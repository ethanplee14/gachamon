import SocialButton from "../components/social-btn";
import {signIn, signOut, useSession} from "next-auth/react";
import Link from "next/link";
import Head from "../components/head";
import CenterLayout from "../layouts/center-layout";


export default function Signin() {

  const session = useSession()

  return <>
    <Head title={"Sign In - Gachamon"} description={"Gachamon sign up!"}/>
    <CenterLayout>
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
              onClick={() => signIn("discord", {callbackUrl: `${window.location.origin}`})}
            />
          </>
      }
    </CenterLayout>
  </>
}
