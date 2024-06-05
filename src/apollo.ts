import { ApolloClient, ApolloLink, InMemoryCache, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import { getMainDefinition } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";

import { getToken, removeToken } from "./utils/localStorage";

const httpLink = createUploadLink({
  uri: process.env.REACT_APP_API_URL,
});

const authLink = setContext(async (_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      "Apollo-Require-Preflight": "true",
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// const wsLink = new WebSocketLink({
//   uri: process.env.WS_REACT_APP_API_URL,
//   options: {
//     reconnect: true,
//     connectionParams: async () => {
//       const token = getToken();
//       return {
//         authorization: token ? `Bearer ${token}` : "",
//       };
//     },
//   },
// });

const errorLink = onError(
  ({ graphQLErrors, networkError, forward, operation }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions?.code) {
          case "UNAUTHENTICATED":
            removeToken();

            return forward(operation);
        }
      }
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError.message}`);
    }
  },
);

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   authLink.concat(httpLink as unknown as ApolloLink),
// );

export const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink as unknown as ApolloLink)]),
  cache: new InMemoryCache(),
});
