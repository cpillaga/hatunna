import { Component, OnInit, ViewChild } from '@angular/core';
import { Categoria, SubCategoria } from '../../models/general.model';
import { CategoriaService } from '../../services/categoria.service';
import { SubcategoriaService } from '../../services/subcategoria.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css']
})
export class SubcategoriaComponent implements OnInit {
  
  categorias: Categoria[] = [];
  subcategorias: SubCategoria[] = [];
  coincidencia: boolean = true;
  descripcion: string = "";
  buscarSubCat = "";
  
  getData = false;

  @ViewChild('closebuttonadd',  {static: false}) closebuttonadd;
  @ViewChild('closebuttonupd',  {static: false}) closebuttonupd;

  constructor(
    public _catService: CategoriaService,
    public _subCService: SubcategoriaService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getSubCategorias();
    this.getCategorias();
  }

  getSubCategorias(){
    this._subCService.getSubCategoria().subscribe(correcto => {
      this.subcategorias = correcto;
    });
  }

  getCategorias(){
    this._catService.getCategoria().subscribe(correcto => {
      this.categorias = correcto;
    });
  }

  addSubCat(sub: NgForm){
    if (sub.valid) {
      const subCategoria = {
        descripcion: sub.value.descripcion,
        categoria: sub.value.categoria
      }

      this._subCService.addSubCat(subCategoria).subscribe(resp => {
        this.getSubCategorias();
        this.closebuttonadd.nativeElement.click();
        // this.toastr.success('Agregado Correctamente', 'Correcto');
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe llenar todos los campos'
      });
    }
    

    
  }

}
