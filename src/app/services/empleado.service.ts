import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(
    private http: HttpClient,
  ) { }

  addEmpleado(user, id, correoE){
    let token = localStorage.getItem('tokenAPV');
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/empleado';

    const empleado = {
      nombre: 'Administrador'.toUpperCase(),
      telefono: '9999999999',
      direccion: 'Default'.toUpperCase(),
      correo: correoE,
      password: '1234',
      rol: 'Administrador',
      empresa: id,
      usuario: user
    };

    return this.http.post( url, empleado, {headers} )
        .map((resp: any) =>
            resp
        );
  }
}
