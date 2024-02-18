import { createContext, useContext, useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [students, setStudents] = useState([]);
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (uid) {
      fetchStudents();
    }
  }, [uid]);

  const fetchStudents = async () => {
    try {
      const q = query(
        collection(db, "students"),
        where("teacherId", "==", uid),
        orderBy("createdAt", "desc")
      );
      const res = await getDocs(q);
      const students = [];
      res.forEach((doc) => {
        students.push(doc.data());
      });
      setStudents(students);
    } catch (e) {
      console.error("error getting students: ", e);
    }
  };

  const addStudent = async (newStudent) => {
    try {
      const studentRef = doc(collection(db, "students"));
      await setDoc(studentRef, {
        ...newStudent,
        teacherId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });
      setStudents([
        { ...newStudent, teacherId: auth.currentUser.uid },
        ...students,
      ]);
    } catch (e) {
      console.error("error adding student: ", e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        modalVisible,
        setModalVisible,
        students,
        addStudent,
        // fetchStudents
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
