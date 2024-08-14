import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { HttpService } from '../http-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  error: string

  constructor(private http: HttpService, private router: Router){
    this.error = ""
  }

  public login(nombre: string, contraseña: string){
    var cuerpo = {
      nombre : nombre,
      contraseña : contraseña
    }
    return this.http.login(cuerpo).subscribe({
      next: (data) => {
        console.log(data)
        localStorage.setItem("clave", JSON.parse(JSON.stringify(data)).claveJWT)
        localStorage.setItem("esSuper", JSON.parse(JSON.stringify(data)).esSuper)
        localStorage.setItem("nombreUsuario", JSON.parse(JSON.stringify(data)).nombre)
        this.router.navigate([""])
      },
      error: (error) => {
        console.log(error)
        this.error = error.error
      }
    });
  }

}
