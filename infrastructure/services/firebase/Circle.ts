import { collection, query, where, getDocs, addDoc, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '.';

const circleRef = collection(db, 'circle');

export const getAllCircleFirestore = async (email: string | null = '') => {
  try {
    const q = query(circleRef, where("user_email", "==", email));
    return await getDocs(q)
  } catch (error) {
    return error
  }
}

export const getMyCircleFirestore = async (email: string | null = '') => {
  try {
    const q = query(circleRef, where("user_email", "==", email));
    return await getDocs(q)
  } catch (error) {
    return error
  }
}

export const saveCircleFirestore = async (journalInput: any) => {
  try {
    return await addDoc(circleRef, {
      date: Date.now(), ...journalInput
    })
  } catch (error) {
    return error
  }
}

export const updateCircleFirestore = async (updateData: any) => {
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

export const delCircleFirestore = async (id: string) => {
  try {
    return await deleteDoc(doc(db, "journal", id))
  } catch (error) {
    return error
  }
}