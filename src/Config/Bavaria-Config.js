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
const useBavaria = () => {
  return { getDrugList, getStudyList };
};

export { useBavaria };
