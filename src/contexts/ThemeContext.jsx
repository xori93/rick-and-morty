import { useState, createContext, useEffect } from "react"
// import { ThemeContext } from './ThemeContext';

// create context
export const ThemeContext = createContext()

export default function ThemeContextProvider(props){
    // create the global state
    const [darkMode, setDarkMode] = useState(false)

    // this one is for retrieving from localStorage
    useEffect(()=>{
        // when page loads, check if there is value in localstorage
        const storedDarkMode = localStorage.getItem('darkMode')
        console.log(storedDarkMode)
        // if there was a value, use it
        if (storedDarkMode){
            setDarkMode(JSON.parse(storedDarkMode))
        }

    }, []
    )

    // this one is for saveing to localstorage
    useEffect(

        ()=>{
            console.log('darkmode now', darkMode)
            // save current state to localstorage
            localStorage.setItem('darkMode', JSON.stringify(darkMode))

        }, [darkMode]
    )

    return(
        <ThemeContext.Provider value={{darkMode, setDarkMode}}>
            {props.children}
        </ThemeContext.Provider>
    )
}