import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, Validators } from '@angular/forms';

import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required]
  });

  public error;

  constructor(public fb: FormBuilder, public Auth: AuthProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
 

  doLogin(){
   this.Auth.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result)=>{
     console.log(result)
    this.navCtrl.push(HomePage);
   }, (error)=>{
    console.log(error);
    this.error = error.message;
   })
  }

  signup(){
    this.navCtrl.push(SignupPage);
  }

 
}
