import React from "react"
interface props {
    onClick: () => void
}
const Increment = ({onClick}: props) => {
    return (
        <button onClick={onClick}>Increment</button>
    )
}
export default Increment