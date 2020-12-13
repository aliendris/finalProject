import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigService} from '../config.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myRegForm: FormGroup;
  successMessage: String = '';
  constructor(private configuredService: ConfigService,
    private myRouter: Router,
    private myActivatedRoute: ActivatedRoute) {
    this.myRegForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      ripassword: new FormControl(null, this.passValidator)
    });

    this.myRegForm.controls.password.valueChanges
      .subscribe(
        x => this.myRegForm.controls.ripassword.updateValueAndValidity()
      );
  }

  ngOnInit() {
  }
  isValid(controlName) {
    return this.myRegForm.get(controlName).invalid && this.myRegForm.get(controlName).touched;
  }

  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const ripasswordValue = control.value;
      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== ripasswordValue || passValue === '') {
          return {
            isError: true
          };
        }
      }
    }
    return null;
  }
  register() {
    console.log(this.myRegForm.value);
    if (this.myRegForm.valid) {
      this.configuredService.submitRegister(this.myRegForm.value)
        .subscribe(
          data => this.successMessage = 'Registration Success',
          error => this.successMessage = 'Registration error'
        );
    }
  }
  routetologin() {
    this.myRouter.navigate(['../login'], { relativeTo: this.myActivatedRoute });
  }
}
