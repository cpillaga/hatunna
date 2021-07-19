import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categorias;
  coincidencia: boolean = true;
  descripcion: string = "";
  buscarCat = "";
  
  getData = false;

  public selectImg: File = null;
  public img?: string;
  public nomImg: string;
  public imgTemp: any = null;


  @ViewChild('closebuttonadd',  {static: false}) closebuttonadd;
  @ViewChild('closebuttonupd',  {static: false}) closebuttonupd;


  constructor(
    public _catService: CategoriaService,
    public toastr: ToastrService,
    public router: Router,

  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('tokenHat') == null){
      this.router.navigate(['/login'])
      .then(() => {
        window.location.reload();
      });
    }

    this.getCategorias();
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

  getCategorias(){
    this._catService.getCategoria().subscribe(correcto => {
      this.categorias = correcto;
      console.log(this.categorias);
    });
  }


  addCategoria(cat: NgForm){
    if (cat.valid) {

        this._catService.subirImg(this.imgTemp).then(url => {
          const categoria = {
            descripcion: cat.value.descripcion,
            img: url
          }
          
          this._catService.addCategoria(categoria).subscribe(correcto => {
           
            this.getCategorias();
            this.closebuttonadd.nativeElement.click();
            this.toastr.success('Agregado Correctamente', 'Correcto');
          
        }, (err) => {
          console.log(err);
          return;
        });
        })
        

    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe llenar todos los campos'
      });
    }
  }

}
