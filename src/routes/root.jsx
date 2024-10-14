import React from "react";
import SignUpForm from "../pages/SignUpForm";
import SideBar from "../components/SideBar";
import { Stack } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import appStyles from "../App.module.css";

const root = () => {
  return (
    <>
      <Stack direction="horizontal">
        <SideBar />
        <div className={`mx-auto ${appStyles.OutletDiv}`}>
          <Outlet />
        </div>
      </Stack>
    </>
  );
};

export default root;
