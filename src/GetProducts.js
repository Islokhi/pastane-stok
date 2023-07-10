import {collection, getDocs, query} from "firebase/firestore";
import { db } from "./firebase";

async function getGetProducts( setFunction) {
    const q = query(
        collection(db, 'products')
    )
    const docs = await getDocs(q)

    var list = []
    docs.docs.map( (doc) => {
        list.push({...doc.data(),id:doc.id})
    })
    setFunction(list)
}
export default getGetProducts