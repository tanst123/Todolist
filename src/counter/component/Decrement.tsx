import React from "react"
interface props {
    onClick: () => void
}
const Decrement:React.FC<props> = ({onClick}:props) => {
    return (
        <button onClick={onClick} >Decrement</button>
    )
}
export default Decrement