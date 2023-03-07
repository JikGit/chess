import React from 'react'
// import { useState } from 'react';

function NavBarTheme(){
  return (
	  <nav id="navBarTheme">
		<div href="" onClick={() => {localStorage.setItem("piecesTheme", "1"); window.location.reload()}}>Tema 1</div>
		<div href="" onClick={() => {localStorage.setItem("piecesTheme", "2"); window.location.reload()}}>Tema 2</div>
		<div href="" onClick={() => {localStorage.setItem("piecesTheme", "3"); window.location.reload()}}>Tema 3</div>
		<div href="" onClick={() => {localStorage.setItem("piecesTheme", "4"); window.location.reload()}}>Tema 4</div>
	  </nav>
  )
}

export default NavBarTheme; 
