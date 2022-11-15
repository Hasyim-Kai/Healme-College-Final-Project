import { collection, addDoc, getDocs, query, where, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '.';

const circleRef = collection(db, 'circle');

export const getJournalFirestore = async (email: string | null = '') => {
  try {
    const q = query(circleRef, where("user_email", "==", email));
    return await getDocs(q)
  } catch (error) {
    return error
  }
}

export const saveJournalFirestore = async (journalInput: any) => {
  try {
    return await addDoc(circleRef, {
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