import { Injectable } from '@angular/core';
import { URL_SERVICE } from '../config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PresentacionService {

  constructor(
    private http: HttpClient,
  ) { }

  getPresentacion(){

    let token = localStorage.getItem('tokenAPV');
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/presentacion';

    return this.http.get( url, {headers} )
                .map( (resp: any) =>
                    resp.presentacion
                );
  }

  searchPres(termino: string){
    let token = localStorage.getItem('tokenAPV');
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/presentacion/buscar/' + termino;

    return this.http.get( url, {headers} )
                .map( (resp: any) =>
                    resp.presentacion
                );
  }

  addPresentacion(presentacion){
    let token = localStorage.getItem('tokenAPV');
    
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/presentacion';

    return this.http.post( url, presentacion, {headers} )
        .map((resp: any) =>
            resp
        );
  }

  updPresentacion(presentacion){
    let token = localStorage.getItem('tokenAPV');
    
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/presentacion/' + presentacion.id;

    return this.http.put( url, presentacion, {headers} )
        .map((resp: any) =>
            resp
        );
  }
}
