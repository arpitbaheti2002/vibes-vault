import React from 'react'

function Tagline(props) {
  return (
    <div className='Tagline'>
      <h2 className='tagline1'>Discover, Stream, Repeat</h2>
      <h3 className='tagline2'>Your Melodic Treasury</h3>
      <button className="front-page-button front-page-button-main" onClick={props.onSignup}>Sign up</button>
      <button className="front-page-button front-page-button-main" onClick={props.onLogin}>Log in</button>
    </div>
  )
}

export default Tagline;