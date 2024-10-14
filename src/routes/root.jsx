import React from "react";
import SignUpForm from "../pages/SignUpForm";
import SideBar from "../components/SideBar";
import {Stack } from "react-bootstrap";


const root = () => {
  return (
    <>
      <Stack direction="horizontal">
        <SideBar />
        <SignUpForm />
      </Stack>
    </>
  );
};

export default root;
