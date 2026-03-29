import { FaTrash } from "react-icons/fa6";
import { MdOutlineVerified, MdWatchLater } from "react-icons/md";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";
import { FaPenAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ManageContestTable = ({ contest, refetch, index }) => {
  const axiosSecure = useAxios();
  const handleConfirm = (id) => {
    console.log(id);
    axiosSecure.patch(`/contests/${id}`, { status: "Accepted" }).then((res) => {
      
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Confirmed!",
          text: "You accepted the contest!",
          icon: "success",
        });
        refetch();
      }
    });
  };

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
          console.log(res.data);
          if (res?.data?.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Contest has been deleted.",
              icon: "success",
            });
          }
          refetch();
        });
      }
    });
  };
  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-16 h-16">
              <img src={contest?.image} alt="Avatar" />
            </div>
          </div>
          <div>
            <div className="font-medium">{contest?.contestName}</div>
            <div className="text-sm opacity-50">Price: ${contest?.price}</div>
          </div>
        </div>
      </td>
      <td>
        {contest?.creatorName}
        <br />
        <span className="badge badge-ghost badge-sm">
          {contest?.creatorEmail}
        </span>
      </td>
      <td>
        Attempt: {contest?.attendance}
        <br />
        <span>Prize Money: ${contest?.prize}</span>
      </td>
      <th>
        {contest.status === "Accepted" ? (
          <span className="text-xs text-green-600  bg-green-100 p-1 rounded-lg flex items-center gap-1 w-fit">
            <MdOutlineVerified /> Accepted
          </span>
        ) : (
          <button
            onClick={() => handleConfirm(contest._id)}
            className="btn bg-blue-100 text-blue-600 btn-xs"
          >
            <MdWatchLater /> Confirm
          </button>
        )}
        <br />
        <Link to={`/dashboard/updateContest/${contest._id}`}>
          <button className="btn bg-purple-100 text-purple-600 btn-xs mt-3">
            <FaPenAlt></FaPenAlt> Update
          </button>
        </Link>
        <br />
        <button
          onClick={() => handleDelete(contest._id)}
          className="btn bg-red-100 text-red-600 btn-xs mt-3"
        >
          <FaTrash /> Delete
        </button>
      </th>
    </tr>
  );
};

export default ManageContestTable;
