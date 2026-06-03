type UserRol = "admin" | "employee";

export interface User {
  readonly id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  rol: UserRol;
  number_phone: string;
  address: string;
  imagen_link: string;
  status: boolean;
  readonly created_at: Date;
  updated_at: Date;
}

export interface CreateUserDTO extends Omit<
  User,
  "created_at" | "updated_at" | "id" | "status"
> {}

export interface LoginUserDTO extends Pick<User, "email" | "password"> {}
