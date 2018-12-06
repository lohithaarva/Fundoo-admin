import { NgModule } from '@angular/core';
import { RouterModule, Routes,} from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDasboardComponent } from './components/admin-dasboard/admin-dasboard.component';
import { AuthGuard } from './auth.guard';
import { QAndAComponent } from './components/q-and-a/q-and-a.component';

const routes : Routes =[
  { path: '', redirectTo: "/admin-login", pathMatch:'full', canActivate: [AuthGuard]},
  { path: 'admin-login', component: AdminLoginComponent},
  { path: 'qanda', component:QAndAComponent},
  { path: 'admin-dashboard', component: AdminDasboardComponent,canActivate: [AuthGuard]},
  


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
