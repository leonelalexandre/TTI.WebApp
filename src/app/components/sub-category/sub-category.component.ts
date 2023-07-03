import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SubCategory } from 'src/app/models/subCategory';
import { SubCategoryService } from 'src/app/services/sub-category.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css'],
})
export class SubCategoryComponent implements OnInit {
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
      ? 'Nova Sub Categoria'
      : 'New Sub Category';
  msgConfirDelete: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR'
      ? 'Confirmação de Exclusão'
      : 'Deletion Confirmation';
  msgBodyDelete: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR'
      ? 'Deseja prosseguir com a exclusão da sub categoria?'
      : 'Do you want to proceed with deleting the sub category?';
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
  descriptionCat?: string;
  idiomCat?: string;
  id!: number;

  tableVisibility: boolean = true;
  formVisibility: boolean = false;

  modalRef!: BsModalRef;

  constructor(
    private subCategoryService: SubCategoryService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.subCategoryService.GetByAll().subscribe((result) => {
      this.subCategories = result;
    });

    this.form = new FormGroup({
      name: new FormControl(this.form.name, [Validators.required]),
      description: new FormControl(this.form.description, [
        Validators.required,
      ]),
      idiom: new FormControl(this.form.idiom, [Validators.required]),
    });
  }

  get description() {
    return this.form.get('description');
  }
  get idiom() {
    return this.form.get('idiom');
  }

  ViewRegistrationForm(): void {
    this.tableVisibility = false;
    this.formVisibility = true;
    this.formTitle =
      localStorage.getItem('idiomSysteSession') == 'PT-BR'
        ? 'Nova Sub Categoria'
        : 'New Sub Category';
    this.form = new FormGroup({
      description: new FormControl(null),
      idiom: new FormControl(null),
    });
  }

  ViewUpdateForm(id: number): void {
    this.tableVisibility = false;
    this.formVisibility = true;

    this.subCategoryService.GetById(id).subscribe((result) => {
      this.formTitle =
        localStorage.getItem('idiomSysteSession') == 'PT-BR'
          ? `Atualizar ${result.description}`
          : `Update ${result.description}`;

      this.form = new FormGroup({
        id: new FormControl(result.id),
        description: new FormControl(result.description),
        idiom: new FormControl(result.idiom),
      });
    });
  }

  SubmitForm(): void {
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    const subCategory: SubCategory = this.form.value;

    if (subCategory.id > 0) {
      this.subCategoryService.edit(subCategory).subscribe(() => {
        this.formVisibility = false;
        this.tableVisibility = true;
        alert(
          localStorage.getItem('idiomSysteSession') == 'PT-BR'
            ? 'Atualizada com sucesso!'
            : 'Successfully updated!'
        );
        this.subCategoryService.GetByAll().subscribe((register) => {
          this.subCategories = register;
        });
      });
    } else {
      this.subCategoryService.Add(subCategory).subscribe(() => {
        this.formVisibility = false;
        this.tableVisibility = true;
        alert(
          localStorage.getItem('idiomSysteSession') == 'PT-BR'
            ? 'Inserida com sucesso!'
            : 'inserted successfully!'
        );
        this.subCategoryService.GetByAll().subscribe((register) => {
          this.subCategories = register;
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
    this.descriptionCat = description;
  }

  DeleteSubCategory(id: number) {
    this.subCategoryService.Delete(id).subscribe((result) => {
      this.modalRef.hide();
      alert(
        localStorage.getItem('idiomSysteSession') == 'PT-BR'
          ? 'Excluída com sucesso'
          : 'Successfully deleted'
      );
      this.subCategoryService.GetByAll().subscribe((register) => {
        this.subCategories = register;
      });
    });
  }
}
