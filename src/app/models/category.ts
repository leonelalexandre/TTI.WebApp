import { SubCategory } from "./subCategory";

export class Category {
  id!: number;
  description!: string;
  idSubCategoryNavigation!: SubCategory;
  idiom!: string;
}
