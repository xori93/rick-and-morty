import React, {useEffect, useState, useContext} from 'react'
import "./Homepage.css"
import axios from "axios"
import CharacterCard from '../../components/CharacterCard/CharacterCard'
import Search from '../../components/Search/Search'
import { ThemeContext } from '../../contexts/ThemeContext'


function Homepage() {
    // chane to use global state from context
  // NOTE { } NOT [ ]
  const {darkMode, setDarkMode} = useContext(ThemeContext)

    // create state for the characters
    const [characters, setCharacters] = useState([])
    // show all character when the page loads
    //https://rickandmortyapi.com/api/character

    useEffect( ()=> {
        console.log("Homepage loaded")
        // call api to get data
        axios.get(`https:rickandmortyapi.com/api/character`)
        .then(res=>{
            console.log(res.data.results)
            // I have the data what do i do with it?
            // store it in state
            setCharacters(res.data.results)
        })
        .catch(err=>console.log(err))
            // make api call to get product data
    
    
        },[]
    )
  return (
    <div className={darkMode?"home-container home-dark":"home-container"}>
        <Search setCharacters={setCharacters} />
        <h1>Main Characters</h1>
        <div className="characters-container">
            {
                characters.map(item=><CharacterCard 
                    key={item.id} character={item} />)
                    
                // characters.map(item=><p key={item.id}>{item.name}</p>)
            }
        </div>
        </div>
  )
}

export default Homepage