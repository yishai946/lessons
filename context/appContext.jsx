import { createContext, useContext, useState } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore"; 

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [students, setStudents] = useState([]);

  const addStudent = async (newStudent) => {
    try {
      const studentRef = doc(collection(db, "students"));
      const res = await setDoc(studentRef, { ...newStudent, teacherId: auth.currentUser.uid });
      if (res) {
        console.log("Student added");
        setStudents([...students, {...newStudent, teacherId: auth.currentUser.uid}]);
      }
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
