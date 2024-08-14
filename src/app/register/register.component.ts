import { Component } from '@angular/core';
import { HttpService } from '../http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  error: string

  constructor(private http: HttpService, private router: Router){
    this.error = ""
  }


  public register(mail: string, pw1: string, pw2: string, nombre: string){
    if(pw1!=pw2){
      this.error = "Las contraseñas no coinciden"
      return 0
    }
    else{
      const cuerpo = {
        nombre: nombre,
        correo: mail,
        contraseña: pw1
      }
      console.log(cuerpo)
      return this.http.registrarse(cuerpo).subscribe({
        next: (data)=>{
          console.log(data)
          this.router.navigate(["login"])
        },
        error: (error) =>{
          console.log(error)
          this.error = "Error: " + error.error
        }
      })
    }
  }
}
