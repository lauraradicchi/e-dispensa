import { Component, OnInit } from '@angular/core';
import{RouterModule,Router} from '@angular/router';
import {FormControl, Validators,FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.scss']
})
export class ReceitasComponent implements OnInit {
  options: FormGroup;
  alimento = new FormControl('', [Validators.required, Validators.email]);
  constructor() {
  }
  
  ngOnInit() {

  }
  getErrorMessage() {
    return this.alimento.hasError('required') ? 'Você deve inserir um alimento' :
  
            '';
  }

}
