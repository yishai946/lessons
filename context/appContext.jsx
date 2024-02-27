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
  deleteDoc,
  getDoc,
} from "firebase/firestore";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [students, setStudents] = useState([]);
  const [lessons, setLessons] = useState([]);
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (uid) {
      fetchStudents();
      fetchLessons();
    }
  }, [uid]);

  const fetchStudents = async () => {
    try {
      const q = query(
        collection(db, "students"),
        where("teacherId", "==", uid),
        orderBy("timestamp", "desc")
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

  const fetchLessons = async () => {
    try{
      const q = query(
        collection(db, "lessons"),
        where("teacherId", "==", uid),
        orderBy("startTime", "desc")
      );
      const res = await getDocs(q);
      const lessons = [];
      res.forEach((doc) => {
        lessons.push(doc.data());
      });
      setLessons(lessons);
    }
    catch(e){
      console.error("error getting lessons: ", e);
    }
  }

  const addLesson = async (newLesson) => {
    try{
      // add lesson document
      const id = uid + newLesson.startTime.toString();
      await setDoc(doc(db, "lessons", id), {
        ...newLesson,
        student: newLesson.student.id,
        teacherId: uid,
        timestamp: serverTimestamp(),
      });

      // update lessons state
      const temp = lessons.filter((lesson) => lesson.id !== newLesson.id);
      temp.unshift({ ...newLesson, teacherId: auth.currentUser.uid });
      setLessons(temp);

      // update student hours
      const studentRef = doc(db, "students", newLesson.student.id);
      const studentSnap = await getDoc(studentRef);
      if(studentSnap.exists()){
        const student = studentSnap.data();
        await setDoc(studentRef, { ...student, hours: student.hours - 1});
      }

      // update students state
      const tempStudents = students.map((student) => {
        if(student.id === newLesson.student.id){
          return { ...student, hours: student.hours - 1};
        }
        return student;
      });

      setStudents(tempStudents);
    }
    catch(e){
      console.error("error adding lesson: ", e);
    }
  }

  const addStudent = async (newStudent) => {
    try {
      await setDoc(doc(db, "students", newStudent.id), {
        ...newStudent,
        teacherId: auth.currentUser.uid,
        timestamp: serverTimestamp(),
      });
      const temp = students.filter((student) => student.id !== newStudent.id);
      temp.unshift({ ...newStudent, teacherId: auth.currentUser.uid });
      setStudents(temp);
    } catch (e) {
      console.error("error adding student: ", e);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await deleteDoc(doc(db, "students", id));
      const temp = students.filter((student) => student.id !== id);
      setStudents(temp);
    } catch (e) {
      console.error("error deleting student: ", e);
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
        deleteStudent,
        lessons,
        addLesson,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
