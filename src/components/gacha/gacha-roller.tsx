import Image from "next/image"
import {trpc} from "../../utils/trpc";
import {useState} from "react";
import {RotateCcw, Trash2} from "react-feather";
import GachaPanel from "./gacha-panel";
import ReleaseModal from "../common/modals/release-modal";


export default function GachaRoller() {
  const trpcCtx = trpc.useContext()

  const [isRolling, setRolling] = useState(false)
  const [releaseModalOpen, setReleaseModalOpen] = useState(false)
  const rollsLeft = trpc.useQuery(["gachamon.rolls-left"])
  const roll = trpc.useMutation("gachamon.roll", {
    onSuccess: () => trpcCtx.invalidateQueries("gachamon.rolls-left")
  })

  return <div className={"w-2/3 min-w-[300px] max-w-3xl mx-auto flex flex-col gap-4"}>
    <div className="relative">
      <div className={"flex justify-center gap-4"}>
        <Image alt="pokeball" src={"/pokeball-icon.svg"} width={30} height={30}/>
        <h2 className={"text-3xl text-center font-semibold font-mono tracking-widest uppercase"}>Gotta Gacham All</h2>
        <Image alt="pokeball" src={"/pokeball-icon.svg"} width={30} height={30}/>
      </div>

    </div>
    <div className="flex flex-col md:flex-row gap-2">
      <GachaPanel rollsLeft={rollsLeft.data} rolling={isRolling} pokemonData={roll.data} onRollFinish={() => setRolling(false)}/>
      {!isRolling && roll.data &&
        <p className={"w-full md:w-40 md:h-52 p-2 bg-base-300 rounded text-sm overflow-y-auto shadow"}>
          {roll.data.flavorText}
        </p> }
    </div>
    {!isRolling && rollsLeft.data != 0 && <div className={"flex-1 flex w-full gap-4"}>
      <button className="btn btn-accent flex-1 gap-2" onClick={startRoll}><RotateCcw size={16}/> roll</button>
      {roll.data && <button
        className={"btn btn-error gap-2 flex-1"}
        onClick={() => setReleaseModalOpen(true)}
      >
        <Trash2 size={16}/> release
      </button>}
    </div>}
    <ReleaseModal
      isOpen={releaseModalOpen}
      onClose={() => setReleaseModalOpen(false)}
      pokemonData={roll.data}
      onRelease={() => roll.reset()}
    />
  </div>

  function startRoll() {
    setRolling(true)
    roll.mutate()
  }
}
