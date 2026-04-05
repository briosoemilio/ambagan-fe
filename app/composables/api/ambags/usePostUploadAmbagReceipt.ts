import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { QUERY_KEYS } from "../QUERY_KEYS";
import wretch from "../wretch";

export const usePostUploadAmbagReceipt = () => {
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();
  return useMutation<{ status: number }, Error, { ambagId: string, file: File }>({
    mutationKey: [QUERY_KEYS.UPLOADS, "postAmbagReceipt"],
    mutationFn: async ({ ambagId, file }) => {
      const token = await currentUser.value?.getIdToken();
      if (!token) {
        throw new Error("User is not authenticated");
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await wretch(token)
        .url(`/ambags/${ambagId}/upload-receipt`)
        .post(formData)
        .res();
        
      return { status: response.status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AMBAGS] });
    },
  });
};
