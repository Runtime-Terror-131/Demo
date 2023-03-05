import { createVendiaClient } from "@vendia/client";

const client = createVendiaClient({
  apiUrl: `https://hrkl2vlns8.execute-api.us-west-2.amazonaws.com/graphql/`,
  websocketUrl: `wss://gpp2p4q229.execute-api.us-west-2.amazonaws.com/graphql`,
  apiKey: `27SuZcZX8XstCb5jEyXtHdNhjgTgdxecrH8DN3L8V9Bk`,
});

const { entities } = client;

const useFDA = () => {
  return { entities };
};

export { useFDA };
