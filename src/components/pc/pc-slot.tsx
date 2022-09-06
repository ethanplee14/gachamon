import Image from "next/image";
import {Edit, Trash2 } from "react-feather";
import {trpc} from "../../utils/trpc";
import ReleaseModal from "../common/modals/release-modal";
import {useState} from "react";
import NickModal from "../common/modals/nick-modal";


export interface PCSlotProps {
  id: string,
  name: string,
  nick: string | null,
  pokemonId: number
  sprite: string,
}

export default function PCSlot(props: PCSlotProps) {

  const utils = trpc.useContext()
  const [releaseOpen, setReleaseOpen] = useState(false)
  const [nickOpen, setNickOpen] = useState(false)

  return <div className={"p-2 rounded bg-base-300 text-center relative"}>
    <SlotDropdown />
    <div className="w-24 h-24 mx-auto">
      <Image alt={props.name} src={props.sprite} width={100} height={100} objectFit={"cover"}/>
    </div>
    <p className={"font-mono font-semibold"}>{props.nick ?? props.name}</p>
    <ReleaseModal
      isOpen={releaseOpen}
      onClose={() => setReleaseOpen(false)}
      pokemonData={props}
      onRelease={() => utils.invalidateQueries("pokemon.getAll")}
    />
    <NickModal
      isOpen={nickOpen}
      onClose={() => setNickOpen(false)}
      pokemonData={props}
      onNicked={() => utils.invalidateQueries("pokemon.getAll")}
    />
  </div>

  function SlotDropdown() {
    return <div className="dropdown dropdown-end absolute right-3 top-1 z-10">
      <label tabIndex={0} className="btn btn-square btn-xs btn-ghost ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
      </label>
      <ul tabIndex={0} className="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded-box w-32">
        <li onClick={() => setNickOpen(true)}><a><Edit size={12} /> Nick</a></li>
        <li onClick={() => setReleaseOpen(true)}><a><Trash2 size={12} /> Release</a></li>
      </ul>
    </div>
  }
}


