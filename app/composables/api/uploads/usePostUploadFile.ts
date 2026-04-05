import { useMutation } from "@tanstack/vue-query";
import { QUERY_KEYS } from "../QUERY_KEYS";
import wretch from "../wretch";

interface UploadResponse {
  photoUrl: string;
}

export const usePostUploadFile = () => {
  const currentUser = useCurrentUser();
  return useMutation<{ body: UploadResponse; status: number }, Error, File>({
    mutationKey: [QUERY_KEYS.UPLOADS, "postFile"],
    mutationFn: async (file) => {
      const token = await currentUser.value?.getIdToken();
      if (!token) {
        throw new Error("User is not authenticated");
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await wretch(token)
        .url("/ambags/upload")
        .post(formData)
        .res();

      const body = await response.json();

      return { body, status: response.status };
    },
  });
};
