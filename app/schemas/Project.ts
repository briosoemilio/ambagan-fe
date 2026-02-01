import * as z from "zod";

export const Project = z.object({
  name: z.string(),
  members: z.array(z.string()).optional(),
  createdBy: z.string().optional(),
  description: z.string().optional(),
});