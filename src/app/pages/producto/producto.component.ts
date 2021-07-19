import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Categoria, SubCategoria, Proveedor, Producto } from '../../models/general.model';
import { ProductoService } from '../../services/producto.service';
import { SubcategoriaService } from '../../services/subcategoria.service';
import { CategoriaService } from '../../services/categoria.service';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];

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

  categorias: Categoria[] = [];
  subcategorias: SubCategoria[] = [];
  proveedores: Proveedor[] = [];

  @ViewChild('closebuttonadd',  {static: false}) closebuttonadd;
  @ViewChild('closebuttonupd',  {static: false}) closebuttonupd;

  constructor(
    public toastr: ToastrService,
    public _prodService: ProductoService,
    public _provService: ProveedorService,
    public _catService: CategoriaService,
    public _subCatService: SubcategoriaService,
    public router: Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('tokenHat') == null){
      this.router.navigate(['/login'])
      .then(() => {
        window.location.reload();
      });
    }

    this.getProducto();
    this.getCategoria();
    this.getProveedores();
  }

  getProducto(){
    this._prodService.getProductos().subscribe(resp => {
      this.productos = resp;
      console.log(this.productos);
    });
  }

  addProducto(prod: NgForm){
    this._catService.subirImg(this.imgTemp).then(url => {
      const producto = {
        nombre: prod.value.nombre,
        precioUni: prod.value.precioUni,
        unidadMedida: prod.value.unidadMedida,
        img: url,
        subcategoria: prod.value.subcategoria,
        stock: prod.value.stock,
        proveedor: prod.value.proveedor
      };

      this._prodService.addProducto(producto).subscribe(resp => {
        this.getProducto();
        this.closebuttonadd.nativeElement.click();
      })
    })
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

  getCategoria(){
    this._catService.getCategoria().subscribe(resp => {
      this.categorias = resp;
    });
  }

  getSubCategoria(idCat){
    this._subCatService.getSubCatId(idCat).subscribe(resp=>{
      this.subcategorias = resp;
    });
  }

  getProveedores(){
    this._provService.getproveedor().subscribe(resp => {
      this.proveedores = resp;
    });
  }
}
