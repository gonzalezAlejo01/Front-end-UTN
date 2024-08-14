import { Component, ElementRef, ViewChild, Renderer2 , HostListener} from '@angular/core'
import { HttpService } from '../http-service.service';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  tags: any
  url: any
  logeado: boolean
  error: string
  eventos: any
  hayMas: boolean
  pagina: number = 0
  cantPagina: number = 8
  public constructor(private renderer: Renderer2, private http: HttpService) {
    this.logeado = false
    this.error = ""
    this.eventos = []
    this.hayMas = true
  }

  ngOnInit() {
    this.setLogeado()
    this.getTags()
    this.getEventos()
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

  async getTags() {
    return this.http.getTags().subscribe({
      next: (data) => {
        this.tags = data
      },
      error: (error) => {
        this.error = error.error
      }
    })
  }

  async getEventos() {
    if (localStorage.getItem("tags") === null || localStorage.getItem("tags") == "") {
      await this.http.getEventos(this.pagina).subscribe({
        next: (data: any) => {
          this.hayMas = data.hayMas
          this.setLugaresEventos(data.eventos)
        },
        error: (error) => {
          this.error = error.error
        }
      })
    }
    else {
      await this.http.getEventosTags(localStorage.getItem("tags"), this.pagina).subscribe({
        next: (data: any) => { 
          if(data === null){
          }
          else{
            console.log("la data que llega")
            console.log(data)
            this.hayMas = data.hayMas
            this.setLugaresEventos(data.eventos)
          }
          return 0
        },
        error: (error) => {
          this.error = error.error
        }
      })
    }
  }

  setLugaresEventos(eventos: any){
    for (let i = 0; i < eventos.length; i++) {
      this.http.getLugarEventoNombre(eventos[i].lugar).subscribe({
        next: (data: any) => {
          this.url = data.urlImagenes
          let lugar = data.lugar.direccion
          eventos[i].nombreLugar = lugar
          let foto = data.lugar.fotoLugar
          eventos[i].fotoLugar = this.url+foto
        },
        error: (error) => {
          error = error.error
        }
      })
    }
    this.eventos = this.eventos.concat(eventos)
  }




  public sumarTag(tag: string) {
    this.pagina = 0;
    let tagsAct = localStorage.getItem("tags")
    if (tagsAct?.charAt(tagsAct.length) == "," || tagsAct == "") {
      localStorage.setItem("tags", (tagsAct + tag))
    }
    else {
      localStorage.setItem("tags", (tagsAct + "," + tag))
    }
    this.update()
  }

  public logOut() {
    localStorage.removeItem("clave")
    this.logeado = false;
  }

  update(){
    this.eventos = []
    this.ngOnInit()
  }

  cargarMas(){
    this.pagina++
    this.getEventos()
  }

  onMouseWheel(event: WheelEvent): void {
    const delta = event.deltaY;
    const element = event.currentTarget as HTMLElement;
    element.scrollLeft += delta;
    event.preventDefault();
  }
}
