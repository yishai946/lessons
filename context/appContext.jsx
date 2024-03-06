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
    try {
      const q = query(
        collection(db, "lessons"),
        where("teacherId", "==", uid),
        orderBy("startTime", "desc")
      );
      const res = await getDocs(q);
      const lessons = [];
      res.forEach((doc) => {
        lessons.push({ ...doc.data(), id: doc.id });
      });
      setLessons(lessons);
    } catch (e) {
      console.error("error getting lessons: ", e);
    }
  };

  const addLesson = async (newLesson, pastDuration) => {
    try {
      // Parse start and end time strings into Date objects
      const startTime = new Date(`2000-01-01T${newLesson.startTime}`);
      const endTime = new Date(`2000-01-01T${newLesson.endTime}`);

      // Calculate duration in milliseconds
      let durationMs = endTime.getTime() - startTime.getTime();

      // Convert duration from milliseconds to hours and minutes
      const hours = Math.floor(durationMs / (60 * 60 * 1000));
      const minutes = Math.floor((durationMs % (60 * 60 * 1000)) / (60 * 1000));

      // Update student hours
      const studentRef = doc(db, "students", newLesson.student);
      const studentSnap = await getDoc(studentRef);
      if (!studentSnap.exists()) {
        throw new Error("Student does not exist");
      }

      const studentData = studentSnap.data();
      const remainingHours =
        studentData.hours - (hours + minutes / 60) + pastDuration;

      // Add lesson document
      const id = newLesson.startTime + uid;
      await setDoc(doc(db, "lessons", id), {
        ...newLesson,
        teacherId: uid,
        timestamp: serverTimestamp(),
        hours,
        minutes,
      });

      // Update lessons state
      const temp = lessons.filter((lesson) => lesson.id !== newLesson.id);
      temp.unshift({
        ...newLesson,
        teacherId: auth.currentUser.uid,
        hours,
        minutes,
        id: id,
      });
      setLessons(temp);

      await setDoc(studentRef, {
        ...studentData,
        hours: remainingHours,
      });

      // Update students state
      const tempStudents = students.map((student) => {
        if (student.id === newLesson.student) {
          return { ...student, hours: remainingHours };
        }
        return student;
      });

      setStudents(tempStudents);
    } catch (e) {
      return e;
    }
  };

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

  const deleteLesson = async (lesson) => {
    try {
      // delete lesson document
      await deleteDoc(doc(db, "lessons", lesson.id));

      // Update lessons state
      const temp = lessons.filter((item) => item.id !== lesson.id);
      setLessons(temp);

      // Update student hours
      const studentRef = doc(db, "students", lesson.student.id);
      const studentSnap = await getDoc(studentRef);
      if (!studentSnap.exists()) {
        throw new Error("Student does not exist");
      }

      const studentData = studentSnap.data();
      const remainingHours =
        studentData.hours + lesson.hours + lesson.minutes / 60;

      await setDoc(studentRef, {
        ...studentData,
        hours: remainingHours,
      });

      // Update students state
      const tempStudents = students.map((student) => {
        if (student.id === lesson.student.id) {
          return { ...student, hours: remainingHours };
        }
        return student;
      });

      setStudents(tempStudents);
    } catch (e) {
      console.error("error deleting lesson: ", e);
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
        deleteLesson,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
