import {AlertCircle, Trash2, X} from "react-feather";
import Image from "next/image";
import {Modal} from "../modal";
import {trpc} from "../../../utils/trpc";
import AsyncButton from "../async-button";


export interface ReleaseModalProps {
  isOpen: boolean,
  pokemonData?: {id: string, name: string, sprite: string}
  onRelease?: () => void,
  onClose?: () => void,
}

export default function ReleaseModal(props: ReleaseModalProps) {

  const release = trpc.useMutation("pokemon.release", {
    onSuccess: () => {
      props.onRelease?.()
      props.onClose?.()
    }
  })

  return <Modal isOpen={props.isOpen} onClose={props.onClose}>
    <div className="flex items-center gap-4">
      <AlertCircle />
      <p className={"text-lg"}>Let the poor boy go? 😢</p>
    </div>
    <div className={"text-center"}>
      {props.pokemonData && <Image alt={"poor boi"} src={props.pokemonData.sprite} width={150} height={150}/>}
    </div>
    <div className="flex gap-2">
      <button className="btn flex-1 gap-2" onClick={props.onClose}>
        <X /> Cancel
      </button>
      <AsyncButton
        className="btn btn-error flex-1 gap-2"
        loading={release.isLoading}
        onClick={() => props.pokemonData && release.mutate(props.pokemonData.id)}
      >
        <Trash2 /> Release
      </AsyncButton>
    </div>
  </Modal>
}
