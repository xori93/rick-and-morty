import React, {useContext} from 'react'
import "./Favorites.css"
import { FavoritesContext } from '../../contexts/FavoritesContext'
import CharacterCard from '../../components/CharacterCard/CharacterCard'



function Favorites() {

   // get the global state
  // NOTE {} NOT []
  const {favorites} = useContext(FavoritesContext)

  return (
    <div className="favorites-container">
        <h1>My Favorites Character</h1>
        <div className="favorite-characters">
            {
                favorites?.map(item=> <CharacterCard 
                    key={item.id} character={item} />)
        }
        </div>
        </div>
  )
}

export default Favorites