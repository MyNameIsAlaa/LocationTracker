import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthProvider  } from '../auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the UserDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/




@Injectable()
export class UserDataProvider {

  userId:string;

  constructor(public db: AngularFireDatabase) {
  }


  getLocations(userID) {
    return this.db.list('/locations/',  ref => ref.orderByChild('userId').equalTo(userID));
  }
 
  AddLocation(item: any)  {
    this.db.list('/locations/').push(item);
  }

  EditLocation(key:string, item:any){
    this.db.list('/locations/').update(key,item);
  }

  

}
