import Context from "./Context";
import { useReducer } from "react";
import reducer, {initState} from "./reducer";
import React from 'react'


interface props {
    children: React.ReactNode
}
const Provider:React.FC<props> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initState)

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}
export default Provider