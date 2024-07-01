import TokenProvider from "./context/TokenContext";

import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";

import { ThemeProvider } from "styled-components";
import { lightTheme } from "./styles/theme";

import Router from "./router";

function App() {
  return (
    <TokenProvider>
      <ApolloProvider client={client}>
        <ThemeProvider theme={lightTheme}>
          <Router />
        </ThemeProvider>
      </ApolloProvider>
    </TokenProvider>
  );
}

export default App;
