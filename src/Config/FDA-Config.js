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
const disapproveStudy = async (studyData) => {
  try {
    let study = await entities.study.update({
      _id: studyData._id,
      agreedByFDA: false,
      status: "4",
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

    return patients.items.filter(
      (item) => item.isEligible && item.studyID == null
    );
  } catch (e) {
    console.log(e);
    return false;
  }
};
const getAllDrugList = async () => {
  try {
    let drugs = await entities.drug.list();
    return drugs.items.filter((item) => item.availableToFDA);
  } catch (e) {
    console.log(e);
    return false;
  }
};
const updatePatientListWithStudyID = async (
  studyID,
  list,
  realDrugID,
  placeboID,
  setShowSpinner
) => {
  try {
    const promises = list.map(async (item, i) => {
      let patient = await entities.patient.get(item._id);
      patient.studyID = studyID;
      delete patient["_owner"];
      patient.drugID = i % 2 == 0 ? realDrugID : placeboID;
      return entities.patient.update(patient);
    });

    await Promise.all(promises);
    setShowSpinner(false);
  } catch (e) {
    setShowSpinner(false);
    console.log(e);
    return e;
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
const getDrugList = async () => {
  try {
    let drugList = await entities.drug.list();
    drugList = drugList.items;
    let placebo = drugList.filter((item) => {
      return item.placebo;
    });
    let realDrug = drugList.filter((item) => !item.placebo);
    return [realDrug, placebo];
  } catch (e) {
    console.log(e);
    return false;
  }
};
const completeStudy = async (studyData) => {
  try {
    let study = await entities.study.update({
      _id: studyData._id,
      status: "3",
    });

    return study;
  } catch (e) {
    console.log(e);
    return false;
  }
};
const useFDA = () => {
  return {
    getStudyList,
    approveStudy,
    getStudyByID,
    getPatientList,
    updatePatientListWithStudyID,
    getAllDrugList,
    getStudyPatients,
    getDrugList,
    completeStudy,
    disapproveStudy,
  };
};

export { useFDA };
