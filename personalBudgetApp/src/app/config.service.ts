import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

  addExpense(body: any){
    return this.http.post('http://161.35.96.14/expense/dashboard', body, {
      observe: 'body'
    });
  }

 getExpense (body: any){
    return this.http.get('http://161.35.96.14/expense/dashboard', {
      observe: 'body'
    });
  }

  submitRegister(body: any){
    return this.http.post('http://161.35.96.14/users/register', body, {
      observe: 'body'
    });
  }

  login(body: any){
    return this.http.post('http://161.35.96.14/users/login', body, {
      observe: 'body'
    });
  }

  getDashboard(){
    return this.http.get('http://161.35.96.14/users/dashboard', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

}


// Reference: https://angular.io/guide/http
