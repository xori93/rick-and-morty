import React from 'react'
import "./Search.css"
import axios from 'axios'

function Search({setCharacters}) {
    // create state for textbpx data
    const [query, setQuery] = React.useState("")

    const handleSubmit = (e) =>{
        // stop the form from res
        e.preventDefault()
        console.log("search for", query)
        // need to get characters to match this query
        // https://rickandmortyapi.com/api/character/?name=beth


        // make api call to get data
        axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`)
        .then(res=>{
            console.log(res.data.results)
            // i have the data what do i do with it
            // change what is in characters
            setCharacters(res.data.results)
        })
        .catch(err=> {

        // console.log(err.response.status)
        if(err.response.status === 404) {
        alert("Tere is no characters name ${query")
        }
        else{
            console.log(err)
        }
    })
    // clear text box
    setQuery("")
    }
  return (
    <form className="search-container" onSubmit={handleSubmit}>
        <input type="text"  value={query} placeholder="Search all character" 
            onChange={(e)=>setQuery(e.target.value)}
        />
    
    </form>
  )
}

export default Search