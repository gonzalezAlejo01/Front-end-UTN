import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Injectable } from  '@angular/core';
import { jwtDecode } from 'jwt-decode';


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
    return this.http.post(this.urlApi + "/login", cuerpo);
  }

  getEventos(pagina: any){
    const headers = new HttpHeaders().set("X-pagina", String(pagina))
    return this.http.get(this.urlApi + "/eventos", {"headers": headers});
  }

  getEventosTags(tags: any, pagina:any){
    const headers = new HttpHeaders().set("X-pagina", String(pagina))
    return this.http.get(this.urlApi + "/eventosTags/busquedaTags/"+tags, {"headers": headers})
  }

  getTags(){
    return this.http.get(this.urlApi + "/eventosTags")
  }

  getEvento(_id: string){
    return this.http.get(this.urlApi + "/eventos/" + _id);
  }

  postEvento(cuerpo: any, clave: string){
    const headers = new HttpHeaders().set("Authorization", clave)
    return this.http.post(this.urlApi + "/eventos", {"headers": headers}, cuerpo);
  }

  deleteEvento(nombre: string, clave: string){
    const headers = new HttpHeaders().set("Authorization", clave)
    return this.http.delete(this.urlApi + "/eventos/" + nombre, {"headers": headers})
  }

  putEvento(cuerpo: any, nombre: string, clave: string){
    const headers = new HttpHeaders().set("Authorization", clave);
    return this.http.put(this.urlApi + "/eventos/" + nombre, {"headers": headers}, cuerpo)
  }

  patchEvento(cuerpo: any, nombre: string, clave: string){
    const headers = new HttpHeaders().set("Authorization", clave);
    return this.http.patch(this.urlApi + "/eventos/" + nombre, {"headers": headers}, cuerpo)
  }

  getLugarEventoId(idLugar: string){
    return this.http.get(this.urlApi + "/lugares/" + idLugar)
  }

  getLugarEventoNombre(nombreLugar: string){
    return this.http.get(this.urlApi + "/lugaresXnombre/" + nombreLugar)
  }

  subirAporte(cuerpo: any, clave: string){
    const headers = new HttpHeaders().set("Authorization", clave);
    return this.http.post(this.urlApi + "/eventos/contribucion",cuerpo,{"headers": {"Authorization":clave}})
  }

  getUserData(clave: string, nombreUsuario: string){
    return this.http.get(this.urlApi + "/investigadoresInv/"+nombreUsuario,{"headers":{"Authorization":clave}})
  }

  editarUsuario(cuerpo:any, clave:string){
    const headers = new HttpHeaders().set("Authorization", clave);
    console.log("el body")
    console.log(cuerpo)
    return this.http.patch(this.urlApi + "/investigadoresEdit", cuerpo, {"headers":{"Authorization":clave}})
  }

  getContribucionesUsuario(clave: string){
    return this.http.get(this.urlApi+"/eventosAportesUsuario", {"headers":{"Authorization": clave}})
  }
}