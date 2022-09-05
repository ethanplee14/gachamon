import Image from 'next/image'
import {MouseEventHandler} from "react";
import classNames from "classnames";

export interface SocialButtonProps {
  svgPath: string
  alt: string
  text: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export default function SocialButton({className, svgPath, alt, text, onClick}: SocialButtonProps) {
    return (
        <button className={classNames("btn", className)} onClick={onClick}>
            <div className="w-5 h-5 relative mr-2">
                <Image src={svgPath} alt={alt} layout={"fill"} objectFit={"contain"} />
            </div>
            <span className="normal-case">{text}</span>
        </button>
    )
}
