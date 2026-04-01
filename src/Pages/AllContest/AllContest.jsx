import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Contest from "./Contest";
import { FaBriefcase, FaFirstAid, FaGamepad } from "react-icons/fa";
import { FaFilePen } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import AOS from "aos";

const AllContest = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 200,
      once: true,
    });
  }, []);

  const axiosSecure = useAxios();
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["allContest", category, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contests?category=${category}&status=Accepted&page=${page}&limit=${limit}`
      );
      return res?.data;
    },
  });

  const categories = [
    { label: "Business Contest", icon: FaBriefcase },
    { label: "Medical Contest", icon: FaFirstAid },
    { label: "Article Writing", icon: FaFilePen },
    { label: "Gaming", icon: FaGamepad },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <BallTriangle height={100} width={100} color="#e63946" visible={true} />
      </div>
    );
  }

  const totalContest = data?.contestCount || 0;
  const pages = Math.ceil(totalContest / limit);
  const pageNumbers = [...Array(pages).keys()].map(n => n + 1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Category Tabs Section */}
      <div className="flex justify-start md:justify-center items-center gap-4 overflow-x-auto pb-6 no-scrollbar">
        <button
          onClick={() => { setCategory(""); setPage(1); }}
          className={`flex flex-col items-center min-w-[100px] p-4 rounded-2xl transition-all duration-300 ${
            category === "" ? "bg-[#e63946] text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <span className="text-xl font-bold">All</span>
          <p className="text-xs font-medium">Contests</p>
        </button>

        {categories.map((item) => (
          <button
            key={item.label}
            data-aos="fade-down"
            onClick={() => { setCategory(item.label); setPage(1); }}
            className={`flex flex-col items-center min-w-[120px] gap-2 p-4 rounded-2xl transition-all duration-300 ${
              category === item.label
                ? "bg-[#1d3557] text-white shadow-lg scale-105"
                : "bg-white border border-gray-200 text-gray-500 hover:border-[#1d3557] shadow-sm"
            }`}
          >
            <item.icon size={24} />
            <p className="text-xs font-bold whitespace-nowrap">{item.label}</p>
          </button>
        ))}
      </div>

      {/* Contests Grid */}
      {data?.allContest?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 my-10">
          {data?.allContest?.map((contest) => (
            <Contest key={contest._id} contest={contest} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl my-10">
          <p className="text-gray-400 text-xl font-medium italic">No active contests found in this category.</p>
        </div>
      )}

      {/* Modern Pagination Section */}
      {pages > 1 && (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-5 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-gray-600 font-semibold">
            Showing <span className="text-[#e63946]">{page}</span> of {pages} Pages
          </div>

          <div className="join shadow-sm border border-gray-200">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="join-item btn bg-white hover:bg-gray-100 border-none disabled:bg-gray-50"
            >
              « Previous
            </button>
            
            {pageNumbers.map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`join-item btn border-none px-6 ${
                  page === pageNum ? "bg-[#1d3557] text-white hover:bg-[#1d3557]" : "bg-white hover:bg-gray-100"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              disabled={page === pages}
              onClick={() => setPage(page + 1)}
              className="join-item btn bg-white hover:bg-gray-100 border-none disabled:bg-gray-50"
            >
              Next »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllContest;