import { useEffect } from "react";

window.name = "opener";
const { naver }: any = window;

export interface NaverUser {
  id: string;
  nickname: string;
  profile_image?: string;
}

interface NaverLoginProps {
  onLogin: (user: NaverUser) => void;
}

const NaverLogin = ({ onLogin }: NaverLoginProps) => {
  const clientId = process.env.REACT_APP_NAVER_CLIENT_ID;
  const callbackUrl = window.location.origin + "/login";

  const naverLogin = new naver.LoginWithNaverId({
    clientId,
    callbackUrl,
    isPopup: false,
    loginButton: { type: 3, height: "55" },
  });

  const getLoginStatus = () => {
    naverLogin.getLoginStatus(function (status: boolean) {
      if (status) {
        onLogin(naverLogin.user);
        naverLogin.logout();
      }
    });
  };

  useEffect(() => {
    naverLogin.init();

    if (window.location.href.includes("access_token")) {
      window.location.href = window.location.origin + "/login";
    }

    window.addEventListener("load", getLoginStatus);
    return () => {
      window.removeEventListener("load", getLoginStatus);
    };
  }, []);

  return <div id="naverIdLogin"></div>;
};

export default NaverLogin;
