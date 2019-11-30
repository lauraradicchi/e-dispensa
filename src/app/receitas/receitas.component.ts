import { Component, OnInit } from '@angular/core';
import{RouterModule,Router} from '@angular/router';
import {FormControl, Validators,FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.scss']
})
export class ReceitasComponent implements OnInit {
  
  tipoReceita: string;
  receitas: string[] = ['Doce' , 'Salgada'];
  restricaoAlimentar: string;
  restricaos: string[] = ['Sim', 'Não']
  constructor() {
  }
  
  ngOnInit() {

  }
  

}
