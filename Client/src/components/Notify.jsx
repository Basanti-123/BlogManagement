import {Alert} from "react-bootstrap"

export const Notify = ({variant, msg}) => {
  return (
    <div>
      <Alert variant={variant}>
      
      <div className="text-center"> {msg}</div>
      </Alert>
    </div>
  )
}

