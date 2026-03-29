import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to='/' className="flex items-center">
      <figure className={`w-16 h-14 md:w-28 md:h-24` }>
        <img
          className="object-contain"
          src="https://i.ibb.co/2d0mxJT/logo-removebg-preview.png"
          alt=""
        />
      </figure>
      <h3 className="text-xl md:text-3xl  font-bold text-[#1d3557]">
        Contest<span className="text-[#e63946] font-extrabold">Hub</span>
      </h3>
    </Link>
  );
};

export default Logo;
