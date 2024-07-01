import { useGetToken } from "@/context/TokenContext";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "@/pages/login";

const Router = () => {
  const token = useGetToken();

  return (
    <BrowserRouter>
      <Routes>
        {token ? (
          <>
            <Route caseSensitive path="/" element={<div>home</div>} />
            <Route path="notice">
              <Route path=":id" element={<div>notice id</div>} />
              <Route path="create" element={<div>notice new</div>} />
            </Route>
            <Route path="opinion">
              <Route path=":id" element={<div>opinion id</div>} />
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
    </BrowserRouter>
  );
};

export default Router;
