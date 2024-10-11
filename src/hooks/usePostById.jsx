import { useQuery } from "@tanstack/react-query";
import { loadPostById } from "../services/post-service";

const usePostById = (postId) => {
  const fetchPosts = async () => {
    if (postId) {
      const response = await loadPostById(postId);
      return response;
    }
  };
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["posts", postId],
    queryFn: fetchPosts,
    staleTime: 1800000,
    gcTime: 1800000,
    enabled: !!postId,
  });

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

export default usePostById;
