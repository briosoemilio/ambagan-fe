import type { User } from "./User";

export interface Project {
  id: string;
  name: string;
  description?: string;
  targetAmount?: number;
  projectCompletion?: number;
  ambagsCount?: number;
  users?: User[];
  owner: Owner;
  createdBy: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Date {
  _seconds: number;
  _nanoseconds: number;
}

export interface Owner {
  name: string;
  photoUrl: string;
}
