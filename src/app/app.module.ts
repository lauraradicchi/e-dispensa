import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
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
import { CloudantService } from './global/CloudantService';
import { DataTableModule } from 'angular2-datatable';
import{ MatTableModule } from '@angular/material';
import { TabelaReceitasComponent } from './tabela-receitas/tabela-receitas.component';

  



@NgModule({
  declarations: [
    AppComponent,
    ReceitasComponent,
    HomeComponent,
    TabelaReceitasComponent
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
    MatButtonModule,
    DataTableModule,
    MatTableModule
    

  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


