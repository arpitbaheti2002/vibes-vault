import React, { useState } from 'react';
import TitleBar from './TitleBar';
import Player from '../images/recorder.png';
import Player2 from '../images/recorder2.png';
import Tagline from './Tagline';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

function FrontPage(){
  const [content, changeContent] = useState(<Tagline onSignup={loadSignUp} onLogin={loadLogin}/>);

  function loadSignUp(event){
    changeContent(<SignupForm onReturn={loadTagLine} onLogin={loadLogin}/>);
  }
  
  function loadTagLine(event){
    changeContent(<Tagline onSignup={loadSignUp} onLogin={loadLogin}/>);
  }
  
  function loadLogin(event){
    changeContent(<LoginForm onReturn={loadTagLine} onSignup={loadSignUp}/>);
  }

  return(
    <div>
      <div class='frontPage'>
        <TitleBar />
        <div class="container text-center">
          <div class="row align-items-start">
            <div class="col">
              {content}
            </div>
            <div class="col position-relative">
              <img className='frontPageImage' src={Player} alt="Recorder"/>
            </div>
          </div>
        </div>
      </div>

      <div className='frontPageFooter position-relative'>
        <img className="record2" src={Player2} alt="Recorder"/>
        <p className='review'>
          Vibes Vault is a musical paradise! 🎶 Seamless streaming, personalized playlists, and a 
          treasure trove of tracks. Pure musical bliss at your fingertips. Dive in!
        </p>
      </div>
    </div>
  );
}

export default FrontPage;