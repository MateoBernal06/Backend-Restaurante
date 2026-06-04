export interface Category {
  readonly id: string;
  name: string;
  description: string;
  imagen_link: string;
  status: boolean;
  readonly created_at: Date;
  updated_at: Date;
}

export interface CreateCategoryDTO extends Omit<
  Category,
  "id" | "status" | "created_at" | "updated_at"
> {}
