import moveSound from '../assets/sounds/move.mp3'
import takeSound from '../assets/sounds/take.mp3'
import PieceClass from '../PieceClass'

function updatePiecePos(newPieces, p, newX, newY, playSound = false, ){
	//controllo enPassant, se mi muovo in obliquo con un pawn e non c'e' nessuno da mangiare dove mi sto muovendo (perforza enPassant perche' presupposto che ogni mossa che arriva qui e' valida)
	if (p.type === "pawn" && Math.abs(p.x - newX) === 1 && !newPieces[newY][newX] && p.y - newY == (p.color === "white" ? 1 : -1)) 
		newPieces = updatePiecePos(newPieces, p, newX, newY + (p.color === "white" ? 1 : -1)) 
	//controllo per castle
	if (p.type === "king" && Math.abs(p.x - newX) === 2)
		newPieces = updatePiecePos(newPieces, newPieces[newY][newX === 2 ? 0 : 7], newX === 2 ? p.x-1 : p.x+1, newY) //lastLog vuoto perche' serve solo per arrocco e enPassan
	//promotion
	if (p.type === "pawn" && newY === (p.color === "white" ? 0 : 7))
		p = new PieceClass(p.x, p.y,"queen",p.color, `${p.color[0]}Q.svg`, `P${p.id}`)

	//se il pezzo dove si deve muovere e' occupato vuoldire che sta mangiando quindi play del suono che mangia, altrimenti si e' mosso
	if (playSound) new Audio(newPieces[newY][newX] ? takeSound : moveSound).play();

	//aggiorno la matrice
	p.hasMoved = true;
	newPieces[p.y][p.x] = null;
	[p.x, p.y] = [newX, newY]
	newPieces[newY][newX] = p;
	return newPieces
}

//trova l'index x,y del pezzo dalla maatrice pieces
function findIndexBoard(posX, posY, containerRef, indexBoard, black = false){
	//(int(posmovingPiece - posBoard / lenghtmovingPiece))
	let lenghtmovingPiece = containerRef.current.offsetWidth / indexBoard;
	let [newX, newY] = [parseInt((posX - containerRef.current.getBoundingClientRect().x) / lenghtmovingPiece), 
		parseInt((posY - containerRef.current.getBoundingClientRect().y) / lenghtmovingPiece)]
	//se e' nero devo specchiare tutto perche' la board e' al contrario nei pieces
	if (black)
		[newX, newY] = [indexBoard - newX - 1, indexBoard - newY - 1];
	return [newX, newY];
}

//in base al fatto se e' un touch/movement da telefono e da mouse
function getPosFromEvent(e){
	if(e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend' || e.type === 'touchcancel'){
		var evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
		var touch = evt.touches[0] || evt.changedTouches[0];
		return [touch.pageX, touch.pageY]
	} else if (e.tposYpe === 'mousedown' || e.type === 'mouseup' || e.type === 'mousemove' || e.type === 'mouseover'|| e.type==='mouseout' || e.type==='mouseenter' || e.type==='mouseleave') 
		return [e.clientX, e.clientY];
}

export {updatePiecePos, findIndexBoard, getPosFromEvent}
