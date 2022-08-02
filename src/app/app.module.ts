import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';

import { UsuarioComponent } from './components/usuario/usuario.component';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { LoginComponent } from './components/login/login.component';
import { TicketsPrivadosComponent } from './components/tickets-privados/tickets-privados.component';
import { LandingComponent } from './components/landing/landing.component';

import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';


import { NgxToastNotifierModule } from 'ngx-toast-notifier';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {  MatDialogModule  } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogContentComponent } from './components/dialog-content/dialog-content.component';
 



@NgModule({

  declarations: [
    AppComponent,

    UsuarioComponent,
    DepartamentoComponent,
    TicketComponent,
    LoginComponent,
    TicketsPrivadosComponent,
    LandingComponent,

    DialogComponent,
    DialogContentComponent
  ],
  entryComponents:[
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,

    NgxToastNotifierModule.forRoot({
      timeOut: 3000,
    }
    )

  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
