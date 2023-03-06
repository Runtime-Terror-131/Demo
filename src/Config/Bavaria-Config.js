import { createVendiaClient } from "@vendia/client";

const client = createVendiaClient({
  apiUrl: `https://5q33927xva.execute-api.us-west-2.amazonaws.com/graphql/`,
  websocketUrl: `wss://d7qb1fw83i.execute-api.us-west-2.amazonaws.com/graphql`,
  apiKey: `2xrL32ceK8rUsTZG7gqX7RS7JaNuoVV78sWRDgvnMUZe`,
});

const { entities } = client;

const useBavaria = () => {
  return { entities };
};

export { useBavaria };
