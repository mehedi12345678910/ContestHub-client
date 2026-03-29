import useContest from "../../../hooks/useContest";
import ManageContestTable from "./ManageContestTable";

const ManageContest = () => {
  const { contests, refetch } = useContest();
  

  return (
    <div className="max-w-7xl mx-auto">
      <div className="overflow-x-auto">
        <table className="table min-w-[900px]">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Contest Name</th>
              <th>Contest Creator</th>
              <th>Contest Info</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contests?.allContest?.map((contest, index) => (
              <ManageContestTable
                key={contest._id}
                contest={contest}
                refetch={refetch}
                index={index}
              ></ManageContestTable>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContest;
