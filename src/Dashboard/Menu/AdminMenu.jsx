import { FaUsers } from "react-icons/fa6";
import { MdPermMedia } from "react-icons/md";
import MenuItem from "../MenuItem";

const AdminMenu = () => {
  return (
    <div>
      <MenuItem address="manageUsers" label="Manage User" icon={FaUsers} />
      <MenuItem
        address="manageContest"
        label="Manage Contest"
        icon={MdPermMedia}
      />
    </div>
  );
};

export default AdminMenu;
