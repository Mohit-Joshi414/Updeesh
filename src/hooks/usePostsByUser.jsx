import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostsByUserId } from "../services/post-service";

const usePostsByUser = (userId, pageSize) => {
  const fetchPosts = async ({ pageParam, limit = pageSize }) => {
    const response = await getPostsByUserId(userId, pageParam, limit);
    return response;
  };
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["postContentByUser"],
    queryFn: fetchPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      // Check if it's not the last page
      if (!lastPage?.lastPage) {
        return lastPage?.pageNumber + 1; // Return the next page number
      } else {
        return undefined; // No more pages to fetch
      }
    },
    staleTime: 1800000,
    gcTime: 1800000,
    enabled: !!userId,
  });

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading,
  };
};

export default usePostsByUser;
