import React from 'react'

function NuovaPartita() {

  return (
    <div onClick={() => {window.location.href=`/match/${parseInt(Math.random() * 1000000000)}`;}} className="center" id="nuovaPartita">Nuova Partita</div>
  )
}

export default NuovaPartita