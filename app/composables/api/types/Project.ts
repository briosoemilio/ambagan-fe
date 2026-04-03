import type { User } from "./User";

export interface Project {
  id: string;
  name: string;
  createdBy: string;
  owner: {
    name: string,
    photoUrl: string,
  }
  ambagsCount?: number;
  projectCompletion?: number;
  users?: User[]
  targetAmount?: number;
}
