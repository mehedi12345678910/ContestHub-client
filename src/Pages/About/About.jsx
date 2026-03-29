import { FaQuestionCircle } from "react-icons/fa";
import AOS from "aos";
import { useEffect } from "react";
const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 300,
    });
  }, []);
  return (
    <div className="mt-8">
      <div className="flex justify-center mb-8">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col max-w-7xl justify-center items-center space-y-3 w-full">
            <div className="flex flex-col md:items-start items-center justify-center space-y-3 px-8 text-center">
              <div
                data-aos="zoom-in-up"
                className="text-2xl md:text-5xl font-bold text-gray-800 max-w-4xl"
              >
                Diverse Elegance: Where Gaming, Business, Writing, and More
                Unite in Unique Contests!
              </div>
            </div>
            <div className="flex flex-col lg:flex-row space-x-2 space-y-3 md:space-x-6 w-full items-center justify-center">
              <div className="lg:w-40 w-64 h-40  overflow-hidden rounded-xl">
                <img
                  data-aos="zoom-in-up"
                  src="https://i.ibb.co/Kh9cjpw/gaming-tournament-championship.jpg"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-row lg:flex-col space-x-3 space-y-6 items-center justify-center">
                <div className="w-32 lg:w-40 h-32  overflow-hidden rounded-xl">
                  <img
                    data-aos="zoom-in-up"
                    src="https://i.ibb.co/cTnRXDb/Wellness-contest-ideas.png"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="w-32 lg:w-40 h-48  overflow-hidden rounded-xl">
                  <img
                    data-aos="zoom-in-up"
                    src="https://i.ibb.co/Prw5bpv/Creative-Writing-Showdown.jpg"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="lg:w-60 w-64 h-96  overflow-hidden rounded-xl">
                <img
                  data-aos="zoom-in-up"
                  src="https://i.ibb.co/LRHt2gd/Virtual-Gaming-Extravaganza.webp"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-row lg:flex-col space-x-3 space-y-6 items-center justify-center">
                <div className="w-32 lg:w-40 h-48  overflow-hidden rounded-xl">
                  <img
                    data-aos="zoom-in-up"
                    src="https://i.ibb.co/6Zs0dzh/Financial-Business-Mastery-Contest.png"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="w-32 lg:w-40 h-32  overflow-hidden rounded-xl">
                  <img
                    data-aos="zoom-in-up"
                    src="https://i.ibb.co/frGFhc5/Journalism-and-Reporting-Showdown.webp"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="lg:w-40 w-64 h-40  overflow-hidden rounded-xl">
                <img
                  data-aos="zoom-in-up"
                  src="https://i.ibb.co/f2RB4wH/Medical-Case-Study-Challenge.webp"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <h2
            data-aos="zoom-in-up"
            className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 "
          >
            Frequently asked questions
          </h2>
          <div className="grid pt-8 text-left border-t  md:gap-16 border-gray-700 md:grid-cols-2">
            <div>
              <div className="mb-10">
                <h3
                  data-aos="zoom-in-up"
                  className="flex items-center mb-4 text-lg font-medium text-gray-900 "
                >
                  <FaQuestionCircle className="mr-1" />
                  How do I participate in contests on your platform?
                </h3>
                <p data-aos="zoom-in-up" className="text-gray-500 ">
                  To participate in a contest, simply navigate to the contest
                  section on our platform. Click on the contest you're
                  interested in and follow the on-screen instructions to submit
                  your entry.
                </p>
              </div>
              <div className="mb-10">
                <h3
                  data-aos="zoom-in-up"
                  className="flex items-center mb-4 text-lg font-medium text-gray-900 "
                >
                  <FaQuestionCircle className="mr-1" />
                  Is there a registration fee to join your contests?
                </h3>
                <p data-aos="zoom-in-up" className="text-gray-500 ">
                  Registration is absolutely free! We believe in providing an
                  inclusive platform for everyone to showcase their talents
                  without any financial barriers.
                </p>
              </div>
              <div className="mb-10">
                <h3
                  data-aos="zoom-in-up"
                  className="flex items-center mb-4 text-lg font-medium text-gray-900 "
                >
                  <FaQuestionCircle className="mr-1" />
                  What types of contests does your platform host?
                </h3>
                <p data-aos="zoom-in-up" className="text-gray-500 ">
                  We host a diverse range of contests, including but not limited
                  to gaming, fashion, writing, and more. Explore our contest
                  section to discover the variety of creative opportunities
                  available.
                </p>
              </div>
              <div className="mb-10">
                <h3
                  data-aos="zoom-in-up"
                  className="flex items-center mb-4 text-lg font-medium text-gray-900 "
                >
                  <FaQuestionCircle className="mr-1" />
                  How are winners selected in contests?
                </h3>
                <p data-aos="zoom-in-up" className="text-gray-500 ">
                  Winners are selected based on a combination of factors,
                  including creativity, originality, and adherence to contest
                  guidelines. Our judging panel comprises experts in the
                  respective fields to ensure a fair evaluation.
                </p>
              </div>
            </div>
            <div>
              <div className="mb-10">
                <h3
                  data-aos="zoom-in-up"
                  className="flex items-center mb-4 text-lg font-medium text-gray-900 "
                >
                  <FaQuestionCircle className="mr-1" />
                  Do you offer prizes for contest winners?
                </h3>
                <p data-aos="zoom-in-up" className="text-gray-500 ">
                  Absolutely! We believe in rewarding talent. Winners receive
                  exciting prizes, which may include cash rewards, vouchers, or
                  other incentives, depending on the nature and sponsorships of
                  the contest.
                </p>
              </div>
              <div className="mb-10">
                <h3
                  data-aos="zoom-in-up"
                  className="flex items-center mb-4 text-lg font-medium text-gray-900 "
                >
                  <FaQuestionCircle className="mr-1" />
                  Can I submit entries to multiple contests simultaneously?
                </h3>
                <p data-aos="zoom-in-up" className="text-gray-500 ">
                  Yes, you can! Feel free to showcase your versatility by
                  submitting entries to multiple contests at the same time. We
                  encourage participants to explore various creative avenues.
                </p>
              </div>
              <div className="mb-10">
                <h3
                  data-aos="zoom-in-up"
                  className="flex items-center mb-4 text-lg font-medium text-gray-900 "
                >
                  <FaQuestionCircle className="mr-1" />
                  What happens if there is a tie in contest scores?
                </h3>
                <p data-aos="zoom-in-up" className="text-gray-500 ">
                  In the event of a tie, our platform may have specific
                  tiebreaker criteria outlined in the contest guidelines. This
                  could include additional judging rounds or other fair methods
                  to determine a winner.
                </p>
              </div>
              <div className="mb-10">
                <h3
                  data-aos="zoom-in-up"
                  className="flex items-center mb-4 text-lg font-medium text-gray-900 "
                >
                  <FaQuestionCircle className="mr-1" />
                  Is there a limit to the number of contests I can participate
                  in?
                </h3>
                <p data-aos="zoom-in-up" className="text-gray-500 ">
                  There's usually no strict limit! You're welcome to participate
                  in as many contests as you wish, provided you meet the
                  eligibility criteria for each one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
