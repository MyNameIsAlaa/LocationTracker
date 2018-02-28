import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddLocationPage } from '../add-location/add-location';
import { EditLocationPage } from '../edit-location/edit-location';

import { UserDataProvider } from '../../providers/user-data/user-data';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  locations:Observable<any[]>;
  userID:string;

  constructor(public navCtrl: NavController, public UData: UserDataProvider, public afAuth:AngularFireAuth) {


  }


  ionViewWillEnter(){
    const authObserver = this.afAuth.authState.subscribe( user => {
      if (user) {
        this.userID = user.uid;
        /*const getData = this.UData.getLocations(user.uid).snapshotChanges().subscribe((data)=>{
          this.locations = data;
          console.log(data);
          getData.unsubscribe();
        })*/
       this.locations = this.UData.getLocations(user.uid).snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
        console.log(this.locations);
        authObserver.unsubscribe();
      }
    });
  }



  AddPage(){
    this.navCtrl.push(AddLocationPage);
  }

  goEdit(location:string){
    this.navCtrl.push(EditLocationPage,{
      'data': location
    });
  }
}
