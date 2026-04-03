import { useQuery } from "@tanstack/vue-query";
import { QUERY_KEYS } from "../QUERY_KEYS";
import wretch from "../wretch";
import type { Project } from "../types/Project";

export const useGetProjects = () => {
  const currentUser = useCurrentUser();
  return useQuery<Project[]>({
    queryKey: [QUERY_KEYS.PROJECTS],
    queryFn: async () => {
      const token = await currentUser.value?.getIdToken();
      if (!token) {
        throw new Error("User is not authenticated");
      }
      return wretch(token).url("/projects").get().json<Project[]>();
    },
  });
};
