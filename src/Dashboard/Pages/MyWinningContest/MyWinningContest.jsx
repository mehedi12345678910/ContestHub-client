import { MdDoNotDisturbOnTotalSilence, MdWatchLater } from "react-icons/md";
import { FaCrown } from "react-icons/fa6";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import useWinnerData from "../../../hooks/useWinnerData";
const MyWinningContest = () => {
  const { winningCount } = useWinnerData();
  const pending = winningCount.filter((win) => win.status === "pending");
  const winning = winningCount.filter((win) => win.status === "winner");

  const colors = ["#00C49F", "#FFBB28"];
  const data = [
    { name: "Pending", value: pending.length },
    { name: "Winning", value: winning.length },
  ];
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
  Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex gap-8 flex-col  justify-center items-center">
        <div>
          <div className="stats shadow ">
            <div className="stat place-items-center">
              <div className="stat-title">Total Participate</div>
              <div className="stat-value flex items-center gap-1">
                <MdDoNotDisturbOnTotalSilence /> {winningCount.length}
              </div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Pending</div>
              <div className="stat-value text-secondary flex items-center gap-1">
                <MdWatchLater /> {pending.length}
              </div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Win In</div>
              <div className="stat-value flex items-center gap-1 text-amber-500">
                <FaCrown /> {winning.length}
              </div>
            </div>
          </div>
        </div>
        {/* chart */}
        <div>
          <BarChart
            width={480}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar
              dataKey="value"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 2]} />
              ))}
            </Bar>
          </BarChart>
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-700 text-center my-8">
          All Of Your Achievement
        </h1>
        <div className="overflow-x-auto">
          <table className="table min-w-[800px]">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Contest</th>
                <th>Creator</th>
                <th>Attend In</th>
              </tr>
            </thead>
            <tbody>
              {winning.map((win, idx) => (
                <tr key={win._id}>
                  <th>{idx + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={win?.contestImage} alt="Avatar" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{win?.contestName}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {win?.creatorName}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {win?.creatorEmail}
                    </span>
                  </td>
                  <td>{win?.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyWinningContest;
