export const fetchSchedule = () => console.log(`fetch`)
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, setDoc, getDoc, DocumentReference } from 'firebase/firestore';
import { db } from '.';

const scheduleRef = collection(db, 'schedule');

export const getAllScheduleFirestore = async () => {
   try {
      return await getDocs(scheduleRef)
   } catch (error) {
      return error
   }
}

export const getCounselorScheduleFirestore = async (name: string | null = '') => {
   try {
      const q = query(scheduleRef, where("counselor_name", "==", name));
      return await getDocs(q)
   } catch (error) {
      return error
   }
}

export const getUserScheduleFirestore = async (name: string | null = '') => {
   try {
      const q = query(scheduleRef, where("patient_name", "==", name));
      return await getDocs(q)
   } catch (error) {
      return error
   }
}

export const getDetailScheduleFirestore = async (id: string = '') => {
   try {
      const detailRef: DocumentReference = doc(db, 'schedule', id);
      const res = await getDoc(detailRef);
      return res
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
      return await setDoc(doc(db, "schedule", updateData.id), updateData, { merge: true })
   } catch (error) {
      return error
   }
}

export const delScheduleFirestore = async (id: string) => {
   try {
      return await deleteDoc(doc(db, "schedule", id))
   } catch (error) {
      return error
   }
}