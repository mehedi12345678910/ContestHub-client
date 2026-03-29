import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const ContestSubmission = () => {
  const { user, loader } = useAuth();
  const axiosSecure = useAxios();
  const { data: submissions = [], refetch } = useQuery({
    enabled: !loader,
    queryKey: ["submissions"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/registrations/${user?.email}`);
      return res.data;
    },
  });
  const handleWinner = (submission) => {
    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, declare it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const winnerData = {
          winnerName: submission.name,
          winnerEmail: submission.email,
          winnerImage: submission.image,
        };
        axiosSecure
          .put(`/registrations/${submission._id}`, { winner: "winner" })
          .then((res) => {
            
            if (res.data.modifiedCount > 0) {
              axiosSecure
                .put(`/contests/winner/${submission.contestId}`, winnerData)
                .then((res) => {
                 
                  if (res.data.modifiedCount > 0) {
                    Swal.fire({
                      title: "Declared!",
                      text: "Winner has been declared.",
                      icon: "success",
                    });
                    refetch();
                  }
                });
            }
          });
      }
    });
  };
  return (
    <div>
      <div>
        <h2 className="text-2xl text-orange-500 font-semibold text-center mb-4">
          All submissions !
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table min-w-[1000px]">
          <thead className="bg-purple-500 text-gray-50">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Submitted Task</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr key={submission._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={submission.image} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{submission.name}</div>
                    </div>
                  </div>
                </td>
                <td>{submission.email}</td>
                <td className="overflow-auto max-w-lg">{submission.task}</td>
                <th>
                  {submission.status === "pending" ? (
                    <button
                      onClick={() => handleWinner(submission)}
                      className="btn btn-ghost bg-purple-100 text-purple-800 btn-xs font-semibold"
                    >
                      Set As Winner
                    </button>
                  ) : (
                    <span className="text-green-800 bg-green-100 p-1 rounded-lg">
                      Declared as winner
                    </span>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContestSubmission;
