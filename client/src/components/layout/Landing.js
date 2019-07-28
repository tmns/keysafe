import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons';

function Landing() {
  return (
    <div className="container mx-auto flex items-center justify-center">
      <div>
        <h1 className="text-white text-6xl font-thin border-b-2 py-5 mt-10 text-center">KeySafe</h1>
        <h1 className="pr-5 text-white text-5xl md:text-6xl font-light text-center">a place to store<br></br> all your <span className="text-5xl"><FontAwesomeIcon icon={ faKey } /><FontAwesomeIcon icon={ faKey } /><FontAwesomeIcon icon={ faKey } /></span></h1>
      </div>
    </div>
  )
}

export default Landing;