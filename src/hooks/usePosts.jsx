import { useInfiniteQuery } from "@tanstack/react-query";
import { loadAllPost } from "../services/post-service";

const usePosts = (pageSize) => {
  const fetchPosts = async ({ pageParam, limit = pageSize }) => {
    const response = await loadAllPost(pageParam, limit);
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
    queryKey: ["postContent"],
    queryFn: fetchPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      // Check if it's not the last page
      if (!lastPage.lastPage) {
        return lastPage.pageNumber + 1; // Return the next page number
      } else {
        return undefined; // No more pages to fetch
      }
    },
    staleTime: 1800000,
    gcTime: 1800000,
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

export default usePosts;
