import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddLocationPage } from '../add-location/add-location';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  locations;
  userID:string;

  constructor(public navCtrl: NavController, public UData: UserDataProvider, public afAuth:AngularFireAuth) {


  }


  ionViewWillEnter(){
    const authObserver = this.afAuth.authState.subscribe( user => {
      if (user) {
        this.userID = user.uid;
        const getData = this.UData.getLocations(user.uid).valueChanges().subscribe((data)=>{
          this.locations = data;
          getData.unsubscribe();
        })
        authObserver.unsubscribe();
      }
    });
  }



  AddPage(){
    this.navCtrl.push(AddLocationPage);
  }

}
