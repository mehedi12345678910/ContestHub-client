import { useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";

const UserTable = ({ user, index }) => {
  const axiosSecure = useAxios();

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    Swal.fire({
      title: "Are you sure?",
      text: "You want to change the role!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .put(`/users/${user?.email}`, { role: selectedRole })
          .then((res) => {
            
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Changed!",
                text: "User role have been changed.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <tr key={user?._id}>
      <th>{index + 1}</th>
      <td>
        <div className="font-bold">{user?.name}</div>
      </td>
      <td>{user?.email}</td>
      <th>
        <select
          defaultValue={user?.role}
          onChange={handleRoleChange}
          className="select select-bordered select-sm w-full max-w-[100px]"
        >
          <option value="guest">Normal User</option>
          <option value="creator">Contest creator</option>
          <option value="admin">Admin</option>
        </select>
      </th>
    </tr>
  );
};

export default UserTable;
