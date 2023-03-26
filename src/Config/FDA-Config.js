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
const useFDA = () => {
  return { getStudyList };
};

export { useFDA };
