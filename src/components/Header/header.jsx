import React from 'react'
import "./Header.css"

function header() {
  return (
    <div className="header-container">
        <div>
            <a href="/" style={{marginRight:"10px"}}>Home</a>
            <a href="/about" style={{marginRight:"10px"}}>About</a>
            <a href="/episodes">Episode</a>
        </div>
        <button className="theme-button">Dark Mode</button>
    </div>
  )
}

export default header