import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import AOS from "aos";
import { useEffect } from "react";
const Advertisement = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 300,
    });
  }, []);
  const axiosSecure = useAxios();
  const { data: winners = [] } = useQuery({
    queryKey: ["winners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/winners/advertise");
      return res.data;
    },
  });

  return (
    <div className="max-w-6xl mt-16 mx-auto mb-16 p-3">
      <div className="mb-10 max-w-2xl mx-auto text-center">
        <h1
          data-aos="zoom-in-up"
          className="text-3xl font-bold mb-3 text-gray-700"
        >
          Latest winner in different contest we found !
        </h1>
        <p data-aos="zoom-in-up" className="text-gray-500">
          Welcome to our Champion's Corner, where triumphs come to life!
          Discover the essence of victory as we showcase the extraordinary
          winners of our contests. Immerse yourself in the gallery of champions,
          witness their journey, and be inspired by their exceptional
          achievements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  ">
        {winners.map((winner) => (
          <div
            key={winner._id}
            className="bg-slate-200 shadow-lg flex flex-col  mt-16 justify-center items-center py-4 h-56"
          >
            <div className="-mt-20 h-24 w-24 overflow-hidden">
              <img
                data-aos="zoom-in-up"
                src={winner.winnerImage}
                className="rounded-full object-cover w-full h-full"
                alt=""
              />
            </div>
            <h1
              data-aos="zoom-in-up"
              className="text-orange-500 text-lg font-semibold"
            >
              {winner.winnerName}
            </h1>
            <div className="flex flex-col justify-center text-center lg:space-x-3">
              <p data-aos="zoom-in-up" className="text-center text-sm p-5">
                {winner.contestName}
              </p>
              <p
                data-aos="zoom-in-up"
                className="text-black font-bold lg:mt-[5px]"
              >
                Total Attendance: {winner.attendance}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advertisement;
