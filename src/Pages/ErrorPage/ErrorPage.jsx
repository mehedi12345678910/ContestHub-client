import Lottie from "lottie-react";
import { motion } from "framer-motion";

import errorAnime from "../../assets/ErrorPageAnime.json";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import AOS from "aos";

import { useEffect } from "react";
const ErrorPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 300,
    });
  }, []);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col md:flex-row w-[70%] items-center space-y-4">
        <div
          data-aos="zoom-in-up"
          className="flex-col space-y-4 text-center md:w-1/2 w-[80%]"
        >
          <div data-aos="zoom-in-up" className="text-5xl font-medium">
            Page not found
          </div>
          <div data-aos="zoom-in-up" className="text-gray-500">
            Sorry, the page you're looking for isn't available.
          </div>
          <div
            data-aos="zoom-in-up"
            className="flex flex-col gap-3 items-center justify-center"
          >
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-pink-600 px-4 py-1 text-white font-medium rounded-lg cursor-pointer flex items-center"
              >
                Visit Homepage <AiOutlineDoubleRight />
              </motion.button>
            </Link>

            <Link to={-1}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-pink-600 px-4 py-1 text-white font-medium rounded-lg cursor-pointer flex items-center"
              >
                Go Back <AiOutlineDoubleRight />
              </motion.button>
            </Link>
          </div>
        </div>
        <div
          data-aos="zoom-in-up"
          className="md:w-96 w-[70%] md:h-96 h-48  bg-gray-200 rounded-xl overflow-hidden"
        >
          <div
            data-aos="zoom-in-up"
            className="flex justify-center items-center"
          >
            <Lottie
              animationData={errorAnime}
              style={{ maxHeigh: 200, width: 300 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
