class PieceClass{
	constructor(x, y, type, color, imgName, id){
		this.x = x;
		this.y = y;
		this.type = type;
		this.color = color;
		this.imgName = imgName;
		this.id = id;
		this.hasMoved = false;
	}

	static getDataFromId(id){
		id = id.toLowerCase();
		let type = (id[1] === 'r' ? "rook" : id[1] === 'n' ? "knight" : id[1] === 'p' ? 'pawn' : id[1] === 'b' ? "bishop" : id[1] === 'q' ? "queen" : id[1] === 'k' ? "king" : '');
		let imgName;
		if (type === "n")
			imgName = id[0] + "N";
		else	
			imgName =  id[0] + type.toUpperCase()[0];

		return {type: type, color: id[0], imgName: imgName + '.svg'};
	}
}

export default PieceClass;
