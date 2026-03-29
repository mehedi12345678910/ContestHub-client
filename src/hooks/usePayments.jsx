import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const usePayments = () => {
  const { user, loader } = useAuth();
  const axiosSecure = useAxios();
  const { data: payments = [] } = useQuery({
    enabled: !loader,
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });
  return { payments };
};

export default usePayments;
