import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICE } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  fechaAct: string = new Date().toISOString();

  constructor(
    private http: HttpClient,
  ) { }

  getEmpresa(){

    let token = localStorage.getItem('tokenAPV');
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/empresa';

    return this.http.get( url, {headers} )
                .map( (resp: any) =>
                    resp.empresa
                );
  }
  
  getEmpresaId(id){
    let token = localStorage.getItem('tokenAPV');
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/empresa/buscar/'+ id;

    return this.http.get( url, {headers} )
                .map( (resp: any) =>
                    resp.empresa
                );
  }

  searchEmp(termino: string){
    let token = localStorage.getItem('tokenAPV');
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/empresa/buscar/' + termino;

    return this.http.get( url, {headers} )
                .map( (resp: any) =>
                    resp.empresa
                );
  }

  addEmpresa(empresa){
    let token = localStorage.getItem('tokenAPV');
    
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/empresa';

    return this.http.post( url, empresa, {headers} )
        .map((resp: any) =>
            resp
        );
  }

  async subirImg(img: File){
    const url = "https://api.cloudinary.com/v1_1/drzhaxiyr/image/upload?upload_preset=s8pxccp7";

    const fd = new FormData();
    fd.append('file', img);

    const resp = await fetch( url, {
        method: 'POST',
        body: fd
    });

    const data = await resp.json();

    return data.secure_url;
  }

  delEmpresa(id, estado){
    let token = localStorage.getItem('tokenAPV');
    
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/empresa/'+id+'/'+estado;

    return this.http.delete( url, {headers} )
        .map((resp: any) =>
            resp
        );
  }
}
