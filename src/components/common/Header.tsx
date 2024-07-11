import useLogout from "@/hooks/useLogout";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

const Header = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  return (
    <Container>
      <LogoBox onClick={() => navigate("/")}>
        <Image src="/images/logo.png" />
        <h1>관리자</h1>
      </LogoBox>
      <LogoutButton onClick={logout}>로그아웃</LogoutButton>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px;

  border-bottom: 1px solid ${({ theme }) => theme.gray300.default};
`;

const Image = styled.img`
  height: 50px;
`;

const LogoBox = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;

  color: ${({ theme }) => theme.primary.default};
  font-size: 24px;
  font-weight: bold;
`;

const LogoutButton = styled.button``;

export default Header;
