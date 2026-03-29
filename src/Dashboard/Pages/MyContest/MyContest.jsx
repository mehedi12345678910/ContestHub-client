import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { FaFilePen } from "react-icons/fa6";
import { MdDelete, MdOutlineVerified, MdWatchLater } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BallTriangle } from "react-loader-spinner";
import AOS from "aos";
import { useEffect } from "react";
const MyContest = () =>
{
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 300,
    });
  }, []);
  const axiosSecure = useAxios();
  const { user, loader } = useAuth();
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    enabled: !loader,
    queryKey: ["myContests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests?email=${user?.email}`);
      console.log(res.data); // Log the response to check its structure
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </div>
    );
  }

  if (isError) {
    return <div>{isError.message}</div>;
  }


  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/contests/${id}`).then((res) => {
          
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your contest has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto overflow-auto">
      <table className="table min-w-[1000px]">
        {/* head */}
        <thead>
          <tr>
            <th data-aos="zoom-in-up">#</th>
            <th data-aos="zoom-in-up">Contest Name & Count</th>
            <th data-aos="zoom-in-up">Prize Money</th>
            <th data-aos="zoom-in-up">Status</th>
            <th data-aos="zoom-in-up">Action</th>
            <th data-aos="zoom-in-up">Select Winner</th>
          </tr>
        </thead>
        <tbody>
          {data?.allContest?.map((contest, index) => (
            <tr key={contest._id}>
              <th>{index + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-16 h-16">
                      <img src={contest.image} alt="" />
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">{contest.contestName}</div>
                    <div className="text-sm opacity-50">
                      Attempt Count: {contest.attendance}
                    </div>
                  </div>
                </div>
              </td>
              <td >
                Prize Money: ${contest.prize}
                <br />
                {contest.winnerName && (
                  <span className="badge badge-ghost badge-sm">
                    Winner: {contest?.winnerName}
                  </span>
                )}
              </td>
              <td>
                {contest.status === "Accepted" ? (
                  <span
             
                    className="text-green-500 bg-blue-100 p-1 w-fit rounded-lg  font-medium flex items-center gap-1"
                  >
                    <MdOutlineVerified /> {contest?.status}
                  </span>
                ) : (
                  <span
              
                    className="text-red-500 bg-yellow-100 p-1 w-fit rounded-lg  font-medium flex items-center gap-1"
                  >
                    <MdWatchLater /> {contest?.status}
                  </span>
                )}
              </td>
              <th>
                <Link to={`/dashboard/updateContest/${contest?._id}`}>
                  <button
                   
                    disabled={contest.status === "Accepted"}
                    className="btn bg-blue-300 btn-xs"
                  >
                    <FaFilePen /> Update
                  </button>
                </Link>
                <br />
                <button
              
                  onClick={() => handleDelete(contest._id)}
                  disabled={contest.status === "Accepted"}
                  className="btn bg-red-300 btn-xs mt-2"
                >
                  <MdDelete />
                  Delete
                </button>
              </th>
              <th>
                <Link to="/dashboard/submittedContest">
                  <button
                  
                    className="btn btn-ghost bg-green-300 btn-xs"
                  >
                    See submission
                  </button>
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyContest;
