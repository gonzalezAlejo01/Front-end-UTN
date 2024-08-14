import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http-service.service';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid'; 
@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent {
  nombre: string;
  nombreLugar: string;
  direccion: string;
  tags: Array<string>;
  fotoLugar: string;
  fecha: string;
  fechaConvocatoria: string;
  descripcion: string;
  logeado: boolean;
  click: boolean;
  menuAporte: boolean
  error: string
  success: boolean
  archivoAporte!: File

  constructor(private route: ActivatedRoute, private http: HttpService, private router: Router) {
    this.nombre = "";
    this.nombreLugar = "";
    this.direccion = "";
    this.tags = [];
    this.fotoLugar = "";
    this.fecha = "";
    this.fechaConvocatoria = "";
    this.descripcion = '';
    this.logeado = false;
    this.click = false;
    this.menuAporte = false;
    this.error=""
    this.success = false;
  }
  ngOnInit() {
    this.setLogeado()
    this.route.paramMap.subscribe(params => {
      const id: string = params.get('nombre')!;
      this.getEvento(id);
    });
  }

  onFileSelected(event:any){
    this.archivoAporte = event.target.files[0]
  }

  getEvento(id: string){
    this.http.getEvento(id).subscribe({
      next: (data) => {
        const evento = JSON.parse(JSON.stringify(data));
        this.nombre = evento.nombre;
        this.tags = evento.tags;
        this.fecha = evento.fecha;
        this.fechaConvocatoria = evento.fechaCierreConvocatoria;
        this.descripcion = evento.descripcion;

        this.http.getLugarEventoNombre(evento.lugarDesarrollo).subscribe({
          next: (dataLugar) => {
            let lugar = JSON.parse(JSON.stringify(dataLugar));
            const rutaImagenes = lugar.urlImagenes;
            lugar = lugar.lugar;

            this.direccion = lugar.direccion;
            this.nombreLugar = lugar.nombre;
            console.log(rutaImagenes);
            console.log(lugar.fotoLugar)
            this.fotoLugar = rutaImagenes + lugar.fotoLugar;
          },
          error: (error) => {
            console.log(error);
          }
        })
      },
      error: (error) => {
        alert("No se puedo recibir el evento");
        console.log(error)
      }
    })
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    let miDiv: any = document.getElementById('tags');
    if (miDiv) {
      miDiv.addEventListener('wheel', this.handleMouseWheel);
    }
  }
 
  @HostListener('mouseleave')
  onMouseLeave() {
    let miDiv: any = document.getElementById('tags');
    if (miDiv) {
      miDiv.removeEventListener('wheel', this.handleMouseWheel);
    }
  }

  private handleMouseWheel(event: WheelEvent) {
    let miDiv: any = document.getElementById('tags');
    if (miDiv) {
      event.preventDefault();
      const delta = Math.sign(event.deltaY);
      miDiv.scrollLeft += delta * 150; // Ajusta la velocidad de desplazamiento
    }
  }

  setLogeado() {
    if (localStorage.getItem("clave") === null) {
      this.logeado = false
    }
    else {
      this.logeado = true
      var clave = localStorage.getItem("clave")
    }
  }
  manejarMenuAporte(estado:boolean){
    if(!(localStorage.getItem("clave") === null) || localStorage.getItem("clave")!=""){
      this.success = false;
      this.menuAporte = estado
    }
    else{
      this.click = estado;
    }
  }
  enviarAporte(aporte:any, tituloAporte:any, descAporte: any){
    console.log(this.archivoAporte)
    let token = jwtDecode(localStorage.getItem("clave")!) as {nombre : string}
    let nombreUsuario = token['nombre']
    //, archivo (nombre: uuid), clave jwt (header),
    if(this.archivoAporte === null || this.archivoAporte === undefined){
      this.error = "Es necesario ingresar un archivo"
      return 0
    }
    else{
      this.error=""
      var cuerpo = new FormData()
      var url = String(window.location).split('/')
      cuerpo.append("titulo", tituloAporte)
      cuerpo.append("descripcion", descAporte)
      cuerpo.append("idEvento", url[url.length-1])
      const blob = new Blob([this.archivoAporte], { type: "application/pdf" });
      cuerpo.append('contribucion',blob, this.archivoAporte.name);
      return this.http.subirAporte(cuerpo, localStorage.getItem("clave")!).subscribe({
        next: (data: any) =>{
          this.success = true
        },
        error: (error) =>{
          this.error = error.error
        }
      })
    }
  }
  buscarConTag(tag:string){
    localStorage.setItem("tags", tag)
    this.router.navigate([""])
  }
}
