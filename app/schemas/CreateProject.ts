import { z } from 'zod'

export const createProjectSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  targetAmount: z.number().optional(),
})

export type CreateProject = z.infer<typeof createProjectSchema>
