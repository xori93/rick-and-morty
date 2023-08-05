import { useState, createContext, useEffect } from "react"
// import { ThemeContext } from './ThemeContext';
import Favorites from './../pages/Favorites/Favorites';

// create context
export const FavoritesContext = createContext()

export default function FavoritesContextProvider(props){
    // create the global state
    const [favorites, setFavorites] = useState([])

    // this one is for retrieving from localStorage
    useEffect(()=>{
        // when page loads, check if there is value in localstorage
        const storedFavorites = localStorage.getItem('favoritesList')
        // console.log(storedDarkMode)
        // if there was a value, use it
        if (storedFavorites){
            setFavorites(JSON.parse(storedFavorites))
        }

    }, []
    )

    // this one is for saveing to localstorage
    useEffect(

        ()=>{
            // console.log('darkmode now', darkMode)
            // save current state to localstorage
            localStorage.setItem('favoritesList', JSON.stringify(favorites))

        }, [favorites]
    )




    // this function will add a chatacter to the list
    const addCharacter = (charToAdd) =>{
        console.log('adding', charToAdd)
        // verfiy that i have the data of the chacter to add
        let newFavorites = [ ...favorites, charToAdd]
        console.log(newFavorites)
        // update state
        setFavorites(newFavorites)

    }

    const removeCharacter = (charId) =>{
        console.log('remove', charId)
        // use function to KEEP all that are not charId
        let newFavorites = favorites.filter(item => item.id != charId)
        // console.log(favorites)
        // update state
        setFavorites(newFavorites)
    }

    return(
        <FavoritesContext.Provider value={{favorites, addCharacter, removeCharacter}}>
            {props.children}
        </FavoritesContext.Provider>
    )
}