import './css/app.css';
import './css/boardPieces.css'
import './css/arrows.css'
import './css/switchBoard.css';
import './css/fineGame.css';
import './css/navBarTheme.css';
import SingIn from './auth/SingIn';
import Game from './Game';
import NavBarTheme from './NavbarTheme'

import { Route, Routes, Navigate} from "react-router-dom"

function App() {
	let randomMatchId = parseInt(Math.random() * 1000000000);
	let user = localStorage.getItem("userName");
	return (
		<div className='App'>
			<NavBarTheme/>
			<Routes>
				<Route path="/*" element={user? <Navigate to={`/match/${randomMatchId}`} replace />: <SingIn/>}/>
				<Route path="/match/*" element={user? <Game userName={user && user}/> : <SingIn/>}/>
			</Routes>
		</div>
	);
}

export default App;
