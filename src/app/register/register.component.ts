import { Component } from '@angular/core';
import { HttpService } from '../http-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  coincidencia: string;
  error: string;
  
  constructor(private http: HttpService, private router: Router){
    this.coincidencia = "";
    this.error = ""
  }
  
  public registrarse(nombre: string, correo: string, contraseña: string, contraseña2: string){

    if(contraseña != contraseña2){
      this.coincidencia = "Las conraseñas no coinciden"
      return 0;
    }
    else{
      console.log("a")
      this.coincidencia = "";
      const cuerpo = {
        nombre : nombre,
        correo  : correo,
        contraseña : contraseña
      }
      console.log("b")
      return this.http.registrarse(cuerpo).subscribe({
        next: (data) => {
          console.log(data)
          this.router.navigate(["login"]);
        },
        error: (error) => {
          console.log(error)
          this.error = error.error;
        }
      });
    }
  }
}
