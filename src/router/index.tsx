import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/login";

import { getToken } from "../utils/localStorage";

const Router = () => {
  const token = getToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route caseSensitive path="/" element={<div>home</div>} />
        <Route path="login" element={<LoginPage />} />
        <Route path="notice">
          <Route path=":id" element={<div>notice id</div>} />
          <Route path="create" element={<div>notice new</div>} />
        </Route>
        <Route path="opinion">
          <Route path=":id" element={<div>opinion id</div>} />
        </Route>
        <Route
          path="*"
          element={<Navigate to={token ? "/" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
