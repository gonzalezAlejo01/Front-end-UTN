import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EventoComponent } from './evento/evento.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  {
    path: "",
    component: MenuComponent,
    title: "menu"
  },
  {
    path: "register",
    component: RegisterComponent,
    title: "Registro"
  },{
    path: "login",
    component: LoginComponent,
    title: "Inicio Sesion"
  },{
    path: "evento/:nombre",
    component: EventoComponent
  },
  {
    path: "usuario",
    component:UsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
