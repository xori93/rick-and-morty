import React, { useContext } from 'react'
import "./Episodes.css"
import axios from 'axios'
import CharacterCard from '../../components/CharacterCard/CharacterCard'
import { ThemeContext } from '../../contexts/ThemeContext'



function Episodes() {

  // chane to use global state from context
  // NOTE { } NOT [ ]
  const { darkMode, setDarkMode } = useContext(ThemeContext)

  const [options, setOptions] = React.useState([])
  const [selectedOption, setSelectedOption] = React.useState(1)
  const [selectedEpisode, setSelectedEpisode] = React.useState('')
  const [characterList, setCharacterList] = React.useState([])

  //  when I select an episode, I want to see the information and characters
  // in that episode
  // https://rickandmortyapi.com/api/episode

  // I need to create the user interface
  // that means I need to find out how many episodes there are when page loads
  React.useEffect(
    () => {
      // make api call to find out number of episodes
      axios.get(`https://rickandmortyapi.com/api/episode`)
        .then(res => {
          console.log(res.data.info.count)
          // create an array of numbers from 1 to this value
          const newOptions = [];
          for (let i = 1; i <= res.data.info.count; i++) {
            newOptions.push(i)
          }
          console.log(newOptions)
          // store this in state
          setOptions(newOptions)
        })
        .catch(err => console.log(err))

    }, []

  )

  React.useEffect(
    () => {

      console.log('get data for episode', selectedOption)
      // get data from api
      fetchEpisodeData()
    }, [selectedOption]
  )

  // https://rickandmortyapi.com/api/episode/28
  const fetchEpisodeData = async () => {
    // console.log('make api call')
    try {
      // make spi call to get data for selectedOption
      const res = await axios.get(`https://rickandmortyapi.com/api/episode/${selectedOption}`)
      //  console.log(res.data)
      //  this is data for the the episode, where do i put it?
      setSelectedEpisode(res.data)

      // now we need to get chatacter data
      // console.log(res.data.characters)
      const episodeCharacters = await Promise.all(
        res.data.characters.map(url => {
          return axios.get(url).then(res => res.data)
        })
      )
      // console.log(episodeCharacters)
      // store in state
      setCharacterList(episodeCharacters)

    }
    catch (err) {
      console.log(err)
    }
  }

  const handleSelectChange = (e) => {
    console.log(e.target.value)
    // save this number the user picked in state
    setSelectedOption(e.target.value)
    // get data from api

  }

  return (
    <div className={darkMode ? "episodes-container episodes-dark" : "episodes-container"}>
      <div>
        <label htmlFor="select-episode">Select an episode</label>
        <select id="select-episode" onChange={handleSelectChange}>
          {
            options.map(num => <option key={num} value={num}>{`Episode 
    ${num}`}</option>)
          }
        </select>

      </div>
      <div>
        <div className="episode-info">
          <p>Episode Name: {selectedEpisode?.name}</p>
          <p>Air Date: {selectedEpisode?.air_date}</p>
        </div>
        <div className="character-container">
          {
            characterList.map(item => <CharacterCard
              key={item.id} character={item} />)
          }
        </div>
      </div>
    </div>
  )
}

export default Episodes