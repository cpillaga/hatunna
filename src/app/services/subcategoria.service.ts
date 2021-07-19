import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {

  constructor(
    private http: HttpClient,
  ) { }

  getSubCategoria(){

    let token = localStorage.getItem('tokenHat');
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/subcategoria';

    return this.http.get( url, {headers} )
                .map( (resp: any) =>
                    resp.subcategoria
                );
  }

  getSubCatId(idCat){

    let token = localStorage.getItem('tokenHat');
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/subcategoria/cat/'+idCat;

    return this.http.get( url, {headers} )
                .map( (resp: any) =>
                    resp.subcategoria
                );
  }

  addSubCat(subcategoria){
    let token = localStorage.getItem('tokenHat');
    
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/subcategoria';

    return this.http.post( url, subcategoria, {headers} )
        .map((resp: any) =>
            resp.subcategoria
        );
  }
}
