import { FaQuestionCircle, FaChevronDown } from "react-icons/fa";
import AOS from "aos";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 300,
      once: true,
    });
  }, []);

  const faqData = [
    {
      q: "How do I participate in contests on your platform?",
      a: "To participate, navigate to the contest section, choose your interest, and follow the simple on-screen instructions to submit your entry."
    },
    {
      q: "Is there a registration fee to join your contests?",
      a: "Registration is absolutely free! We believe in providing an inclusive platform for everyone to showcase their talents."
    },
    {
      q: "What types of contests does your platform host?",
      a: "We host a wide variety, from high-energy Gaming tournaments and Business Mastery to Creative Writing and Medical Case Studies."
    },
    {
      q: "How are winners selected in contests?",
      a: "Winners are selected by expert panels based on creativity, originality, and strict adherence to the contest guidelines."
    }
  ];

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section with Grid Images */}
      <div className="max-w-7xl mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <h1 
            data-aos="fade-down"
            className="text-3xl md:text-6xl font-black text-[#1d3557] leading-tight max-w-5xl mx-auto"
          >
            Diverse Elegance: Where <span className="text-[#e63946]">Gaming, Business, Writing,</span> and More Unite!
          </h1>
          <p data-aos="fade-up" className="mt-4 text-gray-500 text-lg">Join unique contests and showcase your brilliance to the world.</p>
        </div>

        {/* Masonry-like Image Gallery */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div data-aos="zoom-in" className="rounded-3xl overflow-hidden h-64 shadow-lg">
              <img src="https://i.ibb.co/Kh9cjpw/gaming-tournament-championship.jpg" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="Gaming" />
            </div>
            <div data-aos="zoom-in" data-aos-delay="400" className="rounded-3xl overflow-hidden h-80 md:mt-10 shadow-lg">
              <img src="https://i.ibb.co/cTnRXDb/Wellness-contest-ideas.png" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="Wellness" />
            </div>
            <div data-aos="zoom-in" data-aos-delay="500" className="rounded-3xl overflow-hidden h-64 shadow-lg">
              <img src="https://i.ibb.co/Prw5bpv/Creative-Writing-Showdown.jpg" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="Writing" />
            </div>
            <div data-aos="zoom-in" data-aos-delay="600" className="rounded-3xl overflow-hidden h-80 shadow-lg md:-mt-10">
              <img src="https://i.ibb.co/LRHt2gd/Virtual-Gaming-Extravaganza.webp" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="Virtual Gaming" />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section with Accordion */}
      <div className="bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 data-aos="fade-up" className="text-4xl font-bold text-[#1d3557]">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-[#e63946] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div 
                key={index} 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
                className="collapse collapse-plus bg-white rounded-2xl shadow-sm border border-gray-100"
              >
                <input type="radio" name="my-accordion-3" defaultChecked={index === 0} /> 
                <div className="collapse-title text-xl font-bold text-[#1d3557] flex items-center gap-3">
                  <FaQuestionCircle className="text-[#e63946]" />
                  {item.q}
                </div>
                <div className="collapse-content text-gray-500"> 
                  <p className="pl-8">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;