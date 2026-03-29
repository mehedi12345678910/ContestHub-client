import MenuItem from "../MenuItem";
import { MdCoPresent } from "react-icons/md";
import { FaCrown } from "react-icons/fa";
const GuestMenu = () => {
  return (
    <div>
      <MenuItem
        address="/dashboard/myParticipatedContest"
        label="Participated Contest"
        icon={MdCoPresent}
      ></MenuItem>
      <MenuItem
        address="/dashboard/myWinningContest"
        label="My Winning Contest"
        icon={FaCrown}
      ></MenuItem>
    </div>
  );
};

export default GuestMenu;
