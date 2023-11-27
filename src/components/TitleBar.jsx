import React from 'react'
import logo from '../images/Muse.png'

function TitleBar() {
  return (
    <div className="Titlebar">
      <img className="logo" src={logo} alt='logo'/>
      <p className='title'>Vibes Vault</p>
    </div>
  )
}

export default TitleBar
