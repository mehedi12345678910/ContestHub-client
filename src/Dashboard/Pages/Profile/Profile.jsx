import { PieChart, Pie, Cell, Legend } from "recharts";
import useWinnerData from "../../../hooks/useWinnerData";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import useSingleUser from "../../../hooks/useSingleUser";
import AOS from "aos";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 300,
    });
  }, []);
  const { winningCount } = useWinnerData();
  const winning = winningCount.filter((win) => win.status === "winner");
  const { user, profileUpdate } = useAuth();

  const { userData } = useSingleUser();
  const data = [
    { name: "Attempted", value: winningCount?.length || 0 },
    { name: "Win", value: winning?.length || 0 },
  ];
  const COLORS = ["#00C49F", "#FF8042"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const navigate = useNavigate();
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    profileUpdate(name, photo)
      .then((res) => {
        toast.success("Profile updated successfully!");
        navigate("/dashboard/profile");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
        {userData?.role === "guest" && (
          <div>
            <h1
              data-aos="zoom-in-up"
              className="text-3xl text-blue-600 font-bold text-center mb-4"
            >
              Your <span className="text-amber-500">Winning</span> Percentage!!
            </h1>
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={180}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend></Legend>
            </PieChart>
          </div>
        )}
        <div className="w-96 mx-auto relative overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12 ">
          <h2
            data-aos="zoom-in-up"
            className="text-2xl font-bold text-white mb-6 text-center"
          >
            Update Your Profile
          </h2>
          <figure className="flex justify-center items-center">
            <img
              data-aos="zoom-in-up"
              className="mask mask-circle w-44"
              src={user?.photoURL}
            />
          </figure>

          <form onSubmit={handleProfileUpdate}>
            <div className="mb-4">
              <label
                data-aos="zoom-in-up"
                className="block text-sm font-medium text-gray-300"
              >
                Full Name
              </label>
              <input
                data-aos="zoom-in-up"
                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                type="text"
                name="name"
                defaultValue={user?.displayName}
              />
            </div>

            <div className="mb-4">
              <label
                data-aos="zoom-in-up"
                className="block text-sm font-medium text-gray-300"
              >
                Photo URL
              </label>
              <input
                data-aos="zoom-in-up"
                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                name="photo"
                type="text"
                defaultValue={user?.photoURL}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                type="submit"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
