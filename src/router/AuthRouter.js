import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserLayout } from "src/layouts/user";
import { SignInPage } from "src/pages/signin";
import { StartPage } from "src/pages/start";

export default function AuthRouterPage() {
  return (
    <UserLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />

          <Route path="*" element={<SignInPage />} exact />
        </Routes>
      </BrowserRouter>
    </UserLayout>
  );
}
