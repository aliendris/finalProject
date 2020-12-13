import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigService } from '../config.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private configuredService: ConfigService,
    private myRouter: Router,
    private myActivatedRoute: ActivatedRoute) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

  }

  ngOnInit(){
  }

  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  login() {
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      this.configuredService.login(this.loginForm.value)
        .subscribe(
          token => {
            localStorage.setItem('token', token.toString());
            console.log(token);
            this.myRouter.navigate(['/dashboard']);
          },
        );
    }
  }

  routetoregister() {
    this.myRouter.navigate(['../register'], { relativeTo: this.myActivatedRoute });
  }
}
