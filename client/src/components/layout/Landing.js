import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons';

function Landing() {
  return (
    <div className="container mx-auto flex-col flex-auto items-center justify-center">
      <h1 className="text-white text-6xl font-thin border-b-2 border-dashed py-5 mt-10 text-center w-2/3 md:w-1/3 mx-auto">KeySafe</h1>
      <h1 className="text-white text-5xl md:text-6xl font-light text-center mb-20">a place to store<br></br> all your <span className="text-5xl"><FontAwesomeIcon icon={ faKey } /><FontAwesomeIcon icon={ faKey } /><FontAwesomeIcon icon={ faKey } /></span></h1>
    </div>
  )
}

export default Landing;