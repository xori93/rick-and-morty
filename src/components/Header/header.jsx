import React, {useContext} from 'react'
import "./Header.css"
import {Link} from 'react-router-dom'
import { ThemeContext } from '../../contexts/ThemeContext'


function header() {
  // create a variable to control darkMode
  // const darkMode = true;

  // create state to control darkMode
  // const [darkMode, setDarkMode] = React.useState(false)

  // chane to use global state from context
  // NOTE { } NOT [ ]
  const {darkMode, setDarkMode} = useContext(ThemeContext)

  return (
    <div className={darkMode?"header-container header-dark":"header-container"}>
        <div>
            <Link to="/" style={{marginRight:"10px"}}>Home</Link>
            <Link to="/about" style={{marginRight:"10px"}}>About</Link>
            <Link to="/episodes">Episode</Link>
        </div>
        <button className={darkMode?"theme-button theme-button-dark":"theme-button"}  
        onClick={()=>setDarkMode(!darkMode)}>
          {
            darkMode?"Light Mode" : "Dark Mode"
          }
          
        </button>
    </div>
  )
}

export default header