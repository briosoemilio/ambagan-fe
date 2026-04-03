import type { User } from "./User";

export interface Project {
  id: string;
  name: string;
  createdBy: string;
  ownerAvatar?: { src: string };
  ambagsCount?: number;
  projectCompletion?: number;
  users?: User[]
  targetAmount?: number;
}
