import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';
 import { GeocoderProvider } from '../../providers/geocoder/geocoder';

 import { UserDataProvider } from '../../providers/user-data/user-data';
 import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the EditLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-location',
  templateUrl: 'edit-location.html',
})
export class EditLocationPage {

  location:any;
  map: GoogleMap; lat; lng; userID:string;error:string;
  form = { title:'', address:''};

  constructor(private nativeGeocoder: NativeGeocoder,public fb: FormBuilder,public navCtrl: NavController, public navParams: NavParams,private googleMaps: GoogleMaps, public _GEOCODE   : GeocoderProvider, public UData: UserDataProvider, public afAuth:AngularFireAuth) {
    this.location = navParams.get("data");
    this.form.title= this.location.title;
    this.form.address = this.location.address;
    this.lat = this.location.latitude;
    this.lng = this.location.longitude;
    this.userID = this.location.userId;
  }

  ionViewDidLoad() {
    this.loadMap();
   }

   loadMap() {

    const authObserver = this.afAuth.authState.subscribe( user => {
      if (user) {
        this.userID = user.uid;
        authObserver.unsubscribe();
      }
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.lat,
          lng: this.lng,
          draggable: true
        },
        zoom: 18,
        tilt: 30,
      }
    };

    this.map = GoogleMaps.create('mymap2', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
        // Now you can use all methods safely.
       this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: this.lat,
              lng: this.lng
            },
          }).then(marker =>{
            
             this.map.on(GoogleMapsEvent.CAMERA_MOVE).subscribe(()=>{
               var target = this.map.getCameraTarget();
              // console.log(target.lat + " " + target.lng);

              this.lng = target.lng;
              this.lat = target.lat;

               marker.setPosition(target);
             })
          })

   
      
      });
      
  }


  Search(){
    this._GEOCODE.forwardGeocode(this.form.address)
    .then((data : any) =>{
      if(! data) return;
      this.map.animateCamera({
        target: {
          lat: data[0].latitude,
          lng: data[0].longitude
        }
      });
   
     
    }).catch((error : any)=>
    {     
      console.log(error)
    });
    }



    Save(){
      if(this.form.title=="" || this.form.address == ""){
        this.error = "You must enter Title and Address."
        return;
      }
        this.UData.EditLocation(this.location.key,{
        "title": this.form.title,
        "address": this.form.address,
        "latitude": this.lat,
        "longitude":this.lng,
        "userId": this.userID
      });
      this.navCtrl.pop();
    }


}
