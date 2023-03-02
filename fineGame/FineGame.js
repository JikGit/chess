import React from 'react'
import { useState } from 'react';
import NuovaPartita from './NuovaPartita'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'


function FineGame({fineGame, winner}){
  const [isShowed, setIsShowed] = useState(true);

  return (
    <>
      {isShowed && 
        <div id="fineGame" className={`${fineGame} center`}>
            <FontAwesomeIcon icon={faXmark} onClick={() => {setIsShowed(false)}}/>
            <NuovaPartita/>
            <p className="center" id="userNameVittoria">{`Vittoria di ${winner}`}</p>
            <div className="circle center">
                <h1>{fineGame}</h1>
                <p>Check Mate</p>
            </div>
        </div>
      }
    </>
  )
}

export default FineGame; 
