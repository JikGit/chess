import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'

import Board from './Board'
import SingOut from './auth/SingOut'
import  FineGame from './fineGame/FineGame';
import { readCollection } from './firebase/firebaseFunctions'
import { initialateGame } from './initialate/initialateGame';

function Game({userName}) {
	//id del game (preso dall'url)
	const idMatch = useLocation().pathname.split("/")[2]
	const [statoPartita, setStatoPartita] = useState("");
	const [winnerName, setWinnerName] = useState("");
	const [playerColor, setPlayerColor] = useState();
	const [spectator, setSpectator] = useState("");

	//se modifico lo stato della partita vedo come e' finita e metto lo schermo della vittoria/sconfitta/draw/stalemate
	useEffect(() => {
		if (statoPartita === "") return;

		//trovo il nome di quello che ha vinto
		if (statoPartita === "vittoria")
			setWinnerName(userName);
		else{
			readCollection(`matches/${idMatch}/infoGame`).then(names => 
				setWinnerName((names[0].data.playerName !== userName ? names[0] : names[1]).data.playerName)
			)
		}
	}, [statoPartita])

	//vedo se la partita e' gia' stata iniziata, imposto il player e trovo il suo colore, se gia' pieno allora e' spectator (puo' solo guardare)
	useEffect(() => {
		//crea gli utenti e ritorna il colore del player, e se e' uno spectator o no
		initialateGame(idMatch, userName).then(({boardColor, spectator}) => {
			setPlayerColor(boardColor);
			setSpectator(spectator);
		});
	}, [])

	return (
		<>
			{/*Winner window*/}
			{winnerName && <FineGame fineGame={statoPartita} winner={winnerName}/>}

			{playerColor &&
				<div className="center" id="game">
					{/*Rotate board*/}
					<FontAwesomeIcon icon={faArrowsRotate} id="switchBoard" onClick={() => {document.getElementById("board").classList.toggle("black")}}/>
					{/*Board*/}
					<Board userName={userName} idMatch={idMatch} statoPartita={statoPartita} setStatoPartita={setStatoPartita} spectator={spectator} playerColor={playerColor}/>
				</div>
			}

			{/*SingOut button*/}
        	<SingOut/>
    	</>
  	)
}

export default Game
