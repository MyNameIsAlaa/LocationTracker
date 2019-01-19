import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddLocationPage } from '../pages/add-location/add-location';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { EditLocationPage } from '../pages/edit-location/edit-location';
import { AuthProvider } from '../providers/auth/auth';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { UserDataProvider } from '../providers/user-data/user-data';

import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { GeocoderProvider } from '../providers/geocoder/geocoder';

import {
  GoogleMaps
 } from '@ionic-native/google-maps';
 


const firebaseConfig = {
  apiKey: "",
  authDomain: "locationtracker-a4031.firebaseapp.com",
  databaseURL: "https://locationtracker-a4031.firebaseio.com",
  projectId: "locationtracker-a4031",
  storageBucket: "locationtracker-a4031.appspot.com",
  messagingSenderId: ""
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddLocationPage,
    LoginPage,
    SignupPage,
    EditLocationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddLocationPage,
    LoginPage,
    SignupPage,
    EditLocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AngularFirestore,
    UserDataProvider,
    GoogleMaps,
    NativeGeocoder,
    GeocoderProvider
  ]
})
export class AppModule {}
