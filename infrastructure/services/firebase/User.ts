import { signOut } from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '.';

const userRef = collection(db, 'user');
const counselorRef = collection(db, 'counselor');

export const saveUserFirebase = async (userData: any) => {
  addDoc(userRef, userData).then((response) => response)
    .catch((error) => error)
}

export const getAllUserFirebase = async () => {
  try {
    return await getDocs(userRef)
  } catch (error) {
    return error
  }
}

export const getSingleUserFirebase = async (email: string) => {
  const q = query(userRef, where("email", "==", email));
  const data = await getDocs(q);
  return data?.empty
}

export const getSingleCounselorFirebase = async (email: string) => {
  const q = query(counselorRef, where("email", "==", email));
  const data = await getDocs(q);
  return data?.empty
}

export const logout = () => signOut(auth);