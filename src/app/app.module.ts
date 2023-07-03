import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SubCategoryService } from 'src/app/services/sub-category.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { CategoryService } from './services/category.service';
import { CategoryComponent } from './components/category/category.component';
import { ProductService } from './services/product.service';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  declarations: [AppComponent, SubCategoryComponent, CategoryComponent, ProductComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  providers: [
    HttpClientModule,
    SubCategoryService,
    CategoryService,
    ProductService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
