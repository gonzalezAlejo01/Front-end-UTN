import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logeado: boolean;
  tagsPuestos: any
  nombreUsuario: string
  fotoPerfil: any = ""
  url = "http://localhost:3000/imagenes"

  constructor(private router: Router, private http: HttpService){
    this.logeado = false
    this.nombreUsuario = ""
  }

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem("nombreUsuario")!
    this.tagsPuestos = localStorage.getItem("tags")
    this.http.getUserData(localStorage.getItem("clave")!, localStorage.getItem("nombreUsuario")!).subscribe({
      next: (data: any) => {
        this.fotoPerfil = data.fotoPerfil;
        if(this.fotoPerfil == ""){
          console.log("no tiene foto")
          this.fotoPerfil="../../assets/fotoDefault.webp"
        }
        else{
          this.fotoPerfil = this.url+"/"+this.fotoPerfil
        }
      }
    })
    if (localStorage.getItem("clave") === null) {
      this.logeado = false
    }
    else {
      this.logeado = true
    }
  }

  public logOut() {
    localStorage.removeItem("clave")
    this.logeado = false;
  }

  public buscarPorTags(tags: string){
    this.tagsPuestos = tags
    localStorage.setItem("tags", tags)
    this.router.navigate([""])
    this.actualizar.emit()
  }

  @Output() actualizar = new EventEmitter()
}
