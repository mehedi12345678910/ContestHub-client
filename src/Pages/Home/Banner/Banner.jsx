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
      });
    }, []);

  return (
    <div>
      <div
        style={{
          backgroundImage:
            "url('https://i.ibb.co/CJhX2s5/360-F-495286577-rps-T2-Shmr6g81h-Oh-GXALhx-WOfx1v-OQBa.jpg')",
        }}
        className="h-[calc(100vh-110px)] bg-cover bg-center flex justify-center items-center"
      >
        <div className="max-w-3xl mx-auto text-center space-y-4 p-2">
          <h2
            data-aos="zoom-in-up"
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-300"
          >
            Unlock Your Potential: Join the Ultimate Innovation Hub!
          </h2>
          <p data-aos="zoom-in-up" className="text-gray-400 text-lg">
            Join the challenge. Show your skills. Be the champion. Explore now!
          </p>
          <form data-aos="zoom-in-up" onSubmit={handleSearch}>
            <div className="join">
              <input
                className="input input-bordered join-item md:w-96"
                name="search"
                placeholder="Search here..."
              />
              <button
                data-aos="zoom-in-up"
                className="btn join-item rounded-lg"
                type="submit"
              >
                <FaSearchengin className="text-2xl"></FaSearchengin>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-3 my-10 md:my-16">
        <PopularContest value={value} />
      </div>
    </div>
  );
};

export default Banner;
