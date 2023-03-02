import { readCollection, doesDocExist } from '../firebase/firebaseFunctions'
import { checkForExistingPlayer, addPlayer } from '../managePlayer';
import { moveTillLastLog } from '../logUpdate/logUpdateFunctions';

export async function initialateGame(idMatch, userName){
	let boardColor = "white";
	let spectator = false;

	//nuova partita
	if (!await doesDocExist("matches", `${idMatch}/infoGame/white`)){
		addPlayer("white", userName, idMatch);
	//se gia' esiste il game
	}else{
		//se ci sono gia' due persone (quindi non giochiamo noi)
		//controllo se l'utente era in game anche prima, se lo e' gli metto il color di prima
		let alreadyExistingPlayer = await checkForExistingPlayer(userName, idMatch);
		if (alreadyExistingPlayer) boardColor = alreadyExistingPlayer;
		//altrimenti e' nero oppure e' spectator se sono gia' presenti i player
		else{
			if (await doesDocExist("matches", `${idMatch}/infoGame/black`))
				spectator = true;
			else
				addPlayer("black", userName, idMatch);
			boardColor = "black";
		}
	}
	return {boardColor: boardColor, spectator: spectator}
}
export async function checkForNewMovedPiece(newPieces, idMatch, playerColor){
    let colorTurn = "white";
    let lastMovedPiece;
	let lastLog;

	//se ci sono logs da updatare
	let allLogs = (await readCollection(`matches/${idMatch}/logsblack`)).concat(await readCollection(`matches/${idMatch}/logswhite`))
	//li metto in ordine di createdAt (quindi in ordine di gioco)
	allLogs.sort((log1, log2) => log1.data.createdAt - log2.data.createdAt);
	//sposto tutti i log
	if (allLogs.length !== 0){
		newPieces = moveTillLastLog(newPieces, allLogs);
		//setto il numero di log e turno (presi dal data dell'ultimo log)
		colorTurn = allLogs.at(-1).data.color === "black" ? "white" : "black";
		lastMovedPiece = {x:allLogs.at(-1).data.x, y:allLogs.at(-1).data.y, newX:allLogs.at(-1).data.newX, newY:allLogs.at(-1).data.newY};
		//se l'ultimo log e' dell'avversario lo devo updatare come lastLog
		lastLog = allLogs.at(-1).data.color !== playerColor ? allLogs.at(-1) : allLogs.at(-2); 
	}

    //ritorno i pezzi, turno e il colore dell'utente
    return {colorTurn: colorTurn, newPieces: newPieces, lastMovedPiece: lastMovedPiece, lastLog: lastLog}
}


