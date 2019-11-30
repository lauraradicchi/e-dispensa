import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReceitasComponent } from './receitas/receitas.component';
import { HomeComponent } from './home/home.component';
import { routes } from './app-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatTabsModule, MatInputModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
  



@NgModule({
  declarations: [
    AppComponent,
    ReceitasComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    routes,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
