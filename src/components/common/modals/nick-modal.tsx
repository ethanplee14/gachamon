import Image from "next/image";
import {CheckCircle, HelpCircle} from "react-feather";
import AsyncButton from "../async-button";
import {Modal} from "../modal";
import {trpc} from "../../../utils/trpc";
import {useState} from "react";


export interface NickModal {
  isOpen: boolean,
  onClose?: () => void,
  onNicked?: () => void,
  pokemonData?: {id: string, name: string, sprite: string}
}

export default function NickModal(props: NickModal) {

  const [nick, setNick] = useState("")

  const nickMutation = trpc.useMutation("pokemon.nick", {
    onSuccess: () => {
      props.onNicked?.()
      props.onClose?.()
    }
  })

  return <Modal {...props}>
      <div className="flex items-center gap-4">
        <HelpCircle />
        <p className={"text-lg"}>Whats the good boy&apos;s name? 😇</p>
      </div>
      <div className={"text-center"}>
        {props.pokemonData && <Image alt={"poor boi"} src={props.pokemonData.sprite} width={150} height={150}/>}
      </div>
      <div className={"flex flex-col gap-2"}>
        <input
          type="text"
          className="input bg-base-300 shadow"
          value={nick}
          onChange={e => setNick(e.target.value)}
          placeholder={"Jimbo"}
        />
        <AsyncButton
          className="btn btn-primary flex-1 gap-2"
          loading={nickMutation.isLoading}
          onClick={() => props.pokemonData && nickMutation.mutate({id: props.pokemonData.id, nick})}
        >
          <CheckCircle size={16}/> Save!
        </AsyncButton>
      </div>

  </Modal>
}
