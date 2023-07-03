import { Component, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Category } from 'src/app/models/category';
import { SubCategory } from 'src/app/models/subCategory';
import { CategoryService } from 'src/app/services/category.service';
import { SubCategoryService } from 'src/app/services/sub-category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  sessionIdiom = localStorage.getItem('idiomSysteSession');

  form: any;
  formTitle?: string;

  msgRequired =
    localStorage.getItem('idiomSysteSession') == 'PT-BR'
      ? ' é obrigatório'
      : ' is required';
  fieldDescription: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR'
      ? 'Descrição'
      : 'Description';
  fieldDescSubCategory: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR'
      ? 'Sub Categoria'
      : 'Sub Category';
  fieldAction: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR' ? 'Ação' : 'Action';
  fieldIdiom: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR' ? 'Idioma' : 'Idiom';
  buttonUpdate: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR'
      ? 'Atualizar'
      : 'Update';
  buttonDelete: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR' ? 'Excluir' : 'Delete';
  buttonSave: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR' ? 'Salvar' : 'Save';
  buttonBack: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR' ? 'Voltar' : 'Back';
  buttonNew: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR'
      ? 'Nova Categoria'
      : 'New Category';
  msgConfirDelete: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR'
      ? 'Confirmação de Exclusão'
      : 'Deletion Confirmation';
  msgBodyDelete: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR'
      ? 'Deseja prosseguir com a exclusão da categoria?'
      : 'Do you want to proceed with deleting the category?';
  buttonConfirmYes: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR' ? 'Sim' : 'Yes';
  buttonConfirmNo: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR' ? 'Não' : 'No';
  enumValuePortugues: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR'
      ? 'Português'
      : 'Portuguese';
  enumValueEnglish: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR' ? 'Inglês' : 'English';
  subCategories?: SubCategory[];
  categories?: Category[];
  description?: string;
  idiom?: string;
  id!: number;

  tableVisibility: boolean = true;
  formVisibility: boolean = false;

  modalRef!: BsModalRef;

  constructor(
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.categoryService.GetByAll().subscribe((result) => {
      this.categories = result;
    });

    this.subCategoryService.GetByAll().subscribe((result) => {
      this.subCategories = result;
    });

    this.form = new FormGroup({
      name: new FormControl(this.form.name, [Validators.required]),
      description: new FormControl(this.form.description, [
        Validators.required,
      ]),
      idiom: new FormControl(this.form.idiom, [Validators.required]),
      IdSubCategory: new FormControl(this.form.IdSubCategory, [
        Validators.required,
      ]),
    });
  }

  get descriptionCat() {
    return this.form.get('description');
  }
  get idiomCat() {
    return this.form.get('idiom');
  }
  get IdSubCategory() {
    return this.form.get('IdSubCategory');
  }

  ViewRegistrationForm(): void {
    this.tableVisibility = false;
    this.formVisibility = true;
    this.formTitle =
      localStorage.getItem('idiomSysteSession') == 'PT-BR'
        ? 'Nova Categoria'
        : 'New Category';
    this.form = new FormGroup({
      description: new FormControl(null),
      idiom: new FormControl(null),
      IdSubCategory: new FormControl(null),
    });
  }

  ViewUpdateForm(id: number): void {
    this.tableVisibility = false;
    this.formVisibility = true;

    this.categoryService.GetById(id).subscribe((result) => {
      this.formTitle =
        localStorage.getItem('idiomSysteSession') == 'PT-BR'
          ? `Atualizar ${result.description}`
          : `Update ${result.description}`;

      this.form = new FormGroup({
        id: new FormControl(result.id),
        description: new FormControl(result.description),
        idiom: new FormControl(result.idiom),
        IdSubCategory: new FormControl(result.idSubCategoryNavigation.id),
      });
    });
  }

  SubmitForm(): void {
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    const category: Category = this.form.value;

    if (category.id > 0) {
      this.categoryService.edit(category).subscribe(() => {
        this.formVisibility = false;
        this.tableVisibility = true;
        alert(
          localStorage.getItem('idiomSysteSession') == 'PT-BR'
            ? 'Atualizada com sucesso!'
            : 'Successfully updated!'
        );
        this.categoryService.GetByAll().subscribe((register) => {
          this.categories = register;
        });
      });
    } else {
      this.categoryService.Add(category).subscribe(() => {
        this.formVisibility = false;
        this.tableVisibility = true;
        alert(
          localStorage.getItem('idiomSysteSession') == 'PT-BR'
            ? 'Inserida com sucesso!'
            : 'inserted successfully!'
        );
        this.categoryService.GetByAll().subscribe((register) => {
          this.categories = register;
        });
      });
    }
  }

  Back(): void {
    this.tableVisibility = true;
    this.formVisibility = false;
  }

  DisplayConfirmationExclusion(
    id: number,
    description: string,
    conteudoModal: TemplateRef<any>
  ): void {
    this.modalRef = this.modalService.show(conteudoModal);
    this.id = id;
    this.description = description;
  }

  DeleteCategory(id: number) {
    this.categoryService.Delete(id).subscribe((result) => {
      this.modalRef.hide();
      alert(
        localStorage.getItem('idiomSysteSession') == 'PT-BR'
          ? 'Excluída com sucesso'
          : 'Successfully deleted'
      );
      this.categoryService.GetByAll().subscribe((register) => {
        this.categories = register;
      });
    });
  }
}
