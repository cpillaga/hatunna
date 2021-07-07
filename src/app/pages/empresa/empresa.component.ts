import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../models/empresa.model';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import { ClienteService } from '../../services/cliente.service';
import Swal from 'sweetalert2';

import { validarCedula, validarRuc } from '../../utils/validaciones';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  empresas;

  coincidencia: boolean = true;
  ruc: string = "";
  buscarEmp = "";
  msgE="";

  tituloImg = "Seleccionar Foto";
  mensajeVal ="";

  orderRS = "asc";
  orderES = "asc";

  public selectImg: File = null;
  public img?: string;
  public nomImg: string;
  public imgTemp: any = null;

  @ViewChild('closebuttonadd',  {static: false}) closebuttonadd;
  @ViewChild('closebuttonupd',  {static: false}) closebuttonupd;

  constructor(
    public _empresaService: EmpresaService,
    public _empleadoService: EmpleadoService,
    public _clienteService: ClienteService,
    public toastr: ToastrService,
    public router: Router
  ) { }

  ngOnInit(): void {
    // if(localStorage.getItem('tokenAPV') == null){
    //   this.router.navigate(['/login'])
    //   .then(() => {
    //     window.location.reload();
    //   });
    // }

    // this.getEmpresa();

  }

  getEmpresa(){
    this._empresaService.getEmpresa().subscribe(correcto => {
      this.empresas = correcto;
    });
  }

  validacionCiRuc(ciRuc){
    let result = false;

      if(ciRuc.length == 13){
        if(validarRuc(ciRuc)){
          result =true;
        }
      }else if(ciRuc.length == 10){
        if(validarCedula(ciRuc)){
          result =true;
        }
      }

      if(!result){
        this.mensajeVal ="C.I ó RUC Incorrecto";
        this.msgE = "validar";
      }else{
        this.mensajeVal = "";
        this.msgE ="";
      }
  }

  searchEmpresa(buscar: NgForm){
    if(buscar.value.buscarEmp == "" ){
      this.coincidencia = true;
      this.getEmpresa();
    }else{
      this._empresaService.searchEmp(buscar.value.buscarEmp).subscribe(correcto => {
        if(correcto.length === 0 ){
            this.coincidencia = false;
            return;
        }else{
          this.coincidencia = true;
          this.empresas = correcto;
        }
      }, (err) => {
        if(err.error.ok === false){
          this.empresas=[];
          this.coincidencia = false;
          return;
        }
      });
    }
  }
  
  selectImage(file: File){
    this.selectImg = file;
    this.nomImg = file.name;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  addEmpresa(emp: NgForm){
    if(this.mensajeVal != ""){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'C.I ó RUC incorrecto'
      });
      return;
    }

    if (emp.valid && this.imgTemp != null) {
      
      this._empresaService.subirImg(this.imgTemp).then(url => {
        const empresa = {
          ruc: emp.value.ruc,
          razonSocial: emp.value.razonSoc,
          representante: emp.value.representante,
          telefono: emp.value.telefono,
          direccion: emp.value.direccion,
          correo: emp.value.correo,
          numSerie: emp.value.numSerie,
          img: url
        };
  
        this._empresaService.addEmpresa(empresa).subscribe(correcto => {
          if(correcto.ok === true){
            this._empresaService.searchEmp(empresa.ruc).subscribe(empr => {
              this._empleadoService.addEmpleado(emp.value.usuario, empr[0].empr_id, empr[0].empr_correo).subscribe(addEmpleado => {
                if(addEmpleado.ok === true){
                    this._clienteService.addCliente(empr[0].empr_id).subscribe(addCliente => {
                      if(addCliente.ok === true){
                        this.getEmpresa();
                        this.closebuttonadd.nativeElement.click();
                        this.toastr.success('Agregado Correctamente', 'Correcto');
                      }else{
                        Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: addCliente.message
                        });
                        return;
                      }
                    });
                }else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: addEmpleado.message
                  });
                  return;
                }
             
              });
            });
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: correcto.message
            });
            return;
          }
        });
      });

    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe llenar todos los campos'
      });
    }
  }

  delEmpresa(id, estado, nombre){
    let status = "";
    let texto = "¿Seguro desea ";
    if(estado === false ){
      status = "Inactivo";
      texto = texto + "eliminar a ";
    }else{
      status = "Activo";
      texto = texto + "habilitar a ";
    }

    Swal.fire({
      icon: 'question',
      title: texto + nombre +"?",
      showCancelButton: true,
      confirmButtonColor: '#23CCEF',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      width: '450px',
      heightAuto: true,
      showClass: {
        popup: 'animated fadeInDown faster'
      },
      hideClass: {
        popup: 'animated fadeOutUp faster'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this._empresaService.delEmpresa(id, status).subscribe(resp => {
          this.getEmpresa();
        });
      }else{
        this.getEmpresa();
      }
    });
    
  }

  ordenarEmp(atributo){
    if(atributo == "razonSocial"){
      if(this.orderRS == "asc"){
        this.empresas = this.empresas.sort((a, b)=> a.empr_razonSoc.localeCompare(b.empr_razonSoc));
        this.orderRS = "desc";
      }else{
        this.empresas = this.empresas.reverse((a, b)=> a.empr_razonSoc.localeCompare(b.empr_razonSoc));
        this.orderRS = "asc";
      }
    }else if(atributo == "estado"){
      if(this.orderES == "asc"){
        this.empresas = this.empresas.sort((a, b)=> a.empr_estado.localeCompare(b.empr_estado));
        this.orderES = "desc";
      }else{
        this.empresas = this.empresas.reverse((a, b)=> a.empr_estado.localeCompare(b.empr_estado));
        this.orderES = "asc";
      }
    }
  }
}
