import useUsers from "../../../hooks/useUsers";
import UserTable from "./UserTable";

const ManageUsers = () => {
  const {users} = useUsers();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="overflow-auto">
        <table className="table min-w-[600px]">
          {/* head */}
          <thead>
            <tr>
              <th className="text-lg">#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <UserTable key={user._id} user={user} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
