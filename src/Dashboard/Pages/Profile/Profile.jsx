import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";
import useWinnerData from "../../../hooks/useWinnerData";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import useSingleUser from "../../../hooks/useSingleUser";
import AOS from "aos";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaCameraRetro, FaChartPie } from "react-icons/fa";

const Profile = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, delay: 200, once: true });
  }, []);

  const { winningCount } = useWinnerData();
  const winning = winningCount?.filter((win) => win.status === "winner") || [];
  const { user, profileUpdate } = useAuth();
  const { userData } = useSingleUser();
  const navigate = useNavigate();

  const data = [
    { name: "Attempted", value: (winningCount?.length || 0) - (winning?.length || 0) },
    { name: "Win", value: winning?.length || 0 },
  ];

  const COLORS = ["#1d3557", "#e63946"]; // Matching your theme colors

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    
    profileUpdate(name, photo)
      .then(() => {
        toast.success("Profile updated successfully!");
        navigate("/dashboard/profile");
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
        
        {/* Left Side: Stats & Winning Percentage */}
        {userData?.role === "guest" && (
          <div data-aos="fade-right" className="w-full lg:w-1/2 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <FaChartPie className="text-[#e63946] text-2xl" />
              <h2 className="text-2xl font-bold text-[#1d3557]">Performance Analytics</h2>
            </div>
            
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 text-center">
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-gray-500 text-sm font-semibold uppercase">Total Attempted</p>
                <p className="text-2xl font-black text-[#1d3557]">{winningCount?.length || 0}</p>
              </div>
              <div className="p-4 bg-red-50 rounded-2xl">
                <p className="text-red-400 text-sm font-semibold uppercase">Contests Won</p>
                <p className="text-2xl font-black text-[#e63946]">{winning?.length || 0}</p>
              </div>
            </div>
          </div>
        )}

        {/* Right Side: Profile Update Form */}
        <div data-aos="fade-left" className="w-full max-w-md bg-[#1d3557] p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#e63946] rounded-full blur-[80px] opacity-40"></div>
          
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img
                  className="w-32 h-32 rounded-full object-cover border-4 border-[#e63946] shadow-lg"
                  src={user?.photoURL || "https://i.ibb.co/z6BC8H5/default-profile.png"}
                  alt="Profile"
                />
                <div className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md text-[#e63946]">
                   <FaCameraRetro size={14} />
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2 text-center flex items-center justify-center gap-2">
              <FaUserEdit className="text-gray-400" /> Account Settings
            </h2>
            <p className="text-gray-400 text-sm text-center mb-8">{user?.email}</p>

            <form onSubmit={handleProfileUpdate} className="space-y-5">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  Display Name
                </label>
                <input
                  className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white focus:border-[#e63946] outline-none transition-all placeholder:text-gray-600"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  defaultValue={user?.displayName}
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  Photo URL
                </label>
                <input
                  className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white focus:border-[#e63946] outline-none transition-all placeholder:text-gray-600"
                  name="photo"
                  type="text"
                  placeholder="Paste image link"
                  defaultValue={user?.photoURL}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#e63946] hover:bg-white hover:text-[#e63946] text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-xl transition-all duration-300 active:scale-95 mt-4"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;