import { createVendiaClient } from "@vendia/client";

const client = createVendiaClient({
  apiUrl: `https://hrkl2vlns8.execute-api.us-west-2.amazonaws.com/graphql/`,
  websocketUrl: `wss://gpp2p4q229.execute-api.us-west-2.amazonaws.com/graphql`,
  apiKey: `3ZNrSndeQpVvJCEFrSv7U85iNzEm57qnBQ6gfdGJpB4Q`,
});

const { entities } = client;
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
const approveStudy = async (studyData) => {
  try {
    let study = await entities.study.update({
      _id: studyData._id,
      agreedByFDA: true,
      status: studyData.agreedByBavaria ? "2" : studyData.status,
    });

    return study;
  } catch (e) {
    console.log(e);
    return false;
  }
};
const getPatientList = async () => {
  try {
    let patients = await entities.patient.list();

    return patients.items.filter((item) => item.isEligible);
  } catch (e) {
    console.log(e);
    return false;
  }
};
// const includePatientsInStudy =  async (
//   list, studyID
//   // setConfirmSendPatientList,
//   setShowSpinner
// ) => {
//   try {
//     const promises = list.map(async (item) => {
//       let patient = await entities.patient.get(item._id);
//       patient.studyID = studyID;
//       delete patient["_owner"];
//       return entities.patient.update(patient);
//     });
//     // setConfirmSendPatientList(false);
//     await Promise.all(promises);
//     setShowSpinner(false);
//   } catch (e) {
//     console.log(e);
//     // setConfirmSendPatientList(false);
//   }
// };
const useFDA = () => {
  return { getStudyList, approveStudy, getStudyByID, getPatientList };
};

export { useFDA };
