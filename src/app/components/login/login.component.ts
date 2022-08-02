import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router'
import { NgxToastService } from 'ngx-toast-notifier';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  //Create FormGroup
  submitted = false;
  angForm!: FormGroup;
  data: any = {};

  user = {
    email: '',
    password: ''
  }


  alert: boolean = false;
  alertError: boolean = false;
  alertClase: string = 'alert alert-dismissible alert-error';
  alertTitulo: string = 'Titulo';
  alertDescripcion: string = 'alertDescripcion';


  constructor(
    private authService: AuthService,
    private router: Router,
    public notiService: NgxToastService,
    public fb: FormBuilder
  ) {
     
  }

  ngOnInit(): void {
    this.createForm();
  }


  get f(): { [key: string]: AbstractControl } {
    console.log(this.angForm)
    console.log(this.angForm.controls)
    return this.angForm.controls;
  }

  onReset(): void {
    console.log('onReset')
    this.submitted = false;
    this.angForm.reset();
    this.alert = false;
  }


  onSubmit(): void {
    console.log('onSubmit')

    this.submitted = true;
    if (this.angForm.invalid) {
      this.angForm.valueChanges
      return;
    }
    else {
      this.login();
      console.log(JSON.stringify(this.angForm.value, null, 2));
    }

  }

  createForm() {
    this.angForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]]
    },
    );
  }


 


  async login() {
    console.log("login")
    console.log("email : ", this.user.email)
    console.log("password : ", this.user.password)

    await this.authService.login(this.angForm.value).subscribe(
      (data: any) => {
        console.log(data)


        if (data?.token !== null) {

          this.alertTitulo = "";
          this.alertDescripcion = "";
          this.alertError = false;
          this.alert = false;

          var username = (data.user.nombre + ' ' + data.user.apellido);
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('superAdmin', data.user.superAdmin);

          console.log(sessionStorage);
          console.log('showSuccess');

          this.notiService.onSuccess('Bienvenido ' + username, 'Inicio de sesión exitoso.');

          setTimeout(() => {
            this.router.navigate(['/tickets'])
          }, 500);
        }

        else {
          this.alertTitulo = "Error al iniciar sesión";
          this.alertDescripcion = "Verifique su información";
          this.alertError = true;
          this.alert = true;
        }
      },
      error => {
        console.log(error)
        this.alertTitulo = "Error al iniciar sesión";
        this.alertDescripcion = error.error;
        this.alertError = true;
        this.alert = true;

      }
    )
  }



  cerrarAlerta() {
    console.log("cerrarAlerta")
    this.alert = false;
  }
}
