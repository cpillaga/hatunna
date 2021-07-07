import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { PAGES_ROUTES } from './pages.routes';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { FormaPagoComponent } from './forma-pago/forma-pago.component';



@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    EmpresaComponent,
    PresentacionComponent,
    FormaPagoComponent
  ],
  exports: [
      PagesComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class PagesModule { }
