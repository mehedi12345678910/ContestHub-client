import { useState } from "react";
// Components

// import MenuItem from "./MenuItem";
// import ToggleBtn from "../../Button/ToggleBtn";
// Icons
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";

import Logo from "../../components/Logo/Logo";
import CreatorMenu from "../Menu/CreatorMenu";
import MenuItem from "../MenuItem";
import { FaHome } from "react-icons/fa";
import AdminMenu from "../Menu/AdminMenu";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import GuestMenu from "../Menu/GuestMenu";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { user, loader, logOut } = useAuth();
  const [isActive, setActive] = useState(true);
  const axiosSecure = useAxios();
  const { data: userData } = useQuery({
    enabled: !loader,
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  const handleLogout = () => {
    logOut().then(() => {
      toast.success("logout successfully!");
    });
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 z-50 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Logo></Logo>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`z-50 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <Logo></Logo>
          {userData?.role === "creator" && <CreatorMenu></CreatorMenu>}
          {userData?.role === "admin" && <AdminMenu></AdminMenu>}
          {userData?.role === "guest" && <GuestMenu></GuestMenu>}
        </div>
        <div>
          <hr />
          <MenuItem icon={FaHome} label="Home" address="/" />

          <MenuItem
            icon={FcSettings}
            label="Profile"
            address="/dashboard/profile"
          />
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
