type unitProduct = "unidad" | "Kg" | "Lb";

export interface Product {
  readonly id: string;
  category_id: string;
  readonly user_id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  unit: unitProduct;
  imagen_link: string;
  status: boolean;
  readonly created_at: Date;
  readonly updated_at: Date;
}

export interface CreateProductDTO extends Omit<
  Product,
  "id" | "status" | "created_at" | "updated_at"
> {}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {}
