import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guards';

/**Material modules */
import { MatToolbarModule } from '@angular/material/toolbar'; // Importa MatToolbarModule
import { MatButtonModule } from '@angular/material/button';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { RecuperarContraseniaComponent } from './components/recuperar-contrasenia/recuperar-contrasenia.component';
import { InicioComponent } from './components/inicio/inicio.component'; 




@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    LoginComponent,
    RecuperarContraseniaComponent,
    InicioComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],

})
export class AppModule { }
