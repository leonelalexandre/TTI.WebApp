import { Category } from "./category";

export class Product {
  id!: number;
  name!: string;
  currency!: string;
  price!: any;
  description!: string;
  idCategory!: number;
  country!: string;
  photo!: any;
  idCategoriesNavigation!: Category;
  file!: FormData;
  imageSelected!: string;
}

