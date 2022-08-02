import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/Usuario';


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  URL_API = "http://localhost:4000";

  usuarios: Usuario[] | undefined;

  usuarioSeleccionado: Usuario = {
    nombre: '',
    apellido: '',
    email: '',
    _id: '',
    departamento_id: '',
    password: '',
  };


  constructor(public http: HttpClient) {
  }


  //CRUD
  // getUsuarios(page = 1, limit = 10) {

  //   let data = this.http.get(this.URL_API + "/listaUsuarios");
  //   console.log(data);
  //   console.log("------------- ");

  //   return data;

  // }


  async getUsuarios(page = 1, limit = 10, search = "") {
    let data = await this.http.post(this.URL_API + "/paginadoUsuarios", { page, limit, search });
    return data;
  }

  async createUsuario(user: Usuario) {
    let reg = await this.http.post(this.URL_API + "/register", user);
    return reg
  }

  async deleteUsuario(_id = "") {
    let reg = await this.http.post(this.URL_API + "/deleteUsuario", { id: _id });
    return reg
  }

  async updateUsuario(user: Usuario) {
    let reg = await this.http.put(this.URL_API + "/updateUsuario", user);
    return reg
  }

  async getUsuarioById(id = "") {
    let data = await this.http.post(this.URL_API + "/getUsuarioById", { id });
    return data;
  }
}
