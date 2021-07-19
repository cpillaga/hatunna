import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(
    private http: HttpClient,
  ) { }

  getProductos(){

    let token = localStorage.getItem('tokenHat');
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/productos';

    return this.http.get( url, {headers} )
                .map( (resp: any) =>
                    resp.productos
                );
  }

  
  addProducto(producto){
    let token = localStorage.getItem('tokenHat');
    
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/productos';

    return this.http.post( url, producto, {headers} )
        .map((resp: any) =>
            resp.producto
        );
  }
}
