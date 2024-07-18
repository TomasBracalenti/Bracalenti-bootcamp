import { useState } from "react";

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () =>{
        setVisible((prev) => !prev)
    }

    return(
        <div>
            {
                visible?
                <div>
                    {props.children}
                    <button onClick={toggleVisibility}>cancel</button>
                </div>
                :
                <div>
                    <button onClick={toggleVisibility}> {props.buttonName}</button>
                </div>
            }
        </div>
    )
}

export default Togglable;