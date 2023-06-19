import { createContext, useState } from "react";
import React from "react"

interface ThemeContextType {theme: string, handleToggle:() => void}
interface propsType {
    children: React.ReactNode
}
const ThemeContext = createContext<ThemeContextType | null>(null)

const ThemeProvider = ({children}:propsType) => {
    const [theme, setTheme] = useState<string>('dark')
    const handleToggle = () => {
        setTheme(theme==='dark'?'light':'dark')
    }
    const value = {theme, handleToggle}
    return ( 
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
     );
}

export {ThemeContext, ThemeProvider};