import { useQuery } from "@tanstack/vue-query";
import { QUERY_KEYS } from "../QUERY_KEYS";
import wretch from "../wretch";
import type { User } from "../types/User";

export const useGetUsers = () => {
  const currentUser = useCurrentUser();
  return useQuery<User[]>({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: async () => {
      const token = await currentUser.value?.getIdToken();
      if (!token) {
        throw new Error("User is not authenticated");
      }
      return wretch(token).url("/users").get().json<User[]>();
    },
  });
};
