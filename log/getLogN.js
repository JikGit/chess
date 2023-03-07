import { getSpecificDocId} from '../firebase/firebaseFunctions'

export async function getLogN(idMatch, nLog){
	//se pari allora log bianco 
	if (nLog % 2 == 0)
		return await getSpecificDocId(`matches/${idMatch}/logswhite`, nLog);
	//altrimenti log nero
	else
		return await getSpecificDocId(`matches/${idMatch}/logsblack`, nLog);
}

