import { z } from 'zod'

export const addAmbagSchema = z.object({
    projectId: z.string().optional(),
  amount: z.number(),
  note: z.string().optional(),
  photoUrl: z.string().url().optional(),
});

export type AddAmbagDto = z.infer<typeof addAmbagSchema>
