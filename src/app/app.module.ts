import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './services/http.service';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDasboardComponent } from './components/admin-dasboard/admin-dasboard.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminDasboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [HttpService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
