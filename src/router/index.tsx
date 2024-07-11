import { useGetToken } from "@/context/TokenContext";

import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "@/pages/login";
import HomePage from "@/pages/home";
import AccusationPage from "@/pages/accusation";

const Router = () => {
  const token = useGetToken();

  return (
    <Routes>
      {token ? (
        <>
          <Route caseSensitive path="/" element={<HomePage />} />
          <Route path="notice">
            <Route path=":id" element={<div>notice id</div>} />
            <Route path="create" element={<div>notice new</div>} />
          </Route>
          <Route path="opinion">
            <Route path=":id" element={<div>opinion id</div>} />
          </Route>
          <Route path="accusation">
            <Route path=":id" element={<AccusationPage />} />
          </Route>
        </>
      ) : (
        <Route path="login" element={<LoginPage />} />
      )}
      <Route
        path="*"
        element={<Navigate to={token ? "/" : "/login"} replace />}
      />
    </Routes>
  );
};

export default Router;
