import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Departamento } from '../models/Departamento';


@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {


  URL_API = "http://localhost:4000";

  departamentos: Departamento[] | undefined;

  departamentoSeleccionado: Departamento = {
    _id: '',
    nombre: '',
    descripcion: '',
    usuarios: 0,
    tickets: 0,

  };


  constructor(public http: HttpClient) {
  }


  //CRUD
  async getDepartamentos(page = 1, limit = 10, search = "") {
    let data = await this.http.post(this.URL_API + "/paginadoDepartamentos", { page, limit, search });
    return data;
  }


  async listaDepartamentos() {
    let data = await this.http.get(this.URL_API + "/listaDepartamentos");
    return data;
  }


  async createDepartamento(depto: Departamento) {
    let reg = await this.http.post(this.URL_API + "/createDepartamento", depto);
    return reg
  }

  async deleteDepartamento(_id = "") {
    let reg = await this.http.post(this.URL_API + "/deleteDepartamento", { id: _id });
    return reg

  }

  async updateDepartamento(depto: Departamento) {
    console.log(depto);
    let reg = await this.http.put(this.URL_API + "/updateDepartamento", depto);
    return reg
  }


  async getDepartamentoById(id: string = "") {
    let data = await this.http.post(this.URL_API + "/getDepartamentoById", { id });
    return data;
  }

}
