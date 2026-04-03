export interface Project {
  id: number;
  name: string;
  owner: { name: string; avatar?: { src: string } };
  ambagsCount: number;
  users: { name: string; avatar?: { src: string } }[];
  projectCompletion: number;
}
