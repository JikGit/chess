import {db} from './firebaseConfig'
import { collection, updateDoc, setDoc, getDocs, getDoc, doc, query, orderBy, limit} from "firebase/firestore";

async function createData(nameCollection, docName, campi) {
	await setDoc(doc(db, nameCollection, docName), campi);
}

async function updateData(nameCollection, docName, campi) {
	await updateDoc(doc(db, nameCollection, docName), campi);
}

async function readCollection(nameCollection) {
	const coll = collection(db, nameCollection)
	let response = await getDocs(coll)
	const data = response.docs.map(doc=> ({data:doc.data(), id:doc.id}))
	return data;
}

async function doesDocExist(nameCollection, docName){
	const docRef = doc(db, nameCollection, `${docName}`);
	const docSnap = await getDoc(docRef);
	return docSnap.exists();
}

async function getSpecificDocId(nameCollection, id){
	let docRef = doc(db, nameCollection, `log${id}`)
	const docSnap = await getDoc(docRef);
	return {data:docSnap.data(), id:docSnap.id};
}

async function getLastLogQuery(nameCollection, docName){
	return query(collection(db, nameCollection, docName), orderBy("createdAt", "desc"), limit(1))
}


export {createData, readCollection, doesDocExist, updateData, getLastLogQuery, getSpecificDocId};
