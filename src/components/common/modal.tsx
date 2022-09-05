import React, {ReactNode} from "react";


export interface ModalProps {
  isOpen: boolean,
  title?: string,
  onClose?: () => void,
  children?: ReactNode
}

export function Modal(props: ModalProps) {
  return (
    <div>
      <input type="checkbox" id="my-modal-2" checked={props.isOpen} className="modal-toggle" onChange={() => {}}/>
      <div className={`modal`} onMouseDown={(e: React.MouseEvent) => {
        if (e.currentTarget === e.target) {
          props.onClose?.()
        }
      }}>
        <div className="modal-box">
          {props.title && <h1 className={"label-lg uppercase font-semibold mb-4"}>{props.title}</h1>}
          <div className="px-4">
            {props.children}
          </div>
        </div>
      </div>
    </div>

  )
}
