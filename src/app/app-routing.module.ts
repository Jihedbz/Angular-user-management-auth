import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { roleGuard } from './guards/role.guard';
import {NotAuthorizedComponent} from "./components/not-authorized/not-authorized.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [roleGuard], // Protect the route with roleGuard
    data: { role: 'ADMIN' } // Specify the required role for this route
  },
  { path: 'not-authorized', component: NotAuthorizedComponent }, // Define the not-authorized page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
