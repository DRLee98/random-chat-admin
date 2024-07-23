import TokenProvider from "./context/TokenContext";
import PasswordProvider from "./context/PasswordContext";

import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";

import { ThemeProvider } from "styled-components";
import { lightTheme } from "./styles/theme";

import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import Layout from "./components/common/Layout";

function App() {
  return (
    <TokenProvider>
      <ApolloProvider client={client}>
        <ThemeProvider theme={lightTheme}>
          <PasswordProvider>
            <BrowserRouter>
              <Layout>
                <Router />
              </Layout>
            </BrowserRouter>
          </PasswordProvider>
        </ThemeProvider>
      </ApolloProvider>
    </TokenProvider>
  );
}

export default App;
