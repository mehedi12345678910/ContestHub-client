import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { useEffect } from "react";
import AOS from "aos";
import { HiOutlineBadgeCheck } from "react-icons/hi";

const BestCreator = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 200,
      once: true,
    });
  }, []);

  const axiosSecure = useAxios();
  const { data: bestCreator = [], isLoading } = useQuery({
    queryKey: ["bestCreator"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bestCreator`);
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Section Title */}
      <div className="text-center mb-12 space-y-2">
        <h2 
          data-aos="fade-down"
          className="text-3xl md:text-5xl font-bold text-[#1d3557]"
        >
          Top Contest <span className="text-[#e63946]">Creators</span>
        </h2>
        <p data-aos="fade-up" className="text-gray-500 font-medium">
          The brilliant minds behind our most successful innovations.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {bestCreator.map((creator, index) => (
          <div
            key={creator._id}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
            className="group relative"
          >
            {/* Background Shape / Card */}
            <div 
              style={{ borderRadius: "60px 15px 60px 15px" }}
              className="bg-white p-8 shadow-lg border border-gray-100 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Decorative Accent */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-[#a8dadc]/20 rounded-br-full -z-0"></div>
              
              {/* Image with Ring */}
              <div className="relative z-10 mb-6">
                <div className="w-32 h-32 p-1.5 bg-gradient-to-tr from-[#e63946] to-[#a8dadc] rounded-full shadow-md">
                  <img
                    src={creator?.creatorImage || "https://i.ibb.co/z6BC8H5/default-profile.png"}
                    alt={creator?.creatorName}
                    className="w-full h-full object-cover rounded-full border-4 border-white"
                  />
                </div>
                <div className="absolute bottom-1 right-2 bg-blue-500 text-white p-1 rounded-full border-2 border-white shadow-sm">
                   <HiOutlineBadgeCheck className="text-lg" />
                </div>
              </div>

              {/* Creator Info */}
              <div className="z-10 space-y-3">
                <h3 className="text-xl font-bold text-[#1d3557] group-hover:text-[#e63946] transition-colors">
                  {creator?.creatorName}
                </h3>
                
                <div className="inline-block bg-[#f1faee] px-4 py-1 rounded-full">
                   <span className="text-[10px] uppercase tracking-widest font-black text-teal-600 block leading-tight">Featured Contest</span>
                   <span className="text-sm font-semibold text-[#1d3557]">{creator?.contestName}</span>
                </div>

                <p className="text-gray-500 text-sm italic leading-relaxed pt-2">
                  "{creator?.description?.length > 100 
                    ? creator.description.slice(0, 100) + "..." 
                    : creator.description}"
                </p>
              </div>

              {/* Success Badge Overlay */}
              <div className="absolute -bottom-2 -right-2 opacity-5 transition-opacity group-hover:opacity-10">
                 <HiOutlineBadgeCheck className="text-9xl text-[#1d3557]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading State Skeleton (Simple) */}
      {isLoading && (
        <div className="text-center py-10">
          <span className="loading loading-dots loading-lg text-[#e63946]"></span>
        </div>
      )}
    </div>
  );
};

export default BestCreator;