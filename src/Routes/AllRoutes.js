import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Bavaria,
  Home,
  FDA,
  NoMatch,
  Hopkins,
  Patient,
  HopkinsHome,
  BavariaHome,
  FDAHome,
  PatientDetails,
  CreatePatient,
  Reports,
  DrugInfo,
  StudyInfo,
  EditPatient,
  HopkinsStudy,
  BavariaStudy,
  HopkinsStudyDetails,
  FDAPatient,
  FDAStudyDetails,
  BavariaStudyDetails,
  CreateStudy,
} from "../Pages";
export default function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Hopkins" element={<Hopkins />}>
          <Route path="home" element={<HopkinsHome />} />
          <Route path="patient" element={<Patient />}></Route>
          <Route path="createPatient" element={<CreatePatient />} />
          <Route path="EditPatient" element={<EditPatient />} />
          <Route path="Reports" element={<Reports />} />
          <Route path="StudyInfo" element={<HopkinsStudy />} />
          <Route path="CreateStudy" element={<CreateStudy />} />
        </Route>
        <Route path="hopkins/patient/details" element={<PatientDetails />} />
        <Route
          path="hopkins/studyinfo/details"
          element={<HopkinsStudyDetails />}
        />
        <Route path="bavaria" element={<Bavaria />}>
          <Route path="home" element={<BavariaHome />} />
          <Route path="drugInfo" element={<DrugInfo />} />
          <Route path="studyInfo" element={<BavariaStudy />} />
        </Route>
        <Route
          path="bavaria/studyinfo/details"
          element={<BavariaStudyDetails />}
        />
        <Route path="fda" element={<FDA />}>
          <Route path="Home" element={<FDAHome />} />
          <Route path="studyInfo" element={<StudyInfo />} />
          <Route path="patient" element={<FDAPatient />} />
        </Route>
        <Route path="fda/studyinfo/details" element={<FDAStudyDetails />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}
