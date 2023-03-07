import {updatePiecePos} from "../movement/movmentFunctions";
import PieceClass from '../PieceClass.js';
import { getLogN } from './getLogN';

function moveTillLastLog(newPieces, logs){
	//per ogni log chiamo moveToLog
	logs.forEach(record => newPieces = moveToLog(newPieces, record))
	return newPieces;
}
	
function moveToLog(newPieces, record, playSound = false){
	if (!record) return
	const {newX, newY, x, y, idEatedPiece} = record.data;
	const p = newPieces[y][x];

	newPieces = updatePiecePos(newPieces, p, newX, newY, playSound, !idEatedPiece);
	return newPieces;
}

async function moveToLogLeft(idMatch, stateArrows, lastLog, colorTurn, playerColor, pieces, playSound = false){
	let nLogToMove = (lastLog ? ((colorTurn == playerColor ? 0 : 1) + parseInt(lastLog.id.split('log')[1])): 0) - stateArrows ;
	if (nLogToMove < 0) return;

	let logN = await getLogN(idMatch, nLogToMove, true);
	//swap dei valori
	let [newX,newY] = [logN.data.x, logN.data.y]
	logN.data.x = logN.data.newX; logN.data.y = logN.data.newY;
	logN.data.newX = newX; logN.data.newY = newY;
	let newPieces = moveToLog([...pieces], logN, playSound);
	if (logN.data.idEatedPiece){
		let {type, color, imgName} = PieceClass.getDataFromId(logN.data.idEatedPiece);
		newPieces[logN.data.y][logN.data.x] = new PieceClass(logN.data.x, logN.data.y, type, color, imgName, logN.data.idEatedPiece);
	}
	return newPieces;
}

async function moveToLogRight(idMatch, stateArrows, lastLog, colorTurn, playerColor, pieces, playSound = false){
	if (stateArrows == 0) return;
	let nLogToMove = (lastLog ? ((colorTurn == playerColor ? 0 : 1) + parseInt(lastLog.id.split('log')[1])+1): 1)  - stateArrows ;
	let logN = await getLogN(idMatch, nLogToMove, playSound);

	return moveToLog([...pieces], logN, playSound);
}
export {moveToLog, moveTillLastLog, moveToLogLeft, moveToLogRight}
