export interface User {
  id: string;
  name?: string;
  mobileNumber?: string;
  description?: string;
  test?: string;
  email?: string;
  displayName?: null | string;
  photoURL?: null | string;
  createdAt?: CreatedAt;
}

export interface CreatedAt {
  _seconds: number;
  _nanoseconds: number;
}
