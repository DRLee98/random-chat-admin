import { useGetToken } from "@/context/TokenContext";

import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "@/pages/login";
import HomePage from "@/pages/home";
import AccusationPage from "@/pages/accusation";
import NewNoticePage from "@/pages/notice/new";
import EditNoticePage from "@/pages/notice/edit";

const Router = () => {
  const token = useGetToken();

  return (
    <Routes>
      {token ? (
        <>
          <Route caseSensitive path="/" element={<HomePage />} />
          <Route path="notice">
            <Route path=":id" element={<EditNoticePage />} />
            <Route path="create" element={<NewNoticePage />} />
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
