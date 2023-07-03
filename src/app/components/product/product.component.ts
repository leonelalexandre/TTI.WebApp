import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from './../../services/product.service';
import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  sessionIdiom = localStorage.getItem('idiomSysteSession');

  form: any;
  formTitle?: string;
  imageSelected!: any;
  loadCurrency!: string;
  uploadImage!: string;

  fieldDescription: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR'
      ? 'Descrição'
      : 'Description';
  msgRequired =
    localStorage.getItem('idiomSysteSession') == 'PT-BR'
      ? ' é obrigatório'
      : ' is required';
  fieldName: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR' ? 'Nome' : 'Name';
  fieldSearch: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR' ? 'Buscar' : 'Search';
  fieldcurrency: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR' ? 'Moeda' : 'Currency';
  fieldPrice: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR' ? 'Preço' : 'Price';
  fieldCountry: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR' ? 'País' : 'Country';
  fieldPhoto: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR' ? 'Foto' : 'Photo';
  fieldDescCategory: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR'
      ? 'Categoria'
      : 'Category';
  fieldAction: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR' ? 'Ação' : 'Action';
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
      ? 'Novo Produto'
      : 'New Product';
  msgConfirDelete: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR'
      ? 'Confirmação de Exclusão'
      : 'Deletion Confirmation';
  msgBodyDelete: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR'
      ? 'Deseja prosseguir com a exclusão do produto?'
      : 'Do you want to proceed with deleting the product?';
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
  categories?: Category[];
  products?: Product[];
  listIbge?: any[];
  descriptionConfirm?: string;
  idiom?: string;
  id!: number;

  tableVisibility: boolean = true;
  formVisibility: boolean = false;

  modalRef!: BsModalRef;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    var siglaIdiom = this.sessionIdiom == 'PT-BR' ? 'BR' : 'EN';

    this.categoryService.GetByAll().subscribe((result) => {
      this.categories = result;
    });

    this.productService.GetByAll().subscribe((result) => {
      this.products = result;
    });

    fetch(
      `https://servicodados.ibge.gov.br/api/v1/paises/Brasil?lang=${siglaIdiom}`
    )
      .then((res) => res.json())
      .then((data) => {
        let myJSON = JSON.stringify(data);
        myJSON = myJSON.replaceAll('-', '_');

        this.listIbge = JSON.parse(myJSON);
      });

    this.form = new FormGroup({
      name: new FormControl(this.form.name, [Validators.required]),
      description: new FormControl(this.form.description, [
        Validators.required,
      ]),
      price: new FormControl(this.form.price, [Validators.required]),
      country: new FormControl(this.form.country, [Validators.required]),
      photo: new FormControl(this.form.photo, [Validators.required]),
      idCategory: new FormControl(this.form.idCategory, [Validators.required]),
    });
  }

  get name() {
    return this.form.get('name');
  }
  get description() {
    return this.form.get('description');
  }
  get price() {
    return this.form.get('price');
  }
  get country() {
    return this.form.get('country');
  }
  get photo() {
    return this.form.get('photo');
  }
  get idCategory() {
    return this.form.get('idCategory');
  }

  onImageSelected(e: any): void {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSelected = reader.result as string;
        this.uploadImage = this.imageSelected.replaceAll(
          'data:image/jpeg;base64,',
          ''
        );
      };
    }
  }

  onGetByKeyword(e: any): void {
    if (e.target.value == '') this.ngOnInit();

    this.productService.getByKeyword(e.target.value).subscribe((result) => {
      this.products = result;
    });
  }

  insertCurrency(e: any): void {
    const currencyAux = this.listIbge?.find(
      (p: any) => p.nome.abreviado == e.target.value
    );
    if (currencyAux)
      this.loadCurrency = currencyAux.unidades_monetarias[0].id.ISO_4217_ALPHA;
  }

  ViewRegistrationForm(): void {
    this.tableVisibility = false;
    this.formVisibility = true;
    this.formTitle =
      localStorage.getItem('idiomSysteSession') == 'PT-BR'
        ? 'Novo Produto'
        : 'New Product';
    this.form = new FormGroup({
      description: new FormControl(null),
      name: new FormControl(null),
      currency: new FormControl(null),
      price: new FormControl(null),
      country: new FormControl(null),
      photo: new FormControl(null),
      idCategory: new FormControl(null),
    });
  }

  ViewUpdateForm(id: number): void {
    this.tableVisibility = false;
    this.formVisibility = true;

    this.productService.GetById(id).subscribe((result) => {
      this.formTitle =
        localStorage.getItem('idiomSysteSession') == 'PT-BR'
          ? `Atualizar ${result.description}`
          : `Update ${result.description}`;

      this.imageSelected = result.imageSelected;
      this.loadCurrency = result.currency;

      this.form = new FormGroup({
        id: new FormControl(result.id),
        description: new FormControl(result.description),
        name: new FormControl(result.name),
        currency: new FormControl(result.currency),
        price: new FormControl(result.price),
        country: new FormControl(result.country),
        photo: new FormControl(result.photo),
        idCategory: new FormControl(result.idCategoriesNavigation.id),
      });
    });
  }

  SubmitForm(): void {
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    const product: Product = this.form.value;
    product.photo = this.uploadImage;
    product.currency = this.loadCurrency;

    if (product.id > 0) {
      this.productService.edit(product).subscribe(() => {
        this.formVisibility = false;
        this.tableVisibility = true;
        alert(
          localStorage.getItem('idiomSysteSession') == 'PT-BR'
            ? 'Atualizada com sucesso!'
            : 'Successfully updated!'
        );
        this.productService.GetByAll().subscribe((register) => {
          this.products = register;
        });
      });
    } else {
      this.productService.Add(product).subscribe(() => {
        this.formVisibility = false;
        this.tableVisibility = true;
        alert(
          localStorage.getItem('idiomSysteSession') == 'PT-BR'
            ? 'Inserida com sucesso!'
            : 'inserted successfully!'
        );
        this.productService.GetByAll().subscribe((register) => {
          this.products = register;
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
    this.descriptionConfirm = description;
  }

  DeleteCategory(id: number) {
    this.productService.Delete(id).subscribe((result) => {
      this.modalRef.hide();
      alert(
        localStorage.getItem('idiomSysteSession') == 'PT-BR'
          ? 'Excluída com sucesso'
          : 'Successfully deleted'
      );
      this.productService.GetByAll().subscribe((register) => {
        this.products = register;
      });
    });
  }
}
