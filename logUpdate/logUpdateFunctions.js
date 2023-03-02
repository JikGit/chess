import {updatePiecePos} from "../movement/movmentFunctions";

function moveTillLastLog(newPieces, logs){
	//per ogni log chiamo moveToLog
	logs.forEach(record => newPieces = moveToLog(newPieces, record))
	return newPieces;
}
	
function moveToLog(newPieces, record, playSound = false){
	if (!record) return
	const {newX, newY, x, y} = record.data;
	const p = newPieces[y][x];

	newPieces = updatePiecePos(newPieces, p, newX, newY, playSound);
	return newPieces;
}

export {moveToLog, moveTillLastLog}
