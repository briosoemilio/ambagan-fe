import { z } from "zod";

export const addAmbagSchema = z.object({
  projectId: z.string().optional(),
  amount: z.number(),
  note: z.string().optional(),
  receipt: z
    .object({
      photoUrl: z.string().url(),
      uploadId: z.string(),
    })
    .optional(),
});

export type AddAmbagDto = z.infer<typeof addAmbagSchema>;
