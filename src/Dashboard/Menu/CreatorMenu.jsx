import MenuItem from "../MenuItem";
import { MdCreateNewFolder } from "react-icons/md";
import { MdBookmarkAdded } from "react-icons/md";
import { HiViewGridAdd } from "react-icons/hi";
const CreatorMenu = () => {
  return (
    <div>
      <MenuItem
        address="myContest"
        label="My Created Contest"
        icon={MdBookmarkAdded}
      />
      <MenuItem
        address="submittedContest"
        label="Contest Submitted"
        icon={HiViewGridAdd}
      />
      <MenuItem
        address="addContest"
        label="Add Contest"
        icon={MdCreateNewFolder}
      />
    </div>
  );
};

export default CreatorMenu;
