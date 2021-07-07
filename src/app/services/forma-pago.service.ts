import { Injectable } from '@angular/core';
import { URL_SERVICE } from '../config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormaPagoService {

  constructor(
    private http: HttpClient,
  ) { }

  getFormaPago(){

    let token = localStorage.getItem('tokenAPV');
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/formaPago';

    return this.http.get( url, {headers} )
                .map( (resp: any) =>
                    resp.formaPago
                );
  }

  searchForma(termino: string){
    let token = localStorage.getItem('tokenAPV');
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/formaPago/buscar/' + termino;

    return this.http.get( url, {headers} )
                .map( (resp: any) =>
                    resp.formaPago
                );
  }

  addFormaPago(formaPago){
    let token = localStorage.getItem('tokenAPV');
    
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/formaPago';

    return this.http.post( url, formaPago, {headers} )
        .map((resp: any) =>
            resp
        );
  }

  updFormaPago(formaPago){
    let token = localStorage.getItem('tokenAPV');
    
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/formaPago/' + formaPago.id;

    return this.http.put( url, formaPago, {headers} )
        .map((resp: any) =>
            resp
        );
  }
}
