import { Link } from "react-router-dom";
import { HiLightningBolt } from "react-icons/hi"; // Ekta dynamic icon use korlam

const Logo = () => {
  return (
    <Link to="/" className="group flex items-center gap-1 transition-transform duration-300 hover:scale-105">
      {/* Icon Part */}
      <div className="relative flex items-center justify-center w-10 h-10 bg-[#e63946] rounded-xl rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-red-200">
        <HiLightningBolt className="text-white text-2xl" />
        {/* Decorative dot */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1d3557] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#1d3557]"></span>
        </span>
      </div>

      {/* Text Part */}
      <div className="flex flex-col ml-1">
        <h3 className="text-xl md:text-3xl font-black tracking-tight leading-none text-[#1d3557]">
          Contest
          <span className="text-[#e63946]">Hub</span>
        </h3>
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-500 group-hover:text-[#e63946] transition-colors">
          Compete & Win
        </span>
      </div>
    </Link>
  );
};

export default Logo;