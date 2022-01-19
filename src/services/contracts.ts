export interface SeedingOptions {
  sports: boolean;
  colleges: boolean;
  athletes: boolean;
}

export enum UserRole {
  ADMIN = 'admin',
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserTokenPayload {
  id: string;
  collegeId: string;
  role: string;
}

export interface AdminAttributes extends UserCredentials {
  id: string;
  collegeId: string;
  name: string;
  surname: string;
  role: UserRole;
}
