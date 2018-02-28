import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public SignupForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required]
  });

  public error;

  constructor(public Auth:AuthProvider,public fb: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


  doSignUp(){
    this.Auth.signupUser(this.SignupForm.value.email, this.SignupForm.value.password).then((result)=>{
     this.navCtrl.push(LoginPage);
    }, (error)=>{
      this.error = error.message;
    })
  }

  

}
