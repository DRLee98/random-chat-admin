import { useGetToken } from "@/context/TokenContext";

import styled from "styled-components";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const token = useGetToken();
  return (
    <Container>
      {token && <Header />}
      <Page>{children}</Page>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
`;

const Page = styled.div`
  width: 100%;
  height: 100%;
`;

export default Layout;
