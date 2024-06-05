import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";

import { ThemeProvider } from "styled-components";
import { lightTheme } from "./styles/theme";

import Router from "./router";

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={lightTheme}>
        <Router />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
