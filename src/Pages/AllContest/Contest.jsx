import { Link } from "react-router-dom";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css"; // AOS css import korte bhulben na

const Contest = ({ contest }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 300,
    });
  }, []);

  // Contest object theke dorkari data gulo destructure kora hoyeche
  const { 
    _id, 
    contestName, 
    image, 
    attendance, 
    description, 
    price, 
    prize, 
    contestType 
  } = contest;

  // Description-ke choto kora
  const shortDesc = description?.length > 100 
    ? description.slice(0, 100) + "..." 
    : description;

  return (
    <div
      data-aos="fade-up"
      className="relative group w-full h-96 md:h-[400px] m-2 mx-auto overflow-hidden rounded-xl shadow-xl"
    >
      {/* Background Image */}
      <div
        style={{
          backgroundImage: `url(${image})`,
        }}
        className="absolute inset-0 bg-no-repeat bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-500 group-hover:bg-opacity-80">
        
        {/* Contest Type Badge */}
        <span className="absolute top-4 right-4 bg-rose-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
          {contestType}
        </span>

        <h2 
          data-aos="zoom-in-up" 
          className="text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight"
        >
          {contestName}
        </h2>

        {/* Price & Prize Section with Dollar ($) */}
        <div data-aos="zoom-in-up" className="flex flex-wrap justify-center gap-4 mb-3">
          <div className="bg-blue-900/50 border border-blue-400 px-3 py-1 rounded-md">
            <p className="text-blue-300 text-sm">Entry Fee</p>
            <p className="text-xl font-bold text-white">${price}</p>
          </div>
          <div className="bg-yellow-900/50 border border-yellow-400 px-3 py-1 rounded-md">
            <p className="text-yellow-300 text-sm">Win Prize</p>
            <p className="text-xl font-bold text-white">${prize}</p>
          </div>
        </div>

        <p
          data-aos="zoom-in-up"
          className="text-blue-400 text-sm font-medium mb-3 uppercase tracking-wider"
        >
          Total Attempted: {attendance}
        </p>

        <p data-aos="zoom-in-up" className="text-gray-300 text-sm mb-6 line-clamp-3">
          {shortDesc}
        </p>

        <Link to={`/contestDetails/${_id}`} className="w-full flex justify-center">
          <button
            data-aos="zoom-in-up"
            className="relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 bg-neutral-800 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-neutral-700 overflow-hidden group/btn"
          >
            {/* Animated background effect for button */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-violet-600 via-purple-600 to-rose-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></span>
            <span className="relative z-10">View Details</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Contest;