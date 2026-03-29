import { Link, useLoaderData } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { BsFillPinAngleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import Timer from "../../../components/Timer/Timer";

const ContestDetails = () => {
  const contest = useLoaderData();
  
  const [dateString, setDateString] = useState(contest.deadline);
  const [totalDays, setTotalDays] = useState(0);

  useEffect(() => {
    const inputDate = new Date(dateString);
    const currentDate = new Date();

    const timeDifference = inputDate.getTime() - currentDate.getTime(); //
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    setTotalDays(daysDifference);
  }, [dateString]);
  console.log(contest);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="flex flex-col lg:flex-row max-w-7xl justify-center items-center">
            <div className="overflow-hidden w-full m-4 shadow-sm flex flex-col lg:flex-row justify-center">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="w-full overflow-hidden">
                  <img
                    src={contest.image}
                    alt=""
                    className="object-cover w-full"
                  />
                </div>
                <div className="md:w-2/3 m-4">
                  <div className="font-bold text-neutral-700 text-xl m-2">
                    {contest.contestName}
                  </div>
                  <div className="flex text-neutral-600 text-xl m-2">
                    <div className="m-1 font-bold">Prize:</div>
                    <div className="m-1">$ {contest.prize}</div>
                  </div>
                  <div className="flex text-red-600 m-2">
                    <div className="m-1 font-bold">Deadline:</div>
                    <div className="m-1 text-yellow-500">
                      {contest?.winnerEmail ? (
                        <p className="text-lg text-red-600">Contest Closed</p>
                      ) : (
                        <Timer duration={totalDays * 24 * 60 * 60 * 1000} />
                      )}
                    </div>
                  </div>
                  <div className="flex text-green-600 text-sm m-2">
                    <div className="m-1 font-bold">Attendance:</div>
                    <div className="m-1">{contest.attendance}</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-4 m-2">
                    <p>{contest.description}</p>
                  </div>
                  <div className="divider"></div>
                  {contest?.winnerEmail && (
                    <div className="flex cursor-pointer mt-5">
                      <div className="avatar indicator">
                        <span className="indicator-item badge badge-neutral">
                          <FaCrown className="text-amber-500 mr-1"></FaCrown>
                          Winner
                        </span>
                        <div className="w-14 h-14 rounded-full">
                          <img alt="winner" src={contest.winnerImage} />
                        </div>
                      </div>
                      <div className="grid m-1">
                        <div className="font-bold text-sm hover:text-gray-600 mt-2">
                          {contest.winnerName}
                        </div>
                      </div>
                    </div>
                  )}
                  {contest.winnerName && <div className="divider"></div>}

                  {totalDays <= 0 || contest?.winnerEmail ? (
                    <button
                      disabled
                      className="btn btn-block btn-neutral text-lg"
                    >
                      <BsFillPinAngleFill className="text-2xl" />
                      Not available
                    </button>
                  ) : (
                    <Link to={`/payment/${contest._id}`}>
                      <button className="btn btn-block btn-neutral text-lg">
                        <BsFillPinAngleFill className="text-2xl" />
                        Register
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
