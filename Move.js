import { useEffect, useRef} from 'react'

function Move({move, type}) {
	const moveRef = useRef(null);

	useEffect(() => {
		moveRef.current.style.setProperty("--x", move.x);
		moveRef.current.style.setProperty("--y", move.y);
	}, [move])


    return ( 
        <div ref={moveRef} className="piece moves">
            <div className={`${type} center`}></div> 
        </div> 
    )
}

export default Move;