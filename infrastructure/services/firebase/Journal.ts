import { collection, addDoc, getDocs, query, where, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '.';

const journalRef = collection(db, 'journal');

export const getJournalFirestore = async (email: string | null = '') => {
  try {
    const q = query(journalRef, where("user_email", "==", email));
    return await getDocs(q)
  } catch (error) {
    return error
  }
}

export const saveJournalFirestore = async (journalInput: any) => {
  try {
    return await addDoc(journalRef, {
      date: Date.now(), ...journalInput
    })
  } catch (error) {
    return error
  }
}

export const updateJournalFirestore = async (updateData: any) => {
  try {
    return await setDoc(doc(db, "journal", updateData.id), {
      date: Date.now(),
      title: updateData.title,
      text: updateData.text,
      mood: updateData.mood,
    }, { merge: true })
  } catch (error) {
    return error
  }
}

export const delJournalFirestore = async (id: string) => {
  try {
    return await deleteDoc(doc(db, "journal", id))
  } catch (error) {
    return error
  }
}

// export const getSingleUserFirestore = async (email: string) => {
//   const q = query(journalRef, where("email", "==", email));
//   const data = await getDocs(q);
//   return data?.empty
//   data.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());
//   });
// }