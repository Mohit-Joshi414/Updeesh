import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { loadAllPost, loadPostById } from "../services/post-service";

const usePostById = (postId) => {
  const fetchPosts = async () => {
    const response = await loadPostById(postId);
    return response;
  };
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["posts", postId],
    queryFn: fetchPosts,
    staleTime: 1800000,
    gcTime: 1800000,
  });

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

export default usePostById;
