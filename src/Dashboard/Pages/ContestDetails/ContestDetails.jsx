// import { Link, useLoaderData } from "react-router-dom";
// import { FaCrown, FaUserFriends, FaTrophy } from "react-icons/fa";
// import { BsFillPinAngleFill, BsClockHistory } from "react-icons/bs";
// import { useEffect, useState } from "react";
// import Timer from "../../../components/Timer/Timer";

// const ContestDetails = () => {
//   const contest = useLoaderData();
//   const [totalDays, setTotalDays] = useState(0);

//   useEffect(() => {
//     if (contest?.deadline) {
//       const inputDate = new Date(contest.deadline);
//       const currentDate = new Date();
//       const timeDifference = inputDate.getTime() - currentDate.getTime();
//       const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
//       setTotalDays(daysDifference > 0 ? daysDifference : 0);
//     }
//   }, [contest.deadline]);

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
//       <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
//         <div className="flex flex-col lg:flex-row">
          
//           {/* Left Side: Image Section */}
//           <div className="lg:w-1/2 relative overflow-hidden group">
//             <img
//               src={contest.image}
//               alt={contest.contestName}
//               className="object-cover w-full h-full min-h-[300px] lg:min-h-[500px] transition-transform duration-700 group-hover:scale-105"
//             />
//             {/* Prize Tag on Image */}
//             <div className="absolute top-6 left-6 bg-[#e63946] text-white px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
//               <FaTrophy className="text-yellow-300" />
//               Prize: ${contest.prize}
//             </div>
//           </div>

//           {/* Right Side: Content Section */}
//           <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-between">
//             <div>
//               {/* Header */}
//               <div className="flex items-center gap-2 mb-2">
//                 <span className="bg-blue-100 text-[#1d3557] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
//                   {contest.category || "Official Contest"}
//                 </span>
//               </div>
//               <h1 className="text-3xl md:text-4xl font-extrabold text-[#1d3557] mb-4">
//                 {contest.contestName}
//               </h1>

//               {/* Status & Stats */}
//               <div className="grid grid-cols-2 gap-4 mb-6">
//                 <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3 border border-gray-100">
//                   <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
//                     <FaUserFriends className="text-xl" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 font-bold uppercase">Attendance</p>
//                     <p className="text-lg font-bold text-gray-800">{contest.attendance}</p>
//                   </div>
//                 </div>

//                 <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3 border border-gray-100">
//                   <div className="bg-red-100 p-3 rounded-xl text-red-600">
//                     <BsClockHistory className="text-xl" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 font-bold uppercase">Time Left</p>
//                     <div className="text-sm font-bold text-gray-800">
//                       {contest?.winnerEmail || totalDays <= 0 ? (
//                         <span className="text-red-500 italic">Closed</span>
//                       ) : (
//                         <Timer duration={totalDays * 24 * 60 * 60 * 1000} />
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Description */}
//               <div className="mb-8">
//                 <h3 className="text-lg font-bold text-[#1d3557] mb-2 flex items-center gap-2">
//                    About This Contest
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed text-sm md:text-base">
//                   {contest.description}
//                 </p>
//               </div>

//               {/* Winner Section */}
//               {contest?.winnerEmail && (
//                 <div className="bg-[#f1faee] border-2 border-teal-200 p-6 rounded-3xl mb-8 relative overflow-hidden animate-fade-in">
//                   <FaCrown className="absolute -top-2 -right-2 text-6xl text-teal-100 rotate-12" />
//                   <div className="flex items-center gap-4 relative z-10">
//                     <div className="avatar">
//                       <div className="w-16 h-16 rounded-2xl ring ring-teal-500 ring-offset-base-100 ring-offset-2 overflow-hidden">
//                         <img src={contest.winnerImage} alt={contest.winnerName} />
//                       </div>
//                     </div>
//                     <div>
//                       <p className="text-teal-700 text-xs font-black uppercase tracking-widest">Grand Winner</p>
//                       <h4 className="text-xl font-bold text-gray-800">{contest.winnerName}</h4>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Registration CTA */}
//             <div className="mt-auto">
//               {totalDays <= 0 || contest?.winnerEmail ? (
//                 <button
//                   disabled
//                   className="w-full flex items-center justify-center gap-3 bg-gray-200 text-gray-500 py-4 rounded-2xl font-black text-lg cursor-not-allowed uppercase transition-all"
//                 >
//                   <BsFillPinAngleFill className="text-xl" />
//                   Registration Closed
//                 </button>
//               ) : (
//                 <Link to={`/payment/${contest._id}`}>
//                   <button className="w-full flex items-center justify-center gap-3 bg-[#1d3557] hover:bg-[#e63946] text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 transition-all duration-300 active:scale-95 uppercase">
//                     <BsFillPinAngleFill className="text-xl" />
//                     Join Contest Now
//                   </button>
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContestDetails;

