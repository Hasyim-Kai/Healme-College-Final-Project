export const fetchSchedule = () => console.log(`fetch`)
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '.';

const scheduleRef = collection(db, 'schedule');

export const getAllScheduleFirestore = async (email: string | null = '') => {
   try {
      const q = query(scheduleRef, where("user_email", "==", email));
      return await getDocs(q)
   } catch (error) {
      return error
   }
}

export const getMyScheduleFirestore = async (email: string | null = '') => {
   try {
      const q = query(scheduleRef, where("user_email", "==", email));
      return await getDocs(q)
   } catch (error) {
      return error
   }
}

export const saveScheduleFirestore = async (journalInput: any) => {
   try {
      return await addDoc(scheduleRef, {
         date: Date.now(), ...journalInput
      })
   } catch (error) {
      return error
   }
}

export const updateScheduleFirestore = async (updateData: any) => {
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

export const delScheduleFirestore = async (id: string) => {
   try {
      return await deleteDoc(doc(db, "journal", id))
   } catch (error) {
      return error
   }
}

export const applyScheduleFirestore = async (updateData: any) => {
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