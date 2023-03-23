import { createVendiaClient } from "@vendia/client";

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
const useJaneHopkins = () => {
  return {
    entities,
    getAll,
    getByID,
    createNewPatient,
    updatePatientData,
    deletePatient,
  };
};

export { useJaneHopkins };
