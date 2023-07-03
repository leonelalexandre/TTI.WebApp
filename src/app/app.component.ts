import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TTI-WebApp';
  idiomSystem = localStorage.getItem('idiomSysteSession');
  titleWelcome = localStorage.getItem('idiomSysteSession') == "PT-BR" ? "Bem Vindo" : "Welcome";
  navProduct: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR'
      ? 'Produto'
      : 'Product';
  navCategory: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR'
      ? 'Categoria'
      : 'Category';
  navSubCategory: string =
    localStorage.getItem('idiomSysteSession') == 'PT-BR'
      ? 'Sub Categoria'
      : 'Sub Category';
  
  onChangeIdiomSession(e: any): void{
    localStorage.setItem('idiomSysteSession', e.target.value);
    window.location.reload();
  }
}
