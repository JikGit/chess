import { useEffect, useRef } from 'react'

function Piece({piece}){
	const pieceRef = useRef(null);

	useEffect(() => {
		pieceRef.current.style.setProperty("--x", piece.x);
		pieceRef.current.style.setProperty("--y", piece.y);
	}, [piece])


	return (
		<>
			<img ref={pieceRef}  id={piece.id} className={`piece ${piece.type} ${piece.color}`} src={require(`./assets/img/${piece.imgName}`)} alt="piece"/>
		</>
	)
}

export default Piece;
