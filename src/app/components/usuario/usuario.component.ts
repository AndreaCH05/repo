
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Departamento } from 'src/app/models/Departamento';

import { UsuarioService } from '../../services/usuario.service';
import { DepartamentoService } from '../../services/departamento.service';


import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { NgxToastService } from 'ngx-toast-notifier';




@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],


})
export class UsuarioComponent implements OnInit {

  //Create FormGroup
  submitted = false;
  angForm!: FormGroup;

  data: any = {};

  user = {
    _id: '',
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    departamento_id: '',
  }


  alert: boolean = false;
  alertError: boolean = false;
  alertClase: string = 'alert alert-dismissible alert-error';
  alertTitulo: string = 'Titulo';
  alertDescripcion: string = 'alertDescripcion';




  departamentos: Departamento[] = [];
  pageSize: number = 5;

  hasta: number = 5;
  desde: number = 0;

  page: number = 1;
  dataLength: number = 1;
  pageCount: number = 1;
  itemCount: number = 1;
  filtroBuscar: string = "";




  constructor(
    public usuarioService: UsuarioService,
    public departamentoService: DepartamentoService,
    public dialog: MatDialog,
    public notiService: NgxToastService,
    public fb: FormBuilder

  ) { }

  ngOnInit(): void {
    this.createForm();

    this.listaDepartamentos();
    this.getUsuarios();
  }



 

  async onReset() {
    console.log('onReset')
    this.angForm.reset();
    this.submitted = false;
    this.alert = false;
    this.usuarioService.usuarioSeleccionado = {
      _id: '',
      nombre: '',
      apellido: '',
      email: '',
      departamento_id: '',
      password: '',
    }
  }



  onSubmit(): void {
    console.log('onSubmit')

    this.submitted = true;
    if (this.angForm.invalid) {
      this.angForm.valueChanges
      return;
    }
    else {
      this.addUsuario();
      console.log(JSON.stringify(this.angForm.value, null, 2));
    }

  }

