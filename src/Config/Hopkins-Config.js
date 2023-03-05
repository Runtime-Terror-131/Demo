import { createVendiaClient } from "@vendia/client";

const client = createVendiaClient({
  apiUrl: `
    https://sbdvivo3e2.execute-api.us-west-2.amazonaws.com/graphql/`,
  websocketUrl: `
    wss://hkfgp9zyq9.execute-api.us-west-2.amazonaws.com/graphql`,
  apiKey: `GgUY5tapGJCWo6gT8Luwc3YMc1VxJVCqcwW7XNEcwoPc`,
});

const { entities } = client;
const getAll = async () => {
  try {
    const patients = await entities.patient.list();
    return patients;
  } catch (e) {
    return e;
  }
};

const useJaneHopkins = () => {
  return { entities, getAll };
};

export { useJaneHopkins };
