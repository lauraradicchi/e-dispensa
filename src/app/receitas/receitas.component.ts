import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import{RouterModule,Router} from '@angular/router';
import {FormControl, Validators,FormBuilder, FormGroup} from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CloudantService } from '../global/CloudantService';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CloudantModule } from '../global/CloudantModule';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.scss']
})
export class ReceitasComponent implements OnInit {
  
  public system: {};
  public docs =[];
  public internal =[];
  public forms = [];
  tipoReceita: string;
  receitas: string[] = ['Doce' , 'Salgada'];
  restricaoAlimentar: string;
  restricaos: string[] = ['Sim', 'Não'];
  docsReceitas = [];
  dataSource: any;
  @ViewChild(MatPaginator,  {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,  {static: false}) sort: MatSort;
  
 
  constructor(private dbCloudant:CloudantService ,
    private zone: NgZone,
    private cloudant:CloudantModule) {
  }
  
  ngOnInit() {
    this.dbCloudant.initDB();
      this.getDocs();
      this.dbCloudant.getInternal().then((internals) => {
        this.zone.run(() => {
          this.internal = internals;

        });
        console.log(this.internal);
      }); 
   
  }
  private getDocs(){
    this.dbCloudant.getAll()
      .then(data => {
        console.log(data);
        this.zone.run(() => {
          this.docs = data;
        });
      })
      .catch(console.error.bind(console));
  }
  restricoesAlimentares(evt) {
     this.restricaoAlimentar = evt;
    console.log(this.restricaoAlimentar);
  }
  tipoReceitas(evt){
    this.tipoReceita = evt;
    console.log(this.tipoReceita);
  }
  envioReceitas(tipoReceita:string, restricaoAlimentar:string, alimento:string,tipo) {
    console.log(tipoReceita);
    console.log(restricaoAlimentar);
    console.log(alimento);
    if(restricaoAlimentar =='Sim'){
      
    }
     let receita = this.cloudant.getAll();
    console.log(receita);
    
  }

  isSelected(name: string): boolean {  
    if (!this.restricaoAlimentar) {   
      return false;  
    }  
     return (this.restricaoAlimentar === name);  
  }   
   onChange(deviceValue){
     let restricao = deviceValue;
     console.log(restricao);
     return restricao;
   }
  
    

}
