import { Component, OnInit, ViewChild } from '@angular/core';
import { Proveedor } from '../../models/general.model';
import { ProveedorService } from '../../services/proveedor.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  
  proveedor: Proveedor[] = [];
  ruc: string = "";
  coincidencia: boolean = true;
  buscarProv = "";
  msgE="";

  tituloImg = "Seleccionar Foto";
  mensajeVal ="";

  @ViewChild('closebuttonadd',  {static: false}) closebuttonadd;
  @ViewChild('closebuttonupd',  {static: false}) closebuttonupd;

  constructor(
    public _provService: ProveedorService
  ) { }

  ngOnInit(): void {
    this.getProveedor();
  }

  getProveedor(){
    this._provService.getproveedor().subscribe(resp => {
      this.proveedor = resp;
    });
  }

  addProveedor(prov: NgForm){
    this._provService.addProveedor(prov.value).subscribe(resp => {
      this.getProveedor();
      this.closebuttonadd.nativeElement.click();
    });
  }
}
