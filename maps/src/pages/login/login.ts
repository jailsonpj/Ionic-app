import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {User} from '../models/user';
import {RegisterPage} from '../register/register';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //public autenticacao: Observable<firebase.User>;
  //public email: String;
  //public senha: String;
  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth: AngularFireAuth) {

  }

  register(){
    this.navCtrl.push('RegisterPage');
  }

  async login(user: User){
    try{
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
      console.log(result);
      if(result){
        this.navCtrl.setRoot(TabsPage);
      }

    }
    catch(e){
      console.error(e);
    }

  }

  logout(){
    this.navCtrl.setRoot(LoginPage);
  }

}
