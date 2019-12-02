import {Injectable} from '@angular/core';
import * as PouchDB from 'pouchdb/dist/pouchdb';
import {environment} from '../../environments/environment';


@Injectable()
export class CloudantModule {
  
  cloudant: any;
  localDB: any;

  _calls: any;
  private _internal: any;

  constructor() {
   

  }


  public init(){
    this.cloudant = new PouchDB(environment.cloudantURL+"/"+environment.cloudantDb, {
      name:environment.cloudantDb,
      auth:{
        username: environment.cloudantUser,
        password: environment.cloudantPassword
      },
      ajax: {
        timeout: 1000 * 60 * 2
      }
    });
    this.localDB = new PouchDB(environment.localCloudantDb);

    this.syncDB();
  }

  put(doc){
    return this.localDB.put(doc); 
  }
  get(alimento){
    return this.localDB.get(alimento).then(function (doc) {
      return doc;
    }).catch(function (err) {
      console.log(err);
    });
  }
  getAll() {

    if (!this._calls) {
      return this.localDB.allDocs({ include_docs: true})
        .then(docs => {

          let calls = docs.rows.map(row => {
            return row.doc;
          });

          //Removing _design and internal_ docs from calls
          this._calls = calls.filter(row => {
            if (row._id.indexOf("_design") !== -1) return false;
            if (row._id.indexOf("internal_") !== -1) return false;
            if (!row.repairId)  return false;
            return true;
          });

          return this._calls;
        });
    } else {
      // Return cached data as a promise
      return Promise.resolve(this._calls);
    }
  }
  getInternal(){

    if (!this._internal) {
      return this.localDB.allDocs({ include_docs: true})
        .then(docs => {
          let internal = docs.rows.map(row => {
            return row.doc;
          });

          //addin internal docs on the call
          this._internal = internal.filter(row => {
            if (row._id.indexOf("internal_") !== -1) return true;
            return false;
          });
          console.log(this._internal);
          return this._internal;
        });
    } else {
      // Return cached data as a promise
      return Promise.resolve(this._internal);
    }
  }

  followDB() {
    return this.localDB.changes({
      since: 'now',
      live: true,
      include_docs: true
    });
  }


  syncDB() {
    this.localDB.sync(this.cloudant, {
      live: true,
      retry: true
    });    

  }

  public getData(startKey, endKey, queryName?){
    queryName = queryName || "export/date-country";
    let options = {
      startkey: startKey,
      endkey: endKey,
      include_docs: true,
      inclusive_end: true
    };
    console.log(queryName)
    console.log(options)
    return this.runQuery(queryName, options);
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
