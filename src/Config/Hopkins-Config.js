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
// const getUserData = (UID, setLoginUserType, setLoginUserName) => {
//   try {
//     // there is an issue here when registering a new email, user sometimes is a promise stil even inside
//     entities.user
//       .list()
//       .then((result) => {
//         let user = result.items.filter((item) => item.UserUID == UID)[0];
//         return user;
//       })
//       .then((user) => {
//         if (user != null) {
//           setLoginUserType(user.UserUID);
//           setLoginUserName(user.name);
//         } else {
//           console.log("user promise is not resolved");
//           console.log(user);
//         }
//       });
//   } catch (e) {
//     console.log(e);
//   }
// };
const getUserData = async (
  UID,
  setLoginUserType,
  setLoginUserName,
  setShowSpinner
) => {
  try {
    // Wait for 2 seconds before getting user data
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const result = await entities.user.list();
    const user = result.items.filter((item) => item.UserUID === UID)[0];

    if (user) {
      setLoginUserType(user.userType);
      setLoginUserName(user.name);
    } else {
      throw "User not found. this could be related to old emails that are not available in our User Schema in vendia";
    }
  } catch (e) {
    console.log(e);
    setShowSpinner(false);
    return e;
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
  };
};

export { useJaneHopkins };
