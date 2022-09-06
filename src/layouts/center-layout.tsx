import Link from "next/link";
import Image from "next/image"
import {ReactNode} from "react";


export interface CenterLayoutProps {
  children?: ReactNode
}

export default function CenterLayout({children}: CenterLayoutProps) {
  return <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
      {/*<Link href={"/"}><a>GACHA<span className="text-blue-700">MON</span></a></Link>*/}
    <Link href={"/"}>
      <a>
        <Image alt={"Gachamon"} src={"/logo-tilt.png"} width={400} height={100}/>
      </a>
    </Link>
    <div className="card bg-base-200 w-96 p-4 shadow">{children}</div>
  </main>
}
