import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import AOS from "aos";
import { useEffect } from "react";
const PopularContest = ({ value }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 300,
    });
  }, []);
  const axiosSecure = useAxios();
  const {
    data: populars = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["popular", value],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `/contests/popular?attendance=attendance&order=desc&searchValue=${value}`
        );
        return res.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {isError.message}</div>;
  }

  return (
    <div>
      <div className="text-center max-w-3xl mx-auto my-8 space-y-3">
        <h2 data-aos="zoom-in-up" className="text-3xl font-bold text-gray-700">
          Top Of The Contest You Can Join The Contest!!!
        </h2>
        <p data-aos="zoom-in-up" className="text-gray-600">
          Explore and participate in our top-rated contests! Engage in the
          latest and most exciting challenges in the world of competitions. From
          innovative projects to thrilling tasks, discover opportunities that
          await you in our 'Top of the Contest' section. Join now and showcase
          your skills!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {populars.map((popular) => (
          <div
            key={popular._id}
            className="w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <img
              data-aos="zoom-in-up"
              className="p-3 h-64 lg:h-72 w-full rounded-t-lg"
              src={popular.image}
              alt="product image"
            />

            <div className="px-5 pb-5">
              <h5
                data-aos="zoom-in-up"
                className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
              >
                {popular.contestName}
              </h5>

              <div
                data-aos="zoom-in-up"
                className=" text-gray-900 dark:text-gray-200 mt-2.5 mb-5"
              >
                {popular?.description && popular.description.length > 80
                  ? `${popular.description.slice(0, 80)}...`
                  : popular?.description}
              </div>
              <div className="flex items-center justify-between">
                <span
                  data-aos="zoom-in-up"
                  className="text-2xl font-bold text-gray-900 dark:text-gray-200"
                >
                  Attempted: {popular?.attendance}
                </span>
                <Link to={`/contestDetails/${popular?._id}`}>
                  <button
                    data-aos="zoom-in-up"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    See Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularContest;