import { Link, useLoaderData } from "react-router-dom";
import { FaCrown, FaUserFriends, FaTrophy } from "react-icons/fa";
import { BsFillPinAngleFill, BsClockHistory } from "react-icons/bs";
import { useEffect, useState } from "react";
import Timer from "../../../components/Timer/Timer";

const ContestDetails = () => {
  const contest = useLoaderData();
  const [remainingTime, setRemainingTime] = useState(0);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (contest?.deadline) {
      const deadlineStr = contest.deadline.includes("T") 
        ? contest.deadline 
        : `${contest.deadline}T23:59:59`;

      const deadlineDate = new Date(deadlineStr).getTime();
      
      const updateTimer = () => {
        const now = new Date().getTime();
        const timeDifference = deadlineDate - now;

        if (timeDifference <= 0) {
          setRemainingTime(0);
          setIsExpired(true);
        } else {
          setRemainingTime(timeDifference);
          setIsExpired(false);
        }
      };

      // Initial check
      updateTimer();

      // Live update protigontay ba protisekond-e (Timer component-er jonno)
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [contest?.deadline]);

  // Logic to determine if registration is blocked
  const isRegistrationClosed = isExpired || !!contest?.winnerEmail;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
        <div className="flex flex-col lg:flex-row">
          

          {/* Right Side: Content Section */}
          <div className="lg:w-1/2 p-8 md:p-12 flex flex-col">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-100 text-[#1d3557] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {contest.contestType || "Official Contest"}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#1d3557] mb-4">
                {contest.contestName}
              </h1>

              {/* Status & Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3 border border-gray-100">
                  <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                    <FaUserFriends className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Attendance</p>
                    <p className="text-lg font-bold text-gray-800">{contest.attendance || 0}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3 border border-gray-100">
                  <div className="bg-red-100 p-3 rounded-xl text-red-600">
                    <BsClockHistory className="text-xl" />
                  </div>
                  <div>
                    {/* <p className="text-xs text-gray-500 font-bold uppercase">Time Left</p>
                    <div className="text-sm font-bold text-gray-800">
                      {isRegistrationClosed ? (
                        <span className="text-red-500 italic font-black">Closed</span>
                      ) : (
                        <Timer duration={remainingTime} />
                      )}
                    </div> */}
                    <p>Time Running</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#1d3557] mb-2 flex items-center gap-2">
                   About This Contest
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {contest.description}
                </p>
              </div>

              {/* Winner Section */}
              {contest?.winnerEmail && (
                <div className="bg-[#f1faee] border-2 border-teal-200 p-6 rounded-3xl mb-8 relative overflow-hidden animate-fade-in">
                  <FaCrown className="absolute -top-2 -right-2 text-6xl text-teal-100 rotate-12" />
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="avatar">
                      <div className="w-16 h-16 rounded-2xl ring ring-teal-500 ring-offset-base-100 ring-offset-2 overflow-hidden">
                        <img src={contest.winnerImage} alt={contest.winnerName} />
                      </div>
                    </div>
                    <div>
                      <p className="text-teal-700 text-xs font-black uppercase tracking-widest">Grand Winner</p>
                      <h4 className="text-xl font-bold text-gray-800">{contest.winnerName}</h4>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Registration CTA */}
            <div className="mt-auto">
              {isRegistrationClosed ? (
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-3 bg-gray-200 text-gray-500 py-4 rounded-2xl font-black text-lg cursor-not-allowed uppercase transition-all"
                >
                  <BsFillPinAngleFill className="text-xl" />
                  Registration Closed
                </button>
              ) : (
                <Link to={`/payment/${contest._id}`}>
                  <button className="w-full flex items-center justify-center gap-3 bg-[#1d3557] hover:bg-[#e63946] text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 transition-all duration-300 active:scale-95 uppercase">
                    <BsFillPinAngleFill className="text-xl" />
                    Join Contest Now
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;