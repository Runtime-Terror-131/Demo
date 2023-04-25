import React from "react";
import { Routes, Route } from "react-router-dom";
import { UserTypeConst } from "../Components/Util/StaticConst";
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
  CreateDrug,
  StudyInfo,
  EditPatient,
  HopkinsStudy,
  BavariaStudy,
  HopkinsStudyDetails,
  FDAParticipant,
  FDAStudyDetails,
  BavariaStudyDetails,
  CreateStudy,
  Profile,
  DrugList,
} from "../Pages";
import { useContextValues } from "../Context/Context";

export default function AllRoutes({ type }) {
  type = parseInt(type);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {type === UserTypeConst.hopkinsAdmin ||
        type === UserTypeConst.hopkinsDoctor ? (
          <>
            <Route path="Hopkins" element={<Hopkins />}>
              <Route path="home" element={<HopkinsHome />} />
              <Route
                path="patient"
                element={<Patient userType={type} />}></Route>
              <Route path="createPatient" element={<CreatePatient />} />
              <Route path="EditPatient" element={<EditPatient />} />
              <Route path="Reports" element={<Reports />} />
              <Route
                path="StudyInfo"
                element={<HopkinsStudy userType={type} />}
              />
              <Route path="CreateStudy" element={<CreateStudy />} />
            </Route>
            <Route
              path="hopkins/patient/details"
              element={<PatientDetails />}
            />
            <Route
              path="hopkins/studyinfo/details"
              element={<HopkinsStudyDetails />}
            />
            <Route path="*" element={<NoMatch />} />
          </>
        ) : type === UserTypeConst.bavaria ? (
          <>
            <Route path="bavaria" element={<Bavaria />}>
              <Route path="home" element={<BavariaHome />} />
              <Route path="drugInfo" element={<DrugInfo />} />
              <Route path="createDrug" element={<CreateDrug />} />
              <Route path="studyInfo" element={<BavariaStudy />} />
            </Route>
            <Route
              path="bavaria/studyinfo/details"
              element={<BavariaStudyDetails />}
            />
            <Route path="*" element={<NoMatch />} />
          </>
        ) : type === UserTypeConst.fda ? (
          <>
            <Route path="fda" element={<FDA />}>
              <Route path="Home" element={<FDAHome />} />
              <Route path="studyInfo" element={<StudyInfo />} />
              <Route path="participant" element={<FDAParticipant />} />
              <Route path="druglist" element={<DrugList />} />
            </Route>
            <Route path="fda/studyinfo/details" element={<FDAStudyDetails />} />
            <Route path="*" element={<NoMatch />} />
          </>
        ) : (
          <Route path="*" element={<NoMatch />} />
        )}
        <Route path="profile" element={<Profile />} />
      </Routes>
    </>
  );
}
