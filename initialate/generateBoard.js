import PieceClass from '../PieceClass.js';
import {arrBoard, nRowPieces as lengthBoard} from './BoardScheme'

function generateBoard(){
	let pieces = [];
	//ciclo per ogni elemento
	for (let row = 0; row < lengthBoard; row++){
		let arr = []
		for (let col = 0; col < lengthBoard; col++){
			let color = (row > 3 ? "white" : "black")
			let type = "";
			//determino il tipo
			switch (arrBoard[row][col]){
				case 'p': type="pawn";break;
				case 'r': type="rook";break;
				case 'n': type="knight";break;
				case 'b': type="bishop";break;
				case 'q': type="queen";break;
				case 'k': type="king";break;
				//vuoto
				default: 
					arr.push(null);
					continue;
			}

			//genero e aggiungo l'oggetto
			let imgName;
			//knight inizia per k ma la immgine e' bN perche' c'e' il King che inizia per K 
			if (type === "knight")
				imgName = color[0] + "N";
			else	
				imgName = color[0] + type.toUpperCase()[0];

			arr.push(new PieceClass(col, row, type, color, imgName + '.svg', imgName + col));
		}
		pieces.push(arr)
	}

	//ritorno l'array di PieceClass
	return pieces;
}

export default generateBoard;