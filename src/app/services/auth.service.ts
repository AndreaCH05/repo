import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/Usuario';

import { Router } from '@angular/router'



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'http://localhost:4000/'

  token : string = "";
  userLoged : any = undefined;


  constructor(
    private http: HttpClient,
    private router: Router
    ) 
    { }

  login(user: any) {
    let login = this.http.post(this.URL + "login", user);
    this.userLoged = login;
    return login;
  }
 
  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  getToken() {
    return sessionStorage.getItem('token')
  }

  getUserName() {
    return sessionStorage.getItem('username');
  }
 
  getSuperAdmin() {
    const superAdmin = (sessionStorage.getItem('superAdmin') === 'true' ) ;
    return superAdmin
  }


  loggedIn(): Boolean {
    const logged = (sessionStorage.getItem('token') !== null) ;
    return logged;
  }

}


