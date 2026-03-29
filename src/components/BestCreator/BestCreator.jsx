import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { useEffect } from "react";
import AOS from "aos";

const BestCreator = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 300,
    });
  }, []);
  const axiosSecure = useAxios();
  const { data: bestCreator = [] } = useQuery({
    queryKey: ["bestCreator"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bestCreator`);
      return res.data;
    },
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-2xl md:text-5xl font-medium flex justify-center my-6 ">
        <div data-aos="zoom-in-up">Best Contest Creator With </div>
        <div data-aos="zoom-in-up" className="text-cyan-400 mx-1">
          Success!
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {bestCreator.map((creator) => (
          <div
            key={creator._id}
            style={{ borderRadius: "70px 10px 70px 10px" }}
            className="overflow-hidden w-full m-4 flex justify-center  shadow-xl bg-cyan-400"
          >
            <div className="flex flex-col md:flex-row items-center justify-center bg-white rounded-tl-full">
              <div className="items-center justify-center flex py-2">
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center">
                    <div className="p-1 bg-white rounded-full w-36 h-36 overflow-hidden">
                      <img
                        data-aos="zoom-in-up"
                        src={creator?.creatorImage}
                        alt=""
                        className="rounded-full w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div
                        data-aos="zoom-in-up"
                        className="font-bold text-stone-500 mx-4"
                      >
                        {creator?.creatorName}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm px-4 font-medium text-stone-500 hover:text-stone-500 mx-4">
                    <span
                      data-aos="zoom-in-up"
                      className="text-teal-600 font-bold"
                    >
                      One Of The Best Contest:
                    </span>
                    {creator?.contestName}
                  </div>
                  <div
                    data-aos="zoom-in-up"
                    className="text-stone-400 m-2 px-4"
                  >
                    {creator?.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestCreator;
