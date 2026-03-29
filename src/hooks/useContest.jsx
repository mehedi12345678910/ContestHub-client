import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useContest = () =>
{
    const axiosSecure = useAxios();
    const { data: contests = [] , refetch, isLoading} = useQuery({
        queryKey: ['contests'],
        queryFn: async() =>
        {
            const res = await axiosSecure.get('/contests');
            return res.data;
        }
    })
    return {contests, refetch, isLoading};
};

export default useContest;