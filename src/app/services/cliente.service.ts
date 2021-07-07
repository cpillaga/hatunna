import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICE } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient,
  ) { }

  addCliente(idEmp){
    let token = localStorage.getItem('tokenAPV');
    
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/cliente';

    const cliente = {
      ciRuc: '9999999999',
      nombre: 'CONSUMIDOR FINAL'.toUpperCase(),
      telefono: 's/t',
      direccion: 's/d'.toUpperCase(),
      correo: 's/c',
      empresa: idEmp
    };

    return this.http.post( url, cliente, {headers} )
        .map((resp: any) =>
            resp
        );
  }

}
