function SingOut() {
	function exitAcc(){
		localStorage.setItem("userName", "")
		window.location.href='/';
	}

	return (
		<button id="singOutBtn" onClick={exitAcc}>SingOut</button>
	);
}

export default SingOut;
