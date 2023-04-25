'use client'

import style from "./page.module.css"
import PatientList from "@/components/PatientList/PatientList";
import PatientInformation from "@/components/PatientInformation/PatientInformation";
// import { useState } from "react";
// import NavBar from "../components/NavBar";
// import PatientsCard from "../components/PatientsCard";
// import InfoCard from "../components/InfoCard";
// import "../styles.css";
// import AddCard from "./AddCard";
// import ConfirmCard from "./ConfirmCard";
// import { signOut } from "firebase/auth";
// import { auth, db } from "../firebase";
// import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

const Home = ({
  onClickCardItem,
  selectedUser,
  selectedId,
  INVALID_INDEX,
}) => {
//   const [isAddingPatient, setIsAddingPatient] = useState(false);
//   const [isSigningOut, setIsSigningOut] = useState(false);
//   const [isHandlingRequest, setIsHandlingRequest] = useState(false);
//   const [requestData, setRequestData] = useState({});

//   const addModal = (show) => {
//     if (show && (isSigningOut || isHandlingRequest)) return;
//     setIsAddingPatient(show);
//   };
//   const logOutModal = (show) => {
//     if (show && (isAddingPatient || isHandlingRequest)) return;
//     setIsSigningOut(show);
//   };
//   const requestModal = (show, props) => {
//     if (show && (!isAddingPatient || isHandlingRequest)) return;
//     setIsHandlingRequest(show);
//     setRequestData(props);
//   };
//   const logOut = () => {
//     signOut(auth);
//     window.location.assign("/");
//     alert("Sesión cerrada con éxito.");
//   };
//   const handleRequest = async () => {
//     const reqRef = doc(db, "PacienteConDoctores", requestData.requestID);
//     const doctorsCollectionRef = collection(db, "Doctor");
//     const doctorQuery = query(
//       doctorsCollectionRef,
//       where("IDDoctor", "==", requestData.doctorID)
//     );
//     const doctorSnap = await getDocs(doctorQuery);
//     const doctorName =
//       doctorSnap.size > 0 ? doctorSnap.docs[0].data().Nombre : "";
//     if (requestData.accept) {
//       await updateDoc(reqRef, { Relacion: 3, NombreDoctor: doctorName });
//     } else {
//       await deleteDoc(reqRef);
//     }
//     requestModal(false, {});
//     addModal(false);
//   };

  return (
    <div className="app">
      <div className={style.content}>
        <PatientList
          selectedUser={selectedUser}
          onClickCardItem={onClickCardItem}
          onClickAdd={() => addModal(true)}
        ></PatientList>
        <PatientInformation
          selectedUser={selectedUser}
          selectedId={selectedId}
          INVALID_INDEX={INVALID_INDEX}
        ></PatientInformation>
      </div>
      {/* {isAddingPatient && (
        <AddCard
          onClickModalFade={() => addModal(false)}
          onClickRequest={requestModal}
        />
      )}
      {isHandlingRequest && (
        <ConfirmCard
          title={requestData.title}
          onClickConfirm={handleRequest}
          onClickCancel={() => requestModal(false)}
        >
          {requestData.text}
        </ConfirmCard>
      )}
      {isSigningOut && (
        <ConfirmCard
          title="Cerrar Sesión"
          onClickConfirm={logOut}
          onClickCancel={() => logOutModal(false)}
        >
          ¿Estás seguro que quieres cerrar sesión?
        </ConfirmCard>
      )} */}
    </div>
  );
};

export default Home;
