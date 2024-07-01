import { useEffect } from "react";

const { Kakao }: any = window;

const KakaoLogin = () => {
  function loginWithKakao() {
    Kakao.Auth.authorize({
      redirectUri: window.location.origin + "/login",
      state: "userme",
    });

    Kakao.Auth.setAccessToken(Kakao.Auth.getAccessToken(), true);
  }

  const getLoginStatus = () => {
    Kakao.API.request({
      url: "/v2/user/me",
    })
      .then(function (res: any) {
        alert(JSON.stringify(res));
      })
      .catch(function (err: any) {
        alert("failed to request user information: " + JSON.stringify(err));
      });
  };

  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
    }

    if (window.location.href.includes("code")) {
      window.location.href = window.location.origin + "/login";
      Kakao.Auth.logout();
    }

    window.addEventListener("load", getLoginStatus);
    return () => {
      window.removeEventListener("load", getLoginStatus);
    };
  }, []);

  return (
    <a id="kakao-login-btn" onClick={loginWithKakao}>
      <img
        src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
        width="255"
        alt="카카오 로그인 버튼"
      />
    </a>
  );
};

export default KakaoLogin;
