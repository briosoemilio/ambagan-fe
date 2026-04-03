import { useQuery } from "@tanstack/vue-query";
import { QUERY_KEYS } from "../QUERY_KEYS";
import wretch from "../wretch";
import type { Ambag } from "../types/Ambag";

export const useGetAmbag = (projectId: string) => {
  const currentUser = useCurrentUser();
  return useQuery<Ambag[]>({
    queryKey: [QUERY_KEYS.AMBAGS],
    queryFn: async () => {
      const token = await currentUser.value?.getIdToken();
      if (!token) {
        throw new Error("User is not authenticated");
      }
      return wretch(token).url(`/ambags?projectId=${projectId}`).get().json<Ambag[]>();
    },
  });
};
