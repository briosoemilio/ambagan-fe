import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { QUERY_KEYS } from "../QUERY_KEYS";
import wretch from "../wretch";
import type { User } from "../types/User";
import type { AddAmbagDto } from "~/schemas/AddAmbag";

export const usePostUploadAmbag = () => {
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();
  return useMutation<{ body: User[], status: number }, Error, AddAmbagDto>({
    mutationKey: [QUERY_KEYS.UPLOADS, "postAmbag"],
    mutationFn: async (reqBody) => {
      const token = await currentUser.value?.getIdToken();
      if (!token) {
        throw new Error("User is not authenticated");
      }
      const response = await wretch(token).url("/ambags/upload").post(reqBody).res()
      const body = await response.json();
      return { body, status: response.status };
    },
  });
};
