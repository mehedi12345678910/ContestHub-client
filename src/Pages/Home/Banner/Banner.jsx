import { FaSearchengin } from "react-icons/fa6";
import PopularContest from "../../../components/PopularContest/PopularContest";
import { useEffect, useState } from "react";
import AOS from "aos";

const Banner = () => {
  const [value, setValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    setValue(searchValue);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 300,
      once: true, // Animation bar bar hobe na, ekbar hobe
    });
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div
        className="relative h-[calc(100vh-80px)] min-h-[500px] bg-cover bg-center flex justify-center items-center transition-all duration-500"
        style={{
          backgroundImage: "url('https://i.ibb.co.com/VY9gTfsh/6113099.jpg')",
        }}
      >
        {/* Dark Gradient Overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 space-y-6">
          <h2
            data-aos="fade-up"
            className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight"
          >
            Unlock Your <span className="text-[#e63946]">Potential</span> <br />
            <span className="text-2xl md:text-4xl font-light opacity-90 italic">Join the Ultimate Innovation Hub!</span>
          </h2>

          <p 
            data-aos="fade-up" 
            data-aos-delay="500"
            className="text-gray-200 text-base md:text-xl max-w-2xl mx-auto font-medium"
          >
            Join the challenge. Show your skills. Be the champion. <br className="hidden md:block"/> Explore thousands of contests happening now!
          </p>

          {/* Search Bar Design */}
          <div data-aos="zoom-in" data-aos-delay="700" className="flex justify-center pt-4">
            <form onSubmit={handleSearch} className="w-full max-w-lg">
              <div className="flex bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl">
                <input
                  className="bg-transparent text-white placeholder-gray-300 w-full px-5 py-3 outline-none rounded-l-xl focus:ring-0"
                  name="search"
                  type="text"
                  placeholder="Search your passion..."
                />
                <button
                  type="submit"
                  className="bg-[#e63946] hover:bg-[#d62828] text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 font-bold active:scale-95 shadow-lg"
                >
                  <FaSearchengin className="text-xl" />
                  <span className="hidden md:inline">Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Popular Contest Section */}
      <div className="max-w-7xl mx-auto p-4 my-12 md:my-20">
        <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-[#1d3557]">Our Popular Contests</h3>
            <div className="w-20 h-1.5 bg-[#e63946] mx-auto mt-2 rounded-full"></div>
        </div>
        <PopularContest value={value} />
      </div>
    </div>
  );
};

export default Banner;