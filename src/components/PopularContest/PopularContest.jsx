// import { useQuery } from "@tanstack/react-query";
// import useAxios from "../../hooks/useAxios";
// import { BallTriangle } from "react-loader-spinner";
// import { Link } from "react-router-dom";
// import AOS from "aos";
// import { useEffect } from "react";
// const PopularContest = ({ value }) => {
//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       delay: 300,
//     });
//   }, []);
//   const axiosSecure = useAxios();
//   const {
//     data: populars = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["popular", value],
//     queryFn: async () => {
//       try {
//         const res = await axiosSecure.get(
//           `/contests/popular?attendance=attendance&order=desc&searchValue=${value}`
//         );
//         return res.data;
//       } catch (error) {
//         throw new Error(error.message);
//       }
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
//         <BallTriangle
//           height={100}
//           width={100}
//           radius={5}
//           color="#4fa94d"
//           ariaLabel="ball-triangle-loading"
//           wrapperClass={{}}
//           wrapperStyle=""
//           visible={true}
//         />
//       </div>
//     );
//   }

//   if (isError) {
//     return <div>Error: {isError.message}</div>;
//   }

//   return (
//     <div>
//       <div className="text-center max-w-3xl mx-auto my-8 space-y-3">
//         <h2 data-aos="zoom-in-up" className="text-3xl font-bold text-gray-700">
//           Top Of The Contest You Can Join The Contest!!!
//         </h2>
//         <p data-aos="zoom-in-up" className="text-gray-600">
//           Explore and participate in our top-rated contests! Engage in the
//           latest and most exciting challenges in the world of competitions. From
//           innovative projects to thrilling tasks, discover opportunities that
//           await you in our 'Top of the Contest' section. Join now and showcase
//           your skills!
//         </p>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {populars.map((popular) => (
//           <div
//             key={popular._id}
//             className="w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
//           >
//             <img
//               data-aos="zoom-in-up"
//               className="p-3 h-64 lg:h-72 w-full rounded-t-lg"
//               src={popular.image}
//               alt="product image"
//             />

//             <div className="px-5 pb-5">
//               <h5
//                 data-aos="zoom-in-up"
//                 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
//               >
//                 {popular.contestName}
//               </h5>

//               <div
//                 data-aos="zoom-in-up"
//                 className=" text-gray-900 dark:text-gray-200 mt-2.5 mb-5"
//               >
//                 {popular?.description && popular.description.length > 80
//                   ? `${popular.description.slice(0, 80)}...`
//                   : popular?.description}
//               </div>
//               <div className="flex items-center justify-between">
//                 <span
//                   data-aos="zoom-in-up"
//                   className="text-2xl font-bold text-gray-900 dark:text-gray-200"
//                 >
//                   Attempted: {popular?.attendance}
//                 </span>
//                 <Link to={`/contestDetails/${popular?._id}`}>
//                   <button
//                     data-aos="zoom-in-up"
//                     className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                   >
//                     See Details
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PopularContest;
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import AOS from "aos";
import { useEffect } from "react";
import { HiOutlineUsers, HiOutlineArrowNarrowRight } from "react-icons/hi";

const PopularContest = ({ value }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 200,
      once: true,
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
      <div className="flex justify-center items-center min-h-[400px]">
        <BallTriangle height={80} width={80} color="#e63946" visible={true} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 font-bold p-10">
        Error loading contests. Please try again.
      </div>
    );
  }

  return (
    <div className="py-10 ">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3 px-4">
        <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-extrabold text-[#1d3557]">
          Top <span className="text-[#e63946]">Contests</span>
        </h2>
        <p data-aos="fade-up" data-aos-delay="100" className="text-gray-500 text-sm md:text-base leading-relaxed">
          Explore our most popular challenges. Join thousands of innovators and showcase your skills to the world!
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {populars.map((popular, index) => (
          <div
            key={popular._id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
          >
            {/* Image Container */}
            <div className="relative h-60 overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={popular.image}
                alt={popular.contestName}
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-md text-[#1d3557] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                  <HiOutlineUsers className="text-[#e63946] text-sm" />
                  {popular?.attendance} Participants
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex flex-col flex-grow">
              <h5 className="text-xl font-bold text-[#1d3557] mb-3 group-hover:text-[#e63946] transition-colors duration-300">
                {popular.contestName}
              </h5>

              <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                {popular?.description?.length > 90
                  ? `${popular.description.slice(0, 90)}...`
                  : popular?.description}
              </p>

              {/* Footer Part */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Status</span>
                  <span className="text-green-600 font-bold text-sm">Active Now</span>
                </div>
                
                <Link to={`/contestDetails/${popular?._id}`}>
                  <button className="flex items-center gap-2 bg-[#1d3557] hover:bg-[#e63946] text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 active:scale-95 shadow-md">
                    Details
                    <HiOutlineArrowNarrowRight />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty State */}
      {populars.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl">
           <p className="text-gray-500 italic">No contests found for "{value}"</p>
        </div>
      )}
    </div>
  );
};

export default PopularContest;