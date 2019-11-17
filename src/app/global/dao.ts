import {Injectable} from '@angular/core';
import * as PouchDB from 'pouchdb/dist/pouchdb';
import {environment} from '../../environments/environment';

@Injectable()
export class Dao{
    cloudant: any;
    localDB:any;
    receitas:any;

    constructor(){

    }
    public init(){
        this.cloudant = new PouchDB(environment.cloudantURL+"/"+environment.cloudantDb,{
           auth:{
               username:environment.cloudantUser,
               password:environment.cloudantPassword
           },
           ajax:{
               timeout:1000 * 60 *2
           } 
        });
        this.localDB = new PouchDB(environment.localCloudantDb);
        this.syncDB();
    }
    syncDB(){
        this.localDB.sync(this.cloudant, {
            live:true,
            retry: true
        });
    }
    //devolve documento do banco
    get(id){
        return this.localDB.get(id).then(function (doc){
            ;return doc;
        }).catch(function (err){
            console.log(err);
        });
    }
    getAll(){
        if(!this.receitas){
            return this.localDB.allDocs({includes_docs:true}).
            then(docs=>{
                let receita = docs.row.map(row=>{
                    return row.doc;
                });
                return this.receitas;
            })
        }else{
            //retorna cache como promise
            return Promise.resolve(this.receitas);
        }
    }
    put(doc){
      return this.localDB.put(doc);  
    }
    followDB(){
        return this.localDB.changes({
            since:'now',
            live: true,
            include_docs:true
        });
    }
    public getData(startKey,endKey,queryName?){
        queryName = queryName||"export/date-country";
        let options ={
            startKey:startKey,
            endKey:endKey,
            include_docs:true,
            inclusive_end:true
        };
        console.log(queryName);
        console.log(options);
        return this.runQuery(queryName,options);
    }
    private runQuery(queryName, options){

        let cloud = this;
        return new Promise(function(resolve, reject) {
          cloud.cloudant.query(queryName, options).then(function (result) {
            console.log(result);
            resolve(result);
          }).catch(function (err) {
            console.log(err);
          });
    
        });
        
      }

}
