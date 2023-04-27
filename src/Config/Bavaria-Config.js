import { createVendiaClient } from "@vendia/client";

const client = createVendiaClient({
  apiUrl: `https://5q33927xva.execute-api.us-west-2.amazonaws.com/graphql/`,
  websocketUrl: `wss://d7qb1fw83i.execute-api.us-west-2.amazonaws.com/graphql`,
  apiKey: `Hpe4tWLkgCw1d9vLBi2HZPXDXXmE8h7n1FcsYCZ52ZB4`,
});

const { entities } = client;
const getDrugList = async () => {
  try {
    let drugs = await entities.drug.list();
    return drugs;
  } catch (e) {
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
const approveStudy = async (studyData) => {
  try {
    let study = await entities.study.update({
      _id: studyData._id,
      agreedByBavaria: true,
      status: studyData.agreedByFDA ? "2" : studyData.status,
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
      agreedByBavaria: false,
      status: "4",
    });

    return study;
  } catch (e) {
    console.log(e);
    return false;
  }
};
const createNewDrug = async (drugs) => {
  try {
    await entities.drug.add(drugs);
    return true;
  } catch (error) {
    return error.message;
  }
};
const updateDrugData = async (drugs) => {
  try {
    await entities.drug.update(drugs);
    return true;
  } catch (error) {
    return error.message;
  }
};
const SendDrugListToFDA = async (
  list,
  setConfirmSendDrugList,
  setShowSpinner
) => {
  try {
    const eligibleDrugList = list.filter(
      (item) => item.availableToFDA === false
    );

    const promises = eligibleDrugList.map(async (item) => {
      let drug = await entities.drug.get(item._id);
      drug.availableToFDA = true;
      delete drug["_owner"];
      return entities.drug.update(drug);
    });
    setConfirmSendDrugList(false);
    await Promise.all(promises);
    setShowSpinner(false);
  } catch (e) {
    console.log(e);
    setConfirmSendDrugList(false);
  }
};

const useBavaria = () => {
  return {
    SendDrugListToFDA,
    getDrugList,
    getStudyList,
    getStudyList,
    getStudyByID,
    approveStudy,
    createNewDrug,
    updateDrugData,
    disapproveStudy,
  };
};

export { useBavaria };
