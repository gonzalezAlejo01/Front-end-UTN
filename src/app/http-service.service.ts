import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Injectable } from  '@angular/core';


@Injectable({
providedIn:  'root'
})

export class HttpService {

  private urlApi = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  registrarse(cuerpo: any) {
    return this.http.post(this.urlApi + "/registrarse", cuerpo);
  }

  login(cuerpo: any){
    return this.http.post(this.urlApi + "/LoginAdministrador", cuerpo);
  }

  ingresarUsuario(cuerpo: any){
    return this.http.post(this.urlApi + "/investigadores", cuerpo, {headers: {Authorization: localStorage["clave"]}});
  }

  borrarUsuario(nombre: any){
    return this.http.delete(this.urlApi + "/investigadores/" + nombre,{headers: {Authorization: localStorage["clave"]}});
  }

  verUsuarios(){
    return this.http.get(this.urlApi + "/investigadores",{headers: {Authorization: localStorage["clave"]}});
  }

  modificarUsuario(nombre:any, cuerpo: any){
    return this.http.patch(this.urlApi + "/investigadores/" + nombre, cuerpo, {headers: {Authorization: localStorage["clave"]}});
  }

  ingresarAdministrador(cuerpo: any){
    return this.http.post(this.urlApi + "/administradores", cuerpo, {headers: {Authorization: localStorage["clave"]}});
  }
  borrarAdministrador(nombre: any){
    return this.http.delete(this.urlApi + "/administradores/" + nombre,{headers: {Authorization: localStorage["clave"]}});
  }
  getAdministradores(){
    return this.http.get(this.urlApi + "/administradores",{headers: {Authorization: localStorage["clave"]}});
  }
  ingresarLugar(cuerpo: any){
    return this.http.post(this.urlApi + "/lugares",cuerpo ,{headers: {Authorization: localStorage["clave"]}});
  }
  borrarLugar(nombre: any){
    return this.http.delete(this.urlApi + "/lugares/" + nombre,{headers: {Authorization: localStorage["clave"]}});
  }
  getLugares(){
    return this.http.get(this.urlApi + "/lugares",{headers: {Authorization: localStorage["clave"]}});
  }
  getLugar(id: any){
    return this.http.get(this.urlApi + "/lugares/" + id,{headers: {Authorization: localStorage["clave"]}});
  }
  getEventos(){
    return this.http.get(this.urlApi + "/eventos",{headers: {Authorization: localStorage["clave"]}});
  }
  borrarEvento(id: any){
    return this.http.delete(this.urlApi + "/eventos/" + id,{headers: {Authorization: localStorage["clave"]}});
  }
  postEvento(cuerpo: any){
    return this.http.post(this.urlApi + "/eventos", cuerpo,{headers: {Authorization: localStorage["clave"]}});
  }
  getEvento(id: any){
    return this.http.get(this.urlApi + "/eventos/" + id,{headers: {Authorization: localStorage["clave"]}});
  }
  getLugarXNombre(nombre: any){
    return this.http.get(this.urlApi + "/lugaresXnombre/" + nombre,{headers: {Authorization: localStorage["clave"]}});
  }
  actualizarEstado(id: any, cuerpo: any){
    return this.http.patch(this.urlApi + "/eventos/estado/" + id, cuerpo,{headers: {Authorization: localStorage["clave"]}});
  }
}