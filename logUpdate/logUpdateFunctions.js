import {updatePiecePos} from "../movement/movmentFunctions";

function moveTillLastLog(newPieces, logs){
	//per ogni log chiamo moveToLog
	logs.forEach(record => newPieces = moveToLog(newPieces, record))
	return newPieces;
}
	
function moveToLog(newPieces, record){
	if (!record) return
	const {newX, newY, x, y} = record.data;
	const p = newPieces[y][x];
	//update delle posizioni senza scrivere sul db
	newPieces = updatePiecePos(newPieces, p, newX, newY);
	return newPieces;
}

export {moveToLog, moveTillLastLog}
