// import { MdOutlineMenu } from "react-icons/md";
// import Navlinks from "./Navlinks";
// import Logo from "../../components/Logo/Logo";
// import { Link, NavLink } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";
// import toast from "react-hot-toast";
// import useSingleUser from "../../hooks/useSingleUser";
// const Navbar = () => {
//   const { user, logOut } = useAuth();
//   const { userData, isLoading } = useSingleUser();

//   const handleLogout = () => {
//     logOut()
//       .then(() => {
//         toast.success("Logout successfully!");
//       })
//       .catch((err) => {
//         toast.error(err.message);
//       });
//   };
//   return (
//     <div className="bg-[#a8dadc]">
//       <div className="navbar  max-w-screen-xl mx-auto">
//         <div className="navbar-start">
//           <div className="dropdown">
//             <label tabIndex={0} className="btn btn-ghost lg:hidden">
//               <MdOutlineMenu className="text-3xl"></MdOutlineMenu>
//             </label>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
//             >
//               <Navlinks></Navlinks>
//             </ul>
//           </div>
//           <Logo></Logo>
//         </div>
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal px-1">
//             <Navlinks></Navlinks>
//           </ul>
//         </div>
//         <div className="navbar-end">
//           {user?.email ? (
//             <div className="dropdown dropdown-end">
//               <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
//                 <div className="w-10 rounded-full">
//                   <img
//                     alt="user"
//                     src={
//                       user?.photoURL
//                         ? user?.photoURL
//                         : "https://i.ibb.co/z6BC8H5/default-profile.png"
//                     }
//                   />
//                 </div>
//               </label>
//               <ul
//                 tabIndex={0}
//                 className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 space-y-3"
//               >
//                 <li className="ml-2 text-green-700">{user?.displayName}</li>
//                 {isLoading ? (
//                   <div>loading...</div>
//                 ) : (
//                   <li>
//                     <NavLink
//                       className={({ isActive }) =>
//                         isActive
//                           ? "md:text-[#e63946]  border border-[#e63946]"
//                           : "text-gray-800"
//                       }
//                       to={
//                         (userData?.role === "guest" &&
//                           "/dashboard/myParticipatedContest") ||
//                         (userData?.role === "creator" &&
//                           "/dashboard/myContest") ||
//                         (userData?.role === "admin" && "/dashboard/manageUsers")
//                       }
//                     >
//                       <button>Dashboard</button>
//                     </NavLink>
//                   </li>
//                 )}
//                 <li>
//                   <button
//                     onClick={handleLogout}
//                     className="btn btn-sm btn-outline btn-warning mt-1"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           ) : (
//             <Link to="/login">
//               <button className="btn btn-sm md:btn-md text-white outline-none border-none bg-[#e63946] hover:bg-[#eb5763]">
//                 Login
//               </button>
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

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
    <div className="sticky top-0 z-50 w-full bg-[#8f88da] backdrop-blur-md shadow-sm">
      <div className="navbar max-w-screen-xl mx-auto px-4 md:px-8">
        
        {/* Mobile Menu & Logo */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden p-0 mr-2">
              <MdOutlineMenu className="text-3xl text-[#1d3557]"></MdOutlineMenu>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-lg bg-white rounded-2xl w-56 space-y-2 border border-gray-100"
            >
              <Navlinks />
            </ul>
          </div>
          <Logo />
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2 font-medium">
            <Navlinks />
          </ul>
        </div>

        {/* Navbar End (User Profile / Login) */}
        <div className="navbar-end">
          {user?.email ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
                <div className="w-10 rounded-full ring ring-[#e63946] ring-offset-base-100 ring-offset-2">
                  <img
                    alt="user profile"
                    src={user?.photoURL || "https://i.ibb.co/z6BC8H5/default-profile.png"}
                  />
                </div>
              </label>
              
              <ul
                tabIndex={0}
                className="mt-4 z-[1] p-4 shadow-xl menu menu-sm dropdown-content bg-white rounded-2xl w-60 border border-gray-100"
              >
                <div className="px-2 pb-3 mb-2 border-b">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Logged in as</p>
                  <p className="text-[#1d3557] font-semibold truncate">{user?.displayName}</p>
                </div>

                {isLoading ? (
                  <div className="flex justify-center p-2">
                    <span className="loading loading-spinner loading-xs text-error"></span>
                  </div>
                ) : (
                  <li>
                    <NavLink
                      to={
                        (userData?.role === "guest" && "/dashboard/myParticipatedContest") ||
                        (userData?.role === "creator" && "/dashboard/myContest") ||
                        (userData?.role === "admin" && "/dashboard/manageUsers") || "/dashboard"
                      }
                      className={({ isActive }) =>
                        `flex items-center gap-2 p-3 rounded-lg transition-all ${
                          isActive 
                          ? "bg-[#e63946] text-white font-bold" 
                          : "hover:bg-gray-100 text-gray-700"
                        }`
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )}

                <li className="mt-2">
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-error btn-outline w-full rounded-lg hover:text-white"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn btn-sm md:btn-md px-6 text-white border-none bg-[#e63946] hover:bg-[#d62828] transition-all duration-300 rounded-full shadow-md">
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