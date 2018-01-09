import { Component } from '@angular/core';
import { NavController,App } from 'ionic-angular';
import { LoginPageModule } from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  logout(){
    //this.logout.logout();
  }
}
