import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../http-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  
  @ViewChild('lostags') myInput: ElementRef | undefined;

  urlApiImagenes = 'http://localhost:3000/imagenes/';
  urlApiArchivos = 'http://localhost:3000/archivos/';
  logeado: boolean;
  usuarios: boolean;
  evento: any;
  mensajeModificarEstado: string = "";
  listaTags: Array<string> = [];
  values: string[] = [''];
  mensajeIngresoAdmin: string;
  listaEventos: any;
  eventos: boolean;
  admins: boolean;
  mensajeBorrarEvento: string;
  lugarSeleccionado: string = '';
  mensajeVerLugar: string;
  lugares: boolean;
  mensajeIngresoEvento: string = ""
  lugar: any;
  listaDeEventos: any;
  listaDelugares: Array<string> = [];
  botonAdmins: boolean
  getListaLugar: boolean;
  mensajeIngresoUsuario: string;
  mensajeBorrarUsuario: string;
  getInvestigadores: boolean;
  getAdministradores: boolean;
  getListaLugares: boolean;
  listaInvestigadores: any;
  listaAdministradores: any;
  listaLugares: any;
  esSuper: boolean;
  mensajeIngresoLugares: string;
  mensajeGetLugares: boolean;
  getListaEvento: boolean = false;
  mensajeModificarUsuario: string;
  selectedPhoto!: File;
  selectedPhotoLugar!: File;
  mensajeIngresoEventos: string;
  mensajeBorrarLugar: string;
  verAgregarTag: boolean;

  constructor(private http: HttpService) {
    this.logeado = false
    this.usuarios = false
    this.lugarSeleccionado = '';
    this.getListaLugar = false
    this.mensajeBorrarEvento = ""
    this.mensajeIngresoAdmin = "",
    this.eventos = false
    this.admins = false
    this.verAgregarTag = false
    this.botonAdmins = false
    this.mensajeIngresoUsuario = "";
    this.mensajeBorrarUsuario = ""
    this.getInvestigadores = false
    this.esSuper = false
    this.getAdministradores = false
    this.lugares = false
    this.mensajeModificarUsuario = "";
    this.mensajeIngresoLugares = ""
    this.mensajeBorrarLugar = ""
    this.getListaLugares = false
    this.mensajeGetLugares = false
    this.mensajeVerLugar = ""
    this.mensajeIngresoEventos = ""

  }
  
  estadoSeleccionado: string = '';
  opciones: string[] = ['APROBADO', 'APROBADO_ASISTENCIA', 'RECHAZADO'];
  onFileSelected(event: any) {
    this.selectedPhoto = event.target.files[0];
  }
  onFileSelectedLugar(event: any) {
    this.selectedPhotoLugar = event.target.files[0];
  }
  ngOnInit() {
    if (localStorage.getItem("clave") != null) {
      console.log('Ya esta logeado');
      this.logeado = true;
      console.log(this.logeado)
      console.log(localStorage.getItem("esSuper"))
    }
    if (localStorage.getItem("esSuper") == "true") {
      this.botonAdmins = true
    }

    this.http.getLugares().subscribe({
      next: (data) => {
        for(let i = 0; i < JSON.parse(JSON.stringify(data)).lugares.length; i++){
          this.listaDelugares.push(JSON.parse(JSON.stringify(data)).lugares[i].nombre)
          if(this.listaDelugares.length > 0) this.lugarSeleccionado = this.listaDelugares[0];
        }
        console.log(this.listaDelugares)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  cerrarSesion() {
    localStorage.clear();
    window.location.reload()
  }
  aver(foto: any) {
    console.log(foto)
  }

  verUsuarios() {
    this.usuarios = true;
    this.eventos = false;
    this.admins = false;
    this.lugares = false;
  }

  verEventos() {
    this.eventos = true;
    this.usuarios = false;
    this.admins = false;
    this.lugares = false;
  }

  verAdmins() {
    this.admins = true;
    this.usuarios = false;
    this.eventos = false;
    this.lugares = false;
  }
  verLugares() {
    this.lugares = true;
    this.usuarios = false;
    this.eventos = false;
    this.admins = false;
  }


  ingresarInvestigador(nombre: string, correo: string, contraseña: string) {
    //@ts-ignore
    var cuerpo = new FormData();
    cuerpo.append("nombre", nombre)
    cuerpo.append("correo", correo)
    cuerpo.append("contrasenia", contraseña)
    if (this.selectedPhoto) {
      const extension = this.selectedPhoto.name.split('.').pop();
      const type = 'image/${extension}';
      const blob = new Blob([this.selectedPhoto], { type });
      cuerpo.append('fotoPerfil',blob, this.selectedPhoto.name);
    }

      return this.http.ingresarUsuario(cuerpo).subscribe({
        next: (data) => {
          console.log(data)
          this.mensajeIngresoUsuario = "Usuario ingresado correctamente"
        },
        error: (error) => {
          console.log(error)
          this.mensajeIngresoUsuario = error.error
          if (error.status == 413) {
            console.log("muy pesao")
          }
        }
      });
    }
    agregarTag(tag: string) {
      this.listaTags.push(tag);
    }
    vaciarTags() {
      this.listaTags = [];
    }
    verAgregarTags() {
      this.verAgregarTag = !this.verAgregarTag
    }
  borrarLugar(nombre: string) {
    console.log(nombre)
    return this.http.borrarLugar(nombre).subscribe({
      next: (data) => {
        console.log(data)
        this.mensajeBorrarLugar = "Lugar borrado correctamente"
      },
      error: (error) => {
        console.log(error)
        this.mensajeBorrarLugar = error.error
      }
    });
  }
  
  borrarInvestigador(nombre: string) {
    return this.http.borrarUsuario(nombre).subscribe({
      next: (data) => {
        console.log(data)
        this.mensajeBorrarUsuario = "Usuario borrado correctamente"
      },
      error: (error) => {
        console.log(error)
        this.mensajeBorrarUsuario = error.error
      }
    });

  }
  verInvestigadores() {

    if (this.getInvestigadores) {
      this.getInvestigadores = false;
    }
    else {
      this.getInvestigadores = true;

      return this.http.verUsuarios().subscribe({
        next: (data) => {
          console.log(data)
          this.listaInvestigadores = data
        },
        error: (error) => {
          console.log(error)
        }
      })
    }

    return 0

  }
  ingresarInvestigadores(nombre: string, contraseña: string) {

    var body = {
      nombre: nombre,
      contraseña: contraseña,
      esSuper: this.esSuper
    }

    return this.http.ingresarAdministrador(body).subscribe({
      next: (data) => {
        console.log(data)
        this.mensajeIngresoAdmin = "Administrador ingresado correctamente"
      },
      error: (error) => {
        console.log(error)
        this.mensajeIngresoAdmin = error.error
      }
    })
  }
  ingresarEvento(nombre: string, fecha: string, fechaCierre: string, descripcion: string) {
    var body = {
      tags: this.listaTags,
      nombre: nombre,
      fechaCierreConvocatoria: fechaCierre,
      fecha: fecha,
      lugarDesarrollo: this.lugarSeleccionado,
      descripcion: descripcion
    }
    return this.http.postEvento(body).subscribe({
      next: (data) => {
        console.log(data)
        this.mensajeIngresoEventos = "Evento ingresado correctamente"
      },
      error: (error) => {
        console.log(error)
        this.mensajeIngresoEventos = error.error
      }
    })
  }
  getEvento(id: any) {
    return this.http.getEvento(id).subscribe({
      next: (data) => {
        console.log(data)
        this.getListaEvento = true
        this.evento = data
        this.http.getLugarXNombre(this.evento.lugarDesarrollo).subscribe({
          next: (data) => {
            console.log(data)
            this.evento.fotoLugar = JSON.parse(JSON.stringify(data)).lugar.fotoLugar
            this.evento.direccion = JSON.parse(JSON.stringify(data)).lugar.direccion
          },
          error: (error) => {
            console.log(error)
          }
        })
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  modificarInvestigador(nombre: string, correo: string, contraseña: string) {
      
      var body = {
        correo: correo,
        contraseña: contraseña
      }
  
      return this.http.modificarUsuario(nombre, body).subscribe({
        next: (data) => {
          console.log(data)
          this.mensajeModificarUsuario = "Investigador modificado correctamente"
        },
        error: (error) => {
          console.log(error)
          this.mensajeModificarUsuario = error.error
        }
      })
  }
  seleccionarOpcion(event: any) {
    const indiceSeleccionado = event.target.value;
    console.log("Opción seleccionada:", this.listaDelugares[indiceSeleccionado]);
    this.lugarSeleccionado = this.listaDelugares[indiceSeleccionado];
  }
  seleccionarEstado(event: any) {
    const indiceSeleccionado = event.target.value;
    console.log("Opción seleccionada:", this.opciones[indiceSeleccionado]);
    this.estadoSeleccionado = this.opciones[indiceSeleccionado];
  }
  cambiarEstado(id: any, nombre: any) {
    var body = {
      estado: this.estadoSeleccionado,
      nombre: nombre
    }
    return this.http.actualizarEstado(id, body).subscribe({
      next: (data) => {
        console.log(data)
        this.mensajeModificarEstado = "Estado modificado correctamente"
      },
      error: (error) => {
        console.log(error)
        this.mensajeModificarEstado = error.error
      }
    })

  }
  ingresarLugar(nombre: any, direccion: any){

    var cuerpo = new FormData();
    cuerpo.append("nombre", nombre)
    cuerpo.append("direccion", direccion)
    if (this.selectedPhotoLugar) {
      const extension = this.selectedPhotoLugar.name.split('.').pop();
      const type = 'image/${extension}';
      const blob = new Blob([this.selectedPhotoLugar], { type });
      cuerpo.append('fotoLugar',blob, this.selectedPhotoLugar.name);
    }

    return this.http.ingresarLugar(cuerpo).subscribe({
      next: (data) => {
        console.log(data)
        this.mensajeIngresoLugares = "Lugar ingresado correctamente"
      },
      error: (error) => {
        console.log(error)
        this.mensajeIngresoLugares = error.error
      }
    })

  }
  borrarEvento(id: any) {
    return this.http.borrarEvento(id).subscribe({
      next: (data) => {
        console.log(data)
        this.mensajeBorrarEvento = "Evento borrado correctamente"
      },
      error: (error) => {
        console.log(error)
        this.mensajeBorrarEvento = error.error.text
      }
    })
  }
  getEventos() {
    this.listaEventos = !this.listaEventos
    return this.http.getEventos().subscribe({
      next: (data) => {
        console.log(data)
        this.listaDeEventos = JSON.parse(JSON.stringify(data)).eventos
        console.log(this.listaDeEventos)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  audisio() {
    this.esSuper = !this.esSuper
    console.log(this.esSuper)
    var boton = document.getElementById("botonSuper")
    if (this.esSuper) {
      boton?.setAttribute("class", "btn btn-success")
    }
    else {
      boton?.setAttribute("class", "btn btn-danger")
    }

  }
  borrarAdministrador(nombre: string) {
    return this.http.borrarAdministrador(nombre).subscribe({
      next: (data) => {
        console.log(data)
        this.mensajeBorrarUsuario = "Administrador borrado correctamente"
      },
      error: (error) => {
        console.log(error)
        this.mensajeBorrarUsuario = error.error
      }
    })
  }
  verAdministradores() {
    if (this.getAdministradores) {
      this.getAdministradores = false;
    }
    else {
      this.getAdministradores = true;

      return this.http.getAdministradores().subscribe({
        next: (data) => {
          console.log(data)
          this.listaAdministradores = data
        },
        error: (error) => {
          console.log(error)
        }
      })
    }

    return 0
  }
  getLugares(){
    if (this.getListaLugares) {
      this.getListaLugares = false;
    }
    else {
      this.getListaLugares = true;
    }
    return this.http.getLugares().subscribe({
      next: (data) => {
        if(JSON.parse(JSON.stringify(data)).lugares == null){
          this.mensajeGetLugares = true
        }
        console.log(data)
        this.listaLugares = data
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  getLugar(id: any){
    if(this.getListaLugar){
      this.getListaLugar = false
    }
    else{
      this.getListaLugar = true
    }
    return this.http.getLugar(id).subscribe({
      next: (data) => {
        this.lugar = data 
        console.log(data)
      },
      error: (error) => {
        console.log(error)
        this.mensajeVerLugar = error.error
      }
    })
  }
}
