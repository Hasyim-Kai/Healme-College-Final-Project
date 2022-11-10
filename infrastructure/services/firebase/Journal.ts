import { collection, addDoc, getDocs, query, where, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '.';

const journalRef = collection(db, 'journal');

export const getJournalFirestore = (): any => {
  try {
    return getDocs(journalRef)
  } catch (error) {
    return error
  }
}

export const saveJournalFirestore = (journalInput: any) => {
  addDoc(journalRef, {
    date: Date.now(),
    title: journalInput.title,
    text: journalInput.text,
    mood: journalInput.mood,
    user_id: journalInput.user_id,
  }).then((response) => response)
    .catch((error) => error)
}

export const updateJournalFirestore = (id: string, updateData: any) => {
  setDoc(doc(db, "journal", id), {
    date: Date.now(),
    title: updateData.title,
    text: updateData.text,
    mood: updateData.mood,
  }, { merge: true })
    .then((response) => { console.log(response); })
    .catch((error) => error)
}

export const delJournalFirestore = (id: string) => {
  deleteDoc(doc(db, "journal", id))
    .then((response) => { console.log(response); })
    .catch((error) => error)
}

// export const getSingleUserFirestore = async (email: string) => {
//   const q = query(journalRef, where("email", "==", email));
//   const data = await getDocs(q);
//   return data?.empty
//   data.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());
//   });
// }