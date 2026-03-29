import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useWinnerData = () => {
  const axiosSecure = useAxios();
  const { user, loader } = useAuth();

  const { data: winningCount = [] } = useQuery({
    enabled: !loader,
    queryKey: ["winningCount"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });

  return { winningCount };
};

export default useWinnerData;