  createForm() {
    this.angForm = this.fb.group({
      _id: ['',],
      nombre: ['', [Validators.required,]],
      apellido: ['', [Validators.required,]],
      password: ['', [Validators.required,]],
      departamento_id: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.email]],
    },
    );
  }

  cerrarAlerta() {
    console.log("cerrarAlerta")
    this.alert = false;
  }


  async getUsuarios() {

    await (await this.usuarioService.getUsuarios((this.page < 1) ? 1 : this.page, this.pageSize, this.filtroBuscar)).subscribe(
      (data: any) => {
        this.usuarioService.usuarios = (data.success) ? data.data.itemsList : [];
        var paginator = (data.success) ? data.data.paginator : {
          currentPage: 0,
          hasNextPage: false,
          hasPrevPage: false,
          itemCount: 0,
          next: null,
          pageCount: 1,
          perPage: 5,
          prev: null,
          slNo: 1,
        };

        this.page = (paginator.currentPage);
        this.pageSize = paginator.perPage;
        this.pageCount = paginator.pageCount;
        this.itemCount = paginator.itemCount;

      },
      error => { console.log(error) }
    )
  }


  async addUsuario() {
    var form = this.angForm;
    if (form.value.email !== undefined || form.value.email !== "" || form.value.email !== null) {
      if (form.value._id === undefined || form.value._id === "" || form.value._id === null) {
        await (await this.usuarioService.createUsuario(form.value)).subscribe(
          (data: any) => {

            console.log(data);

            if (data.success) {
              this.usuarioService.usuarios = [];

              this.notiService.onSuccess('Usuario registrado', '¡Registro de usuario ' + form.value.email + ' exitosamente!.');

              this.onReset();
              this.listaDepartamentos();
              this.getUsuarios();

              this.alertTitulo = "";
              this.alertDescripcion = "";
              this.alertError = false;
              this.alert = false;
            }
            else {

              this.alertTitulo = "Error al registrar usuario";
              this.alertDescripcion = (data?.message) ? data.message : "Verifique su información";
              this.alertError = true;
              this.alert = true;
            }

          },
          error => {

            console.log(error)
            this.alertTitulo = "Error al registrar usuario";
            this.alertDescripcion = error.error;
            this.alertError = true;
            this.alert = true;

          }
        )

      }
      else {

        await (await this.usuarioService.updateUsuario(form.value)).subscribe(
          (data: any) => {

            if (data.success) {
              this.notiService.onSuccess('Usuario actualizado', '¡Actualización de usuario '+ form.value.email +' exitosa!.');

              this.usuarioService.usuarios = [];
              this.onReset();
              this.listaDepartamentos();
              this.getUsuarios();

              this.alertTitulo = "";
              this.alertDescripcion = "";
              this.alertError = false;
              this.alert = false;
            }
            else {

              this.alertTitulo = "Error al actualizar usuario";
              this.alertDescripcion = (data?.message) ? data.message : "Verifique su información.";
              this.alertError = true;
              this.alert = true;
            }

            console.log(data)

          },
          error => {
            console.log(error)
            this.alertTitulo = "Error al actualizar usuario";
            this.alertDescripcion = (error?.error) ? error.error : "Verifique su información.";
            this.alertError = true;
            this.alert = true;
          }
        )
      }
    }
  }



  async deleteUsuario(id: string = "", email: string ="") {
    await (await this.usuarioService.deleteUsuario(id)).subscribe(
      (data: any) => {
        console.log(data);
        if (data.success) {
          this.notiService.onSuccess('Usuario eliminado', '¡Se eliminó registro de usuario '+ email +' exitosamente!.');

          this.usuarioService.usuarios = [];
          this.page = 1;
          
          this.alertTitulo = "";
          this.alertDescripcion = "";
          this.alertError = false;
          this.alert = false;

          this.onReset();
          this.listaDepartamentos();
          this.getUsuarios();
        }
        else {
          this.alertTitulo = "Error al eliminar usuario";
          this.alertDescripcion = (data?.message) ? data.message : "Verifique su información.";
          this.alertError = true;
          this.alert = true;
        }
        
        


      },
      error => { console.log(error) }
    )

  }

  async editUsuario(user: any) {
    this.onReset();
    console.log(user);
    this.getUsuarioById(user._id);
  }
 

  async getUsuarioById (id: string) {
    await (await this.usuarioService.getUsuarioById(id)).subscribe(
      (data: any) => {
        if(data.success){
          this.usuarioService.usuarioSeleccionado = data.data
        }
      },
      error => { console.log(error) }
    )

  }

 

  async listaDepartamentos() {
    await (await this.departamentoService.listaDepartamentos()).subscribe(
      (data: any) => {
        this.departamentos = (data.success) ? data.data.itemsList : [];
      },
      error => { console.log(error) }
    )
  }

  async cambiarPagina(e: PageEvent) {

    let pzLocal = this.pageSize;
    this.pageSize = e.pageSize;
    let desde = (e.pageIndex * e.pageSize);
    let hasta = desde + e.pageSize;
    this.desde = desde;
    this.hasta = hasta;
    let pag = hasta / e.pageSize;
    if (pzLocal !== this.pageSize) {
      pag = 1;
    }

    this.page = pag;
    this.getUsuarios();
  }

 

  async applyFilter(e: any) {
    console.log(e.type)
    if (e?.type === "keyup") {
      var buscar = e.target.value;
      this.filtroBuscar = buscar;
      this.getUsuarios();
    }
  }

  confirmarEliminarUsuario(id: any, email: any) {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: { title: 'Eliminar registro', content: '¿Deseas eliminar el usuario ' + email + ' ?' },
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      position: { top: '18%' }
    });

    dialogRef.afterClosed().subscribe(
      res => {
        if (res && id !== null && id !== "") { this.deleteUsuario(id, email) }
      },
      error => { console.log(error) }
    )
  }
}
