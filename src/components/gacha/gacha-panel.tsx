import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {randomIntRange} from "../../utils/math";
import classNames from "classnames";
import { Zap } from "react-feather";


export interface GachaPanelProps {
  rolling: boolean,
  rollsLeft?: number,
  pokemonData?: {name: string, sprite: string},
  onRollFinish?: () => void
}

export default function GachaPanel(props: GachaPanelProps) {
  const [hidden, setHidden] = useState(new Array<boolean>(10).fill(false))
  const [rolling, setRolling] = useState(false)
  const hiddenCopy = useRef(Array.from(hidden.keys()))

  useEffect(() => {
    if(props.rolling) {
      const resetHidden = new Array<boolean>(10).fill(false)
      setHidden(resetHidden)
      startRollAnimation()
      setRolling(true)
    }
  }, [props.rolling])


  return <div className="w-full h-52 bg-base-300 rounded-lg shadow relative">
    <div className={"badge bg-base-100 right-1 top-2 right-2 z-10 absolute gap-2"}>
      {props.rollsLeft}
      <Zap className={"text-yellow-500"} size={16}/>
    </div>
    {<div className={"flex flex-col h-full w-full justify-center absolute z-10"}>
      <div className="flex justify-center relative top-2">
        {!hidden[0] && <Grass className={"left-2"}/>}
        {!hidden[1] && <Grass />}
        {!hidden[2] && <Grass className={"right-2"}/>}
      </div>
      <div className="flex justify-center">
        {!hidden[3] && <Grass className={"left-4"}/>}
        {!hidden[4] && <Grass className={"left-1"}/>}
        {!hidden[5] && <Grass className={"right-1"}/>}
        {!hidden[6] && <Grass className={"right-4"}/>}
      </div>
      <div className="flex justify-center relative bottom-2">
        {!hidden[7] && <Grass className={"left-2"}/>}
        {!hidden[8] && <Grass />}
        {!hidden[9] && <Grass className={"right-2"}/>}
      </div>
    </div>}
    {props.pokemonData && <div className={"flex flex-col justify-center items-center h-full"}>
      <Image alt={props.pokemonData.name} src={props.pokemonData.sprite} width={"150"} height={"150"} />
      {!rolling && <h3 className={"uppercase font-mono font-semibold"}>{props.pokemonData.name}</h3>}
    </div>
    }
  </div>

  function Grass({className}: {className?: string}) {
    const randomDelay = randomIntRange(5, 200)
    const uiStyle = "w-14 h-14 relative inline-block"
    const isShaking = props.rolling
    return <div
      style={{animationDelay: `${isShaking ? randomDelay : 0}ms`}}
      className={classNames(uiStyle, {"animate-shake": isShaking}, className)}
    >
      <Image alt={"grass"} src={"/grass-sprite.png"} layout={"fill"} objectFit={"contain"}/>
    </div>
  }

  function startRollAnimation() {
    setTimeout(() => {
      const interval = setInterval(() => {
        const hiddenIndices = hiddenCopy.current
        const grassIndex = hiddenIndices.splice(randomIntRange(0, hiddenCopy.current.length), 1)[0]!
        setHidden(hidden => {
          //needs to use a builder. setTimeout and setInterval doesn't get updated state
          // https://stackoverflow.com/questions/55198517/react-usestate-why-settimeout-function-does-not-have-latest-state-value
          hidden[grassIndex] = true
          return [...hidden]
        })

        if (hiddenIndices.length == 0) {
          clearInterval(interval)
          hiddenCopy.current = Array.from(hidden.keys())
          setRolling(false)
          props.onRollFinish?.()
        }
      }, 250)
    }, 3000)
  }
}
