import Image from "next/image";
import Link from "next/link";
import { User, LogOut } from "react-feather";
import {signOut} from "next-auth/react";


export default function Navbar() {
  return <div className={"navbar bg-base-200 border-b border-gray-700 shadow"}>
    <div className={"flex-1"}>
      <Link href={"/"}>
        <a><Image alt={"Gachamon"} src={"/logo-tilt.png"} width={130} height={35}/></a>
      </Link>
    </div>
    <div className="flex-none">

      <div className="dropdown dropdown-end">
        <label tabIndex={0} className={"btn btn-circle btn-ghost"}>
          <User />
        </label>
        <ul tabIndex={0} className="dropdown-content menu menu-compact p-2 shadow bg-base-200 rounded-box w-52">
          <li onClick={() => signOut()}><a><LogOut />Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
}
