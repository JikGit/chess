import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Board from './Board'
import SingOut from './auth/SingOut'
import  FineGame from './fineGame/FineGame';
import { readCollection } from './firebase/firebaseFunctions'


function Game({userName}) {
	//id del game (preso dall'url)
	const idMatch = useLocation().pathname.split("/")[2]
	const [statoPartita, setStatoPartita] = useState("");
	const [winnerName, setWinnerName] = useState("");

	useEffect(() => {
		if (statoPartita === "") return;

		//trovo il nome di quello che ha vinto
		if (statoPartita === "vittoria"){
			setWinnerName(userName);
		}else{
			readCollection(`matches/${idMatch}/infoGame`).then(names=> {
				setWinnerName((names[0].data.playerName !== userName ? names[0] : names[1]).data.playerName)
			})
		}
	}, [statoPartita])

	return (
		<div>
			{winnerName && <FineGame fineGame={statoPartita} winner={winnerName}/>}
    		<Board userName={userName} idMatch={idMatch} statoPartita={statoPartita} setStatoPartita={setStatoPartita}/>
        	<SingOut/>
    	</div>
  	)
}

export default Game