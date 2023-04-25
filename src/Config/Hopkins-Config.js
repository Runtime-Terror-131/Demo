import { createVendiaClient } from "@vendia/client";
import { UserTypeConst } from "../Components/Util/StaticConst";
const client = createVendiaClient({
  apiUrl: `
  https://sbdvivo3e2.execute-api.us-west-2.amazonaws.com/graphql/`,
  websocketUrl: `
    wss://hkfgp9zyq9.execute-api.us-west-2.amazonaws.com/graphql`,
  apiKey: "DK8mnXv4GeHAFw47KHwCNzJArxD4JBVAGRcENk884nQK",
});

const { entities } = client;
const getAll = async () => {
  try {
    const patients = await entities.patient.list();
    return patients;
  } catch (e) {
    console.log(e);
    return e;
  }
};
const getByID = async (uuid) => {
  try {
    const patient = await entities.patient.get(uuid);
    return patient;
  } catch (e) {
    return e;
  }
};
const createNewPatient = async (patient) => {
  try {
    await entities.patient.add(patient);
    return true;
  } catch (error) {
    return error.message;
  }
};
const updatePatientData = async (patient) => {
  try {
    await entities.patient.update(patient);
    return true;
  } catch (error) {
    return error.message;
  }
};
const deletePatient = async (id) => {
  try {
    await entities.patient.remove(id);
    return true;
  } catch (error) {
    return error.message;
  }
};
const setUserType = async (UID, type, name) => {
  let uidUser = { UserUID: UID, name: name, userType: type };
  try {
    await entities.user.add(uidUser);
    return true;
  } catch (error) {
    return error.message;
  }
};

const getUserData = async (
  UID,
  setLoginUserType,
  setLoginUserName,
  setShowSpinner,
  setPortalNamePath
) => {
  try {
    // Wait for 2 seconds before getting user data
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const result = await entities.user.list();
    const user = result.items.filter((item) => item.UserUID === UID)[0];

    if (user) {
      setLoginUserType(user.userType);
      setLoginUserName(user.name);
      let userPath =
        user.userType == UserTypeConst.hopkinsAdmin ||
        user.userType == UserTypeConst.hopkinsDoctor
          ? "/hopkins"
          : user.userType == UserTypeConst.bavaria
          ? "/bavaria"
          : user.userType == UserTypeConst.fda
          ? "/fda"
          : "/hopkins";
      setPortalNamePath(userPath);
    } else {
      throw "User not found. this could be related to old emails that are not available in our User Schema in vendia";
    }
  } catch (e) {
    console.log(e);
    setShowSpinner(false);
    return e;
  }
};
const getStudyList = async () => {
  try {
    let studies = entities.study.list();
    return studies;
  } catch (e) {
    console.log(e);
    return false;
  }
};
const getStudyByID = async (uuid) => {
  try {
    const study = await entities.study.get(uuid);
    return study;
  } catch (e) {
    return e;
  }
};
const SendPatientListToFDA = async (
  list,
  setConfirmSendPatientList,
  setShowSpinner
) => {
  try {
    const promises = list.map(async (item) => {
      let patient = await entities.patient.get(item._id);
      patient.isEligible = true;
      delete patient["_owner"];
      return entities.patient.update(patient);
    });
    setConfirmSendPatientList(false);
    await Promise.all(promises);
    setShowSpinner(false);
  } catch (e) {
    console.log(e);
    setConfirmSendPatientList(false);
  }
};
const createNewStudy = async (study) => {
  try {
    await entities.study.add(study);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
const getStudyPatients = async (studyID) => {
  try {
    let patients = await entities.patient.list();
    return patients.items.filter((item) => item.studyID == studyID);
  } catch (e) {
    console.log(e);
    return false;
  }
};
const applyDose = async (patient, dose, setShowSpinner) => {
  try {
    // let patient = await entities.patient.get(id);
    if (patient.doses != null) {
      patient.doses.push(dose);
    } else {
      patient.doses = [];
      patient.doses.push(dose);
    }
    delete patient["_owner"];
    entities.patient.update(patient);
    setShowSpinner(false);
    return true;
  } catch (e) {
    setShowSpinner(false);
    console.log(e);
    return false;
  }
};
const getReports = async () => {
  try {
    let reports = await entities.report.list();
    return reports;
  } catch (e) {
    console.log(e);
    return false;
  }
};
const useJaneHopkins = () => {
  return {
    entities,
    getAll,
    getByID,
    createNewPatient,
    updatePatientData,
    deletePatient,
    setUserType,
    getUserData,
    getStudyList,
    getStudyByID,
    SendPatientListToFDA,
    createNewStudy,
    getStudyPatients,
    applyDose,
    getReports,
  };
};

export { useJaneHopkins };
