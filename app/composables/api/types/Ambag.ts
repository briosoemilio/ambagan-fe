export interface Ambag {
  id: string;
  projectId: string;
  note: string;
  contributor: Contributor;
  createdBy: string;
  createdAt: Date;
  amount: number;
  updatedBy: string;
  updatedAt: Date;
}

export interface Contributor {
  name: string;
  photoUrl: string;
}

export interface Date {
  _seconds: number;
  _nanoseconds: number;
}
