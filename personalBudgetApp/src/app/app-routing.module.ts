import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { P404Component } from './p404/p404.component';

const routes: Routes = [
  {
    path: '',
  component: HomepageComponent,
  pathMatch: 'full'
  },
  {
  path: 'login',
  component: LoginComponent
  },
  { path: 'register',
  component: RegisterComponent
},
{
  path: 'dashboard',
  component: DashboardComponent
},
{
  path: '**',
component: P404Component
}

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
