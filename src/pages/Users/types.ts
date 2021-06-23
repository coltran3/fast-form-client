export interface User {
  enrollment: string;
  cpf: string;
  type: UserType;
  role: UserRole;
  id: 0;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface UserParams extends Omit<User, "id" | "createdAt" | "updatedAt" | "deletedAt"> {
  password: string;
  confirmPassword: string;
}

export enum UserType {
  PROFESSOR = "Professor",
  STUDENT = "Student",
}

export enum UserRole {
  MANAGER = "manager",
  ADMIN = "admin",
  REGULAR = "regular",
}
