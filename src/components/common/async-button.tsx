import {ReactNode} from "react";
import classNames from "classnames";


export type AsyncButtonProps = {
  className?: string
  loading?: boolean
  children?: ReactNode
  onClick?: React.MouseEventHandler
}

export default function AsyncButton(props: AsyncButtonProps) {
  return <button
    className={classNames("btn", {"loading": props.loading}, props.className)}
    onClick={props.onClick}
  >
    { !props.loading && props.children }
  </button>
}
