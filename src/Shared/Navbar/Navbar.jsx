import { MdOutlineMenu } from "react-icons/md";
import Navlinks from "./Navlinks";
import Logo from "../../components/Logo/Logo";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useSingleUser from "../../hooks/useSingleUser";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const { userData, isLoading } = useSingleUser();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logout successfully!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div className="bg-[#a8dadc]">
      <div className="navbar  max-w-screen-xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <MdOutlineMenu className="text-3xl"></MdOutlineMenu>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <Navlinks></Navlinks>
            </ul>
          </div>
          <Logo></Logo>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <Navlinks></Navlinks>
          </ul>
        </div>
        <div className="navbar-end">
          {user?.email ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="user"
                    src={
                      user?.photoURL
                        ? user?.photoURL
                        : "https://i.ibb.co/z6BC8H5/default-profile.png"
                    }
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 space-y-3"
              >
                <li className="ml-2 text-green-700">{user?.displayName}</li>
                {isLoading ? (
                  <div>loading...</div>
                ) : (
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "md:text-[#e63946]  border border-[#e63946]"
                          : "text-gray-800"
                      }
                      to={
                        (userData?.role === "guest" &&
                          "/dashboard/myParticipatedContest") ||
                        (userData?.role === "creator" &&
                          "/dashboard/myContest") ||
                        (userData?.role === "admin" && "/dashboard/manageUsers")
                      }
                    >
                      <button>Dashboard</button>
                    </NavLink>
                  </li>
                )}
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-outline btn-warning mt-1"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn btn-sm md:btn-md text-white outline-none border-none bg-[#e63946] hover:bg-[#eb5763]">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
