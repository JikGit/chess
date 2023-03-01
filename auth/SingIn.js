import {useRef} from 'react';

function SingIn() {
	const inputRef = useRef();
	return (
		<form>
			<label>
				<input 
					ref={inputRef}
					type="text" 
					placeholder="Inserisci il tuo nome:"
				/>

				<button 
					onClick={(e) => {setName(inputRef.current.value);window.location.reload();}}>
					Submit
				</button>
			</label>
		</form>
	);
}

function setName(name){
	localStorage.setItem("userName", name)
}

export default SingIn;
