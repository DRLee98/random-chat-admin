import { useNavigate } from "react-router-dom";
import useLoginAndSetToken from "@/hooks/useLoginAndSetToken";

import styled from "styled-components";

import NaverLogin from "@/components/login/NaverLogin";

import { SocialPlatform } from "@/graphql/__generated__/graphql";

import type { NaverUser } from "@/components/login/NaverLogin";
import type { LoginInput } from "@/graphql/__generated__/graphql";

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useLoginAndSetToken();

  const onNaverLogin = (user: NaverUser) => {
    loginFn({
      socialId: user.id,
      socialPlatform: SocialPlatform.Naver,
    });
  };

  const loginFn = async (input: LoginInput) => {
    const result = await login({
      socialId: input.socialId,
      socialPlatform: input.socialPlatform,
    });
    if (result) {
      navigate("/");
    } else {
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Image src="/images/logo.png" />
      <ButtonBox>
        <NaverLogin onLogin={onNaverLogin} />
        {/* <KakaoLogin /> */}
      </ButtonBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;

  width: 100%;
  padding-bottom: 30px;
`;

export default LoginPage;
