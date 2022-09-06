import {AlertOctagon} from "react-feather"
import classNames from "classnames";


export interface ErrorAlertProps {
  msg: string,
  className?: string
}

export default function ErrorAlert(props: ErrorAlertProps) {
  return <div className={classNames("alert alert-error shadow-lg", props.className)}>
    <div>
      <AlertOctagon />
      <span>{props.msg}</span>
    </div>
  </div>
}
