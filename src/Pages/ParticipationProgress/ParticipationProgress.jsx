import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import useContest from "../../hooks/useContest";

const ParticipationProgress = () => {
  const { contests } = useContest();

  // Data mapping with fallback empty array
  const totalParticipates = contests?.allContest?.filter(
    (attend) => attend.attendance > 0
  ) || [];

  const data = totalParticipates.map((contest) => ({
    name: contest.contestName.length > 15 
      ? contest.contestName.slice(0, 15) + "..." 
      : contest.contestName,
    participation: contest.attendance,
  }));

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 min-h-[calc(100vh-150px)]">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1d3557] mb-4">
          Participation <span className="text-[#e63946]">Analytics</span>
        </h2>
        <p className="text-gray-500 font-medium">
          Track the growth and engagement levels across our various contests.
        </p>
      </div>

      {/* Chart Container */}
      <div className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl border border-gray-100">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 60, // Space for rotated labels
              }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e63946" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#e63946" stopOpacity={0}/>
                </linearGradient>
              </defs>
              
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                interval={0}
                angle={-45}
                textAnchor="end"
              />
              
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1d3557', 
                  borderRadius: '12px', 
                  border: 'none', 
                  color: '#fff' 
                }}
                itemStyle={{ color: '#fff' }}
              />
              
              <Legend verticalAlign="top" align="right" height={36}/>
              
              <Line
                type="monotone"
                dataKey="participation"
                stroke="#e63946"
                strokeWidth={4}
                dot={{ r: 6, fill: '#e63946', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 10, strokeWidth: 0 }}
                animationDuration={2000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Bottom Summary Stats (Optional) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-[#f1faee] p-6 rounded-2xl border border-teal-100">
              <p className="text-teal-600 text-xs font-black uppercase tracking-widest">Total Contests</p>
              <h3 className="text-2xl font-bold text-gray-800">{contests?.contestCount || 0}</h3>
          </div>
          <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
              <p className="text-red-400 text-xs font-black uppercase tracking-widest">Active Participation</p>
              <h3 className="text-2xl font-bold text-gray-800">{totalParticipates.length}</h3>
          </div>
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <p className="text-blue-400 text-xs font-black uppercase tracking-widest">Avg Engagement</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {totalParticipates.length > 0 
                  ? (totalParticipates.reduce((acc, curr) => acc + curr.attendance, 0) / totalParticipates.length).toFixed(1)
                  : 0}
              </h3>
          </div>
      </div>
    </div>
  );
};

export default ParticipationProgress;