import { useState } from "react"
import PropTypes from "prop-types"
const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible((prev) => !prev)
  }

  return (
    <div>
      {visible ? (
        <div>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      ) : (
        <div>
          <button onClick={toggleVisibility}> {props.buttonName}</button>
        </div>
      )}
    </div>
  )
}

Togglable.propTypes = {
  buttonName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}


export default Togglable
