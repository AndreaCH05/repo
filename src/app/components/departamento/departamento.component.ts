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
import { DepartamentoService } from '../../services/departamento.service';

import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { NgxToastService } from 'ngx-toast-notifier';


@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {
 
  //Create FormGroup
  submitted = false;
  angForm!: FormGroup;

  data: any = {};

  depto = {
    _id: '',
    nombre: '',
    descripcion: '',
  }


//Alert
  alert: boolean = false;
  alertError: boolean = false;
  alertClase: string = 'alert alert-dismissible alert-error';
  alertTitulo: string = 'Titulo';
  alertDescripcion: string = 'alertDescripcion';


  //Data tabla
  departamentos: Departamento[] = [];

  //Paginado
  pageSize: number = 5;
  hasta: number = 5;
  desde: number = 0;
  page: number = 1;
  dataLength: number = 1;
  pageCount: number = 1;
  itemCount: number = 1;
  filtroBuscar: string = "";


 

  constructor(
    public departamentoService: DepartamentoService,
    public dialog: MatDialog,
    public notiService: NgxToastService,
    public fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.createForm();

    this.getDepartamentos();
  }


  async onReset() {
    console.log('onReset')
    this.angForm.reset();
    this.submitted = false;
    this.alert = false;
    this.departamentoService.departamentoSeleccionado = {
      _id: '',
      nombre: '',
      descripcion: '',
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
       this.addDepartamento();
    }

  }

  createForm() {
    this.angForm = this.fb.group({
      _id: ['',],
      nombre: ['', [Validators.required,]],
      descripcion: ['', [Validators.required,]],
    },
    );
  }

  cerrarAlerta() {
    console.log("cerrarAlerta")
    this.alert = false;
  }


  async getDepartamentos() {

    await (await this.departamentoService.getDepartamentos((this.page < 1) ? 1 : this.page, this.pageSize, this.filtroBuscar)).subscribe(
      (data: any) => {
        this.departamentoService.departamentos = (data.success) ? data.data.itemsList : [];
        
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



 
  

    async addDepartamento() {
      var form = this.angForm;
      
        if (form.value._id === undefined || form.value._id === "" || form.value._id === null) {
          
          await (await this.departamentoService.createDepartamento(form.value)).subscribe(
            (data: any) => {
              console.log(data);
  
              if (data.success) {
                this.departamentoService.departamentos = [];
  
                this.notiService.onSuccess('Departamento registrado', '¡Registro de departamento ' + form.value.nombre + ' exitosamente!.');
  
                this.onReset();
                this.getDepartamentos();
  
                this.alertTitulo = "";
                this.alertDescripcion = "";
                this.alertError = false;
                this.alert = false;
              }
              else {
  
                this.alertTitulo = "Error al registrar departamento";
                this.alertDescripcion = (data?.message) ? data.message : "Verifique su información";
                this.alertError = true;
                this.alert = true;
              }
  
            },
            error => {
  
              console.log(error)
              this.alertTitulo = "Error al registrar departamento";
              this.alertDescripcion = error.error;
              this.alertError = true;
              this.alert = true;
  
            }
          )
  
        }
        else {
  
          await (await this.departamentoService.updateDepartamento(form.value)).subscribe(
            (data: any) => {
  
              if (data.success) {
                this.notiService.onSuccess('Departamento actualizado', '¡Actualización de departamento '+ form.value.nombre +' exitosa!.');
  
                this.departamentoService.departamentos = [];
                this.onReset();
                this.getDepartamentos();
  
                this.alertTitulo = "";
                this.alertDescripcion = "";
                this.alertError = false;
                this.alert = false;
              }
              else {
  
                this.alertTitulo = "Error al actualizar departamento";
                this.alertDescripcion = (data?.message) ? data.message : "Verifique su información.";
                this.alertError = true;
                this.alert = true;
              }
  
              console.log(data)
  
            },
            error => {
              console.log(error)
              this.alertTitulo = "Error al actualizar departamento";
              this.alertDescripcion = (error?.error) ? error.error : "Verifique su información.";
              this.alertError = true;
              this.alert = true;
            }
          )
        }
      }
    
  

 
  async deleteDepartamento(id: string = "", nombre: string ="") {
    await (await this.departamentoService.deleteDepartamento(id)).subscribe(
      (data: any) => {
        console.log(data);
        if (data.success) {
          this.notiService.onSuccess('Departamento eliminado', '¡Se eliminó registro de departamento '+ nombre +' exitosamente!.');

          this.departamentoService.departamentos = [];
          this.page = 1;
          
          this.alertTitulo = "";
          this.alertDescripcion = "";
          this.alertError = false;
          this.alert = false;

          this.onReset();
          this.getDepartamentos();
        }
        else {
          this.alertTitulo = "Error al eliminar departamento";
          this.alertDescripcion = (data?.message) ? data.message : "Verifique su información.";
          this.alertError = true;
          this.alert = true;
        }
      },
      error => { console.log(error) }
    )

  }
 
  async editDepartamento(user: any) {
    this.onReset();
    console.log(user);
    this.getUsuarioById(user._id);
  }

  
  async getUsuarioById (id: string) {
    await (await this.departamentoService.getDepartamentoById(id)).subscribe(
      (data: any) => {
        if(data.success){
          this.departamentoService.departamentoSeleccionado = data.data
        }
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
    this.getDepartamentos();
  }

 

  async applyFilter(e: any) {
    console.log(e.type)
    if (e?.type === "keyup") {
      var buscar = e.target.value;
      this.filtroBuscar = buscar;
      this.getDepartamentos();
    }
  }

  confirmarEliminarDepartamento(id: any, email: any) {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: { title: 'Eliminar registro', content: '¿Deseas eliminar el departamento ' + email + ' ?' },
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      position: { top: '18%' }
    });


    dialogRef.afterClosed().subscribe(
      res => {
        if (res && id !== null && id !== "") { this.deleteDepartamento(id, email) }
      },
      error => { console.log(error) }
    )
  }
}
