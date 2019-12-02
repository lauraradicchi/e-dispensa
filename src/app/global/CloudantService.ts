import { Injectable, NgZone } from '@angular/core';
import { POUCH } from '../../assets/config/pouch.config';
import PouchDB from 'pouchdb';


@Injectable({
  providedIn: 'root'
})
export class CloudantService {

  private _db;
  private _docs;
  private _internal;
 

  constructor(
              private zone: NgZone) {
  }

  initDB() {
    console.log("initializing Pounch");
    //PouchDB.plugin(cordovaSqlitePlugin);
    //this._db = new PouchDB(POUCH.DB_LOCAL_NAME, { adapter: 'cordova-sqlite' });
    this._db = new PouchDB(POUCH.DB_LOCAL_NAME);
    this.sync();
  }

  getAll() {

    if (!this._docs) {
      return this._db.allDocs({ include_docs: true})
        .then(docs => {

          this._docs= docs.rows.map(row=>{
              return row.doc;
          });
          
          // Listen for changes on the database.
          this._db.changes({ live: true, since: 'now', include_docs: true})
            .on('change', this.onDatabaseChange);

          return this._docs;
        });
    } else {
      // Return cached data as a promise
      return Promise.resolve(this._docs);
    }
  }

  private onDatabaseChange = (change) => {
    
    if (change.id.indexOf("_design") !== -1) return;

    if (change.id.indexOf("internal_") !== -1){
      let index = change.id.split("_")[1];
      this.zone.run(() => {
        this._internal[index] = change.doc;
      });
      return;
    }
    
    var index = this.findIndex(this._docs, change.id);
    var doc = this._docs[index];

    if (change.deleted) {
      if (doc) {
        this.zone.run(() => {
          this._docs.splice(index, 1); // delete
        });
      }
    } else {
      
      if (doc && doc._id === change.id) {
        this.zone.run(() => {
          this._docs[index] = change.doc; // update
        });
      } else {
        this.zone.run(() => {
          this._docs.splice(index, 0, change.doc) // insert
        });
      }
    }
  };

// Binary search, the array is by default sorted by _id.
  private findIndex(array, id) {
    var low = 0, high = array.length, mid;
    while (low < high) {
      mid = (low + high) >>> 1;
      array[mid]._id < id ? low = mid + 1 : high = mid
    }
    return low;
  }

  

  private sync(){

    this._db.sync(POUCH.PROTOCOL + '://' + POUCH.USER + ':' + POUCH.PASSWORD + '@' + POUCH.URL + '/' + POUCH.DBNAME , {
      live: true,
      retry: true
    })
      .on('change', function(change){
        console.log('Cloudant provider change!', change);
      })
      .on('paused', function(info){
        console.log('Cloudant provider paused!', info);
      })
      .on('active', function(info){
        console.log('Cloudant provider active!', info);
      })
      .on('error', function(err){
        console.log('Cloudant provider error!', err)
      });
  }
  getDoc(_id){

    let erof = this;
      return new Promise(function(resolve, reject) {

        erof._db.get(_id).then(function (doc) {
          resolve(doc);

        }).catch(function (err) {
          console.log(err);
          reject(err);
        });

      });
  }

  getInternal(){

    if (!this._internal) {
      return this._db.allDocs({ include_docs: true})
        .then(docs => {
          let internal = docs.rows.map(row => {
            return row.doc;
          });

          //addin internal docs on the call
          internal = internal.filter(row => {
            if (row._id.indexOf("internal_") !== -1) return true;
            return false;
          });
          
          this._internal = [];
          for (var i =0; i < internal.length; i++){
            let index = internal[i]["_id"].split("_")[1];
            this._internal[index] =  internal[i];
          }

          console.log(this._internal);
          return this._internal;
        });
    } else {
      // Return cached data as a promise
      return Promise.resolve(this._internal);
    }
  }
}
