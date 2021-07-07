import { Component, OnInit, ViewChild } from '@angular/core';
import { FormaPagoService } from '../../services/forma-pago.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forma-pago',
  templateUrl: './forma-pago.component.html',
  styleUrls: ['./forma-pago.component.css']
})
export class FormaPagoComponent implements OnInit {
  formaPago;
  formaSelect;

  coincidencia: boolean = true;
  descripcion: string = "";
  buscarForma = "";
  orderDesc = "asc";
  
  getData = false;

  @ViewChild('closebuttonadd',  {static: false}) closebuttonadd;
  @ViewChild('closebuttonupd',  {static: false}) closebuttonupd;

  constructor(
    public _formaService: FormaPagoService,
    public toastr: ToastrService,
    public router: Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('tokenAPV') == null){
      this.router.navigate(['/login'])
      .then(() => {
        window.location.reload();
      });
    }

    this.getFormaPago();
  }

  getFormaPago(){
    this._formaService.getFormaPago().subscribe(correcto => {
      this.formaPago = correcto;
    });
  }

  searchFormaPago(buscar: NgForm){
    if(buscar.value.buscarForma == "" ){
      this.coincidencia = true;
      this.getFormaPago();
    }else{
      this._formaService.searchForma(buscar.value.buscarForma).subscribe(correcto => {
        if(correcto.length === 0 ){
            this.coincidencia = false;
            return;
        }else{
          this.coincidencia = true;
          this.formaPago = correcto;
        }
      }, (err) => {
        if(err.error.ok === false){
          this.formaPago=[];
          this.coincidencia = false;
          return;
        }
      });
    }
  }

  addFormaPago(formaPago: NgForm){
    if (formaPago.valid) {
        const forma = {
          descripcion: formaPago.value.descripcion,
        };
  
        this._formaService.addFormaPago(forma).subscribe(correcto => {
          if(correcto.ok === true){
            this.getFormaPago();
            this.closebuttonadd.nativeElement.click();
            this.toastr.success('Agregado Correctamente', 'Correcto');
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: correcto.message
            });
            return;
          }
        }, (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.err
          });
          return;
        });

    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe llenar todos los campos'
      });
    }
  }

  getDataForma(index){
    this.formaSelect = this.formaPago[index];
    this.getData = true;
  }

  updFormaPago(formaPago: NgForm){
    if (formaPago.valid) {
        const forma = {
          id: formaPago.value.id,
          descripcion: formaPago.value.descripcion,
        };
  
        this._formaService.updFormaPago(forma).subscribe(correcto => {
          if(correcto.ok === true){
            this.getFormaPago();
            this.closebuttonupd.nativeElement.click();
            this.toastr.success('Modificado Correctamente', 'Correcto');
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: correcto.message
            });
            return;
          }
        }, (err) => {
         
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.err
          });
          return;
        });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe llenar todos los campos'
      });
    }
  }

  ordenarForma(){
      if(this.orderDesc == "asc"){
        this.formaPago = this.formaPago.sort((a, b)=> a.forma_descripcion.localeCompare(b.forma_descripcion));
        this.orderDesc = "desc";
      }else{
        this.formaPago = this.formaPago.reverse((a, b)=> a.forma_descripcion.localeCompare(b.forma_descripcion));
        this.orderDesc = "desc";
      }
  }
}
