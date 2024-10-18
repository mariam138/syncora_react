import SideBar from "../components/SideBar";
import { Stack } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import TopNavbar from "../components/TopNavbar";

const root = () => {
  const currentUser = useCurrentUser();
  return (
    <>
      <Stack direction="horizontal">
        {currentUser && <TopNavbar />}
        <SideBar />
        <div className={`mx-auto `}>
          <Outlet />
        </div>
      </Stack>
    </>
  );
};

export default root;
