import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useContest from "../../hooks/useContest";
import { useState } from "react";
import { BallTriangle } from "react-loader-spinner";

const ParticipationProgress = () => {
  const { contests } = useContest();

  const totalContest = contests.contestCount;
  const totalParticipates = contests?.allContest?.filter(
    (attend) => attend.attendance > 0
  );

  const data = totalParticipates?.map((contest) => ({
    name: contest.contestName,
    value: contest.attendance,
  }));

  return (
    <div className="max-w-7xl mx-auto min-h-[calc(100vh-150px)]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl leading-10 font-bold text-teal-600 text-center mt-8 mb-16">
          Explore Our Progress in Participation and Discover Opportunities for
          Engagement
        </h2>
      </div>

      <ResponsiveContainer width="90%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ParticipationProgress;
