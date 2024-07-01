import { ApolloClient, ApolloLink, InMemoryCache, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import { getMainDefinition } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";

import { getStorageToken, removeStorageToken } from "./utils/localStorage";

const httpLink = createUploadLink({
  uri: process.env.REACT_APP_API_URL,
});

const authLink = setContext(async (_, { headers }) => {
  const token = getStorageToken();
  return {
    headers: {
      ...headers,
      "Apollo-Require-Preflight": "true",
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, forward, operation }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions?.code) {
          case "UNAUTHENTICATED":
            removeStorageToken();

            return forward(operation);
        }
      }
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError.message}`);
    }
  },
);

export const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink as unknown as ApolloLink)]),
  cache: new InMemoryCache(),
});
