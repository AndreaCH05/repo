import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Router, CanActivate, ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth.service'


@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      var path = window.location.pathname;
      if (path === '/tickets-privados' || path === '/usuarios' || path === '/departamentos') {
        var permiso = this.authService.getSuperAdmin();
        if (!permiso) {
          setTimeout(() => {
            this.router.navigate(['/tickets']);
          }, 100);
        }
        return permiso;
      }
      else {
        return true;
      }
    }

    else {
      this.router.navigate(['/login']);
      return false;
    }
  }



}
