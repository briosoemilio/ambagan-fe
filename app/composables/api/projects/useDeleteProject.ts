import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { QUERY_KEYS } from "../QUERY_KEYS";
import wretch from "../wretch";

export const useDeleteProject = () => {
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();
  return useMutation<{ status: number }, Error, string>({
    mutationKey: [QUERY_KEYS.PROJECTS],
    mutationFn: async (projectId: string) => {
      const token = await currentUser.value?.getIdToken();
      if (!token) {
        throw new Error("User is not authenticated");
      }
      const response = await wretch(token).url(`/projects/${projectId}`).delete().res();
      return { status: response.status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECTS] });
    },
  });
};
