import { createContext, useState } from "react";

export const contextTodo = createContext()

const ProviderTodo = ({children}) => {
    const [list, setList] = useState([]);
    const value = [list,setList]

    return (
        <contextTodo.Provider value={value}>
            {children}
        </contextTodo.Provider>
    )
}
export default ProviderTodo