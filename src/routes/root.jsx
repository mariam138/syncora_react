import SideBar from "../components/SideBar";
import { Stack } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const root = () => {
  return (
    <>
      <Stack direction="horizontal">
        <SideBar />
        <div className={`mx-auto`}>
          <Outlet />
        </div>
      </Stack>
    </>
  );
};

export default root;
