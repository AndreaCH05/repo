import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//Componentes

import { LandingComponent } from './components/landing/landing.component'

import { LoginComponent } from './components/login/login.component'

import { TicketComponent } from './components/ticket/ticket.component'

import { TicketsPrivadosComponent } from './components/tickets-privados/tickets-privados.component'

import { DepartamentoComponent } from './components/departamento/departamento.component'

import { UsuarioComponent } from './components/usuario/usuario.component'

import { AuthGuard } from './auth.guard'

const routes: Routes = [

  {
    path: '',
    component: LandingComponent,
    pathMatch: 'full'
  },
  {
    path: 'login'
    , component: LoginComponent
  },

  {
    path: 'tickets',
    component: TicketComponent,
    canActivate: [AuthGuard],
    
  },
  {
    path: 'tickets-privados', 
    component: TicketsPrivadosComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    
  },
  {
    path: 'usuarios',
    component: UsuarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'departamentos',
    component: DepartamentoComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
