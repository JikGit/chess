import { createData } from '../firebase/firebaseFunctions'

export default function writeLogToDb(p, newX, newY, logPath){
	// esempio -> createData("matches", `${idMatch}/logs${playerColor}/log${nLog+1}`, {x:p.x, y:p.y, newX:newX, newY:newY, color: p.color, createdAt: Date.now()})
	createData("matches", logPath, {x:p.x, y:p.y, newX:newX, newY:newY, color: p.color, createdAt: Date.now()})
}
