import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(
    private http: HttpClient,
  ) { }

  getproveedor(){

    let token = localStorage.getItem('tokenHat');
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/proveedor';

    return this.http.get( url, {headers} )
                .map( (resp: any) =>
                    resp.proveedor
                );
  }

  
  addProveedor(proveedor){
    let token = localStorage.getItem('tokenHat');
    
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/proveedor';

    return this.http.post( url, proveedor, {headers} )
        .map((resp: any) =>
            resp.proveedor
        );
  }
}
