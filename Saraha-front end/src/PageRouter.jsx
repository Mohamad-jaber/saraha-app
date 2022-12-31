import React, { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import Massages from "./components/Massages";
import VerifyEmail from "./components/VerifyEmail/VerifyEmail";
import { UserContext } from "./components/UserContext/UserProvider";
import SendMessage from "./components/SendMessage";
import SentCode from "./components/SentCode/SentCode";
import ResetPassword from "./components/ResetPassword";

const PageRouter = () => {
  const { loggedUser } = useContext(UserContext);

  return (
    <Routes>
      <Route element={<Layout />}>
        {loggedUser ? (
          <>
            <Route index element={<MainPage showMessage={true} />} />
            <Route path="Massages" element={<Massages />} />
          </>
        ) : (
          <>
            <Route index element={<Home />} />
            <Route path="/findUser" element={<MainPage showMessage={true} />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/verifyEmail" element={<VerifyEmail />} />
            <Route path="/SentCode" element={<SentCode />} />
            <Route path="/ForgetPassword" element={<ResetPassword />} />
          </>
        )}
        <Route path="/messageUser/:id" element={<SendMessage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default PageRouter;
