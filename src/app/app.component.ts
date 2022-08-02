import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxToastService } from 'ngx-toast-notifier';
import { MatPaginatorIntl } from '@angular/material/paginator';

import {  MatDialog  } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})

export class AppComponent {
  title = 'web-tickets';
  angForm: FormGroup | undefined;
  username: string = "userName";

  constructor(
    public authService: AuthService,
    public notiService: NgxToastService,
    public _MatPaginatorIntl: MatPaginatorIntl,
    public matDialog: MatDialog,

    public fb: FormBuilder
    ) 
    {
    this.createForm();

    var username = (sessionStorage.getItem('username') === null) ? "userName" : sessionStorage.getItem('username');
    this.username = (username !== null) ? username : "UserName";


    this._MatPaginatorIntl.itemsPerPageLabel = 'Registros por página :';
    this._MatPaginatorIntl.firstPageLabel = 'Ir a primera página';
    this._MatPaginatorIntl.lastPageLabel = 'Ir a última página';
    this._MatPaginatorIntl.nextPageLabel = 'Página siguiente ';4
    this._MatPaginatorIntl.previousPageLabel = 'Página anterior';

  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  logOut(): void {
    this.notiService.onInfo('Cerrando sesión', 'Gracias. Vuelva pronto.')
    setTimeout(() => {
      this.authService.logOut();
    }, 500);
  }

}



