import { Component } from '@angular/core';
import { HttpService } from '../http-service.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error: String
  temp: number

  constructor(private http: HttpService, private router: Router){
    this.error=""
    this.temp = 0
  }

  ngOnInit(){
    console.log(innerWidth)
    this.temp = innerHeight
  }

  public login(nombre: String, pw: String){
    if(nombre == "" || pw == ""){
      this.error = "Faltan datos"
      return 0
    }
    var cuerpo = {
      nombre: nombre,
      contraseña: pw
    }
    return this.http.login(cuerpo).subscribe({
      next: (data) =>{
        console.log(data)
        localStorage.setItem("clave", JSON.parse(JSON.stringify(data)).claveJWT)
        let token = jwtDecode(localStorage.getItem("clave")!) as {nombre : string}
        let nombreUsuario = token['nombre']
        localStorage.setItem("nombreUsuario", nombreUsuario)
        //localStorage.setItem("logeadoStr", "t")
        this.router.navigate([""])
      },
      error: (error)=>{
        console.log(error)
        this.error = "Error: " + error.error
      }
    })
  }
}
