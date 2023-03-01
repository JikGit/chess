import { createData, readCollection} from './firebase/firebaseFunctions'

export function addPlayer(color, playerName, idMatch){
    if (color === "white")  createData("matches", `${idMatch}/infoGame/white`, {playerName: playerName});
    else createData("matches", `${idMatch}/infoGame/black`, {playerName: playerName});
}

//return false se il nome passato non e' nel game in atto, altrimenti ritorna bianco/nero a seconda della posizione del player nel game
export async function checkForExistingPlayer(playerName, idMatch){
    let players = await readCollection(`matches/${idMatch}/infoGame`); 
    players = players.filter((player) => player.data.playerName === playerName)
    if (players.length !== 0)
        return players[0].id;
    return false;
}
