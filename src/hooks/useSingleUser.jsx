import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useSingleUser = () => {
  const axiosSecure = useAxios();
  const { user, loader } = useAuth();
  const { data: userData, isLoading } = useQuery({
    enabled: !loader,
    queryKey: ["singleUser"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });
  return { userData, isLoading };
};

export default useSingleUser;
