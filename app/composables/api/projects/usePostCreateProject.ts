import { useMutation } from "@tanstack/vue-query";
import { QUERY_KEYS } from "../QUERY_KEYS";
import wretch from "../wretch";
import type { User } from "../types/User";
import type { CreateProjectDto } from "~/schemas/CreateProject";

export const usePostCreateProject = () => {
  const currentUser = useCurrentUser();
  return useMutation<{ body: User[], status: number }, Error, CreateProjectDto>({
    mutationKey: [QUERY_KEYS.PROJECTS],
    mutationFn: async (reqBody) => {
      const token = await currentUser.value?.getIdToken();
      if (!token) {
        throw new Error("User is not authenticated");
      }
      const response = await wretch(token).url("/projects").post(reqBody).res()
      const body = await response.json();
      return { body, status: response.status };
    },
  });
};
