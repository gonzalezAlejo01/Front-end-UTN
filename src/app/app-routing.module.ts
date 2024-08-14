import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [{
  path: "",
  component: HomeComponent,
  title: "Inicio"
},{
  path: "registro",
  component: RegisterComponent,
  title: "Registro"
},{
  path: "login",
  component: LoginComponent,
  title: "Inicio de seión"
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
