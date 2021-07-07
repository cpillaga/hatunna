import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PresentacionService } from '../../services/presentacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',
  styleUrls: ['./presentacion.component.css']
})
export class PresentacionComponent implements OnInit {
  presentacion;
  presSelect;

  coincidencia: boolean = true;
  descripcion: string = "";
  buscarPres = "";
  orderDesc = "asc";
  
  getData = false;

  @ViewChild('closebuttonadd',  {static: false}) closebuttonadd;
  @ViewChild('closebuttonupd',  {static: false}) closebuttonupd;

  constructor(
    public _presService: PresentacionService,
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

    this.getPresentacion();

  }

  getPresentacion(){
    this._presService.getPresentacion().subscribe(correcto => {
      this.presentacion = correcto;
    });
  }

  searchPresentacion(buscar: NgForm){
    if(buscar.value.buscarPres == "" ){
      this.coincidencia = true;
      this.getPresentacion();
    }else{
      this._presService.searchPres(buscar.value.buscarPres).subscribe(correcto => {
        if(correcto.length === 0 ){
            this.coincidencia = false;
            return;
        }else{
          this.coincidencia = true;
          this.presentacion = correcto;
        }
      }, (err) => {
        if(err.error.ok === false){
          this.presentacion=[];
          this.coincidencia = false;
          return;
        }
      });
    }
  }

  addPresentacion(pres: NgForm){
    if (pres.valid) {
        const presentcion = {
          descripcion: pres.value.descripcion,
        };
  
        this._presService.addPresentacion(presentcion).subscribe(correcto => {
          if(correcto.ok === true){
            this.getPresentacion();
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

  getDataPres(index){
    this.presSelect = this.presentacion[index];
    this.getData = true;
  }

  updPresentacion(pres: NgForm){
    if (pres.valid) {
        const presentacion = {
          id: pres.value.id,
          descripcion: pres.value.descripcion,
        };
  
        this._presService.updPresentacion(presentacion).subscribe(correcto => {
          if(correcto.ok === true){
            this.getPresentacion();
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

  ordenarPres(){
      if(this.orderDesc == "asc"){
        this.presentacion = this.presentacion.sort((a, b)=> a.pres_descripcion.localeCompare(b.pres_descripcion));
        this.orderDesc = "desc";
      }else{
        this.presentacion = this.presentacion.reverse((a, b)=> a.pres_descripcion.localeCompare(b.pres_descripcion));
        this.orderDesc = "desc";
      }
  }
}
