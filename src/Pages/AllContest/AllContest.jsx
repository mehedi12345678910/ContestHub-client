import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Contest from "./Contest";
import { FaBriefcase, FaFirstAid, FaGamepad } from "react-icons/fa";
import { FaFilePen } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import AOS from "aos";
const AllContest = () =>
{
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 300,
    });
  }, []);
  const axiosSecure = useAxios();
  const [category, setCategory] = useState("");
  const handleClick = (type) => {
    setCategory(type);
  };
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allContest", category, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contests?category=${category}&status=Accepted&page=${page}&limit=${limit}`
      );
      return res?.data;
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
    return <div>{isError.message}</div>;
  }

  const totalContest = data?.contestCount;
  const pages = Math?.ceil(totalContest / limit);
  const pageOfNum = [...Array(pages).fill(0)];

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    if (page < pages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex gap-4 justify-center items-center overflow-auto px-4">
        <div
          data-aos="zoom-in-up"
          onClick={() => handleClick("Business Contest")}
          className={`flex flex-col  items-center justify-center gap-2 p-3 hover:text-neutral-800 transition cursor-pointer ${
            category === "Business Contest"
              ? " text-blue-600 border-blue-600 border-b-4"
              : ""
          }`}
        >
          <FaBriefcase size={26}></FaBriefcase>
          <p className="text-sm font-medium">Business Contest</p>
        </div>
        <div
          data-aos="zoom-in-up"
          onClick={() => handleClick("Medical Contest")}
          className={`flex flex-col  items-center justify-center gap-2 p-3 hover:text-neutral-800 transition cursor-pointer ${
            category === "Medical Contest"
              ? " text-blue-600 border-blue-600 border-b-4"
              : ""
          }`}
        >
          <FaFirstAid size={26} />
          <p className="text-sm font-medium">Medical Contest</p>
        </div>
        <div
          data-aos="zoom-in-up"
          onClick={() => handleClick("Article Writing")}
          className={`flex flex-col  items-center justify-center gap-2 p-3 hover:text-neutral-800 transition cursor-pointer ${
            category === "Article Writing"
              ? " text-blue-600 border-blue-600 border-b-4"
              : ""
          }`}
        >
          <FaFilePen size={26} />
          <p className="text-sm font-medium">Article Writing</p>
        </div>
        <div
          data-aos="zoom-in-up"
          onClick={() => handleClick("Gaming")}
          className={`flex flex-col  items-center justify-center gap-2 p-3 hover:text-neutral-800 transition cursor-pointer ${
            category === "Gaming"
              ? " text-blue-600 border-blue-600 border-b-4"
              : ""
          }`}
        >
          <FaGamepad size={26} />
          <p className="text-sm font-medium">Gaming</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 mb-8 gap-4 px-2">
        {data?.allContest?.map((contest) => (
          <Contest key={contest._id} contest={contest}></Contest>
        ))}
      </div>
      <div className="flex justify-between my-6 items-center p-2 mx-3 rounded-xl shadow-lg">
        <div>
          <h2 data-aos="zoom-in-up" className="text-xl font-bold text-gray-700">
            Page {page} Out Of {pageOfNum.length}
          </h2>
        </div>
        <div className="join rounded-lg">
          <button
            data-aos="zoom-in-up"
            onClick={handlePrev}
            className="join-item btn"
          >
            «
          </button>
          {pageOfNum.map((item, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                data-aos="zoom-in-up"
                onClick={() => setPage(pageNum)}
                className={
                  page === pageNum
                    ? "join-item btn btn-active"
                    : "join-item btn"
                }
              >
                {pageNum}
              </button>
            );
          })}
          <button
            data-aos="zoom-in-up"
            onClick={handleNext}
            className="join-item btn"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllContest;
