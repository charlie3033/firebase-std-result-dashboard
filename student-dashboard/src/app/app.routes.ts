import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dash } from './dash/dash';
import { authGuard } from './guard/auth-guard';

export const routes: Routes = [
  { path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:Login},
  { path: 'dash', component: Dash, canActivate: [authGuard] },
];
