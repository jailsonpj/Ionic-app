import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { MapaPage } from '../mapa/mapa';
import { CheckinPage } from '../checkin/checkin';
import { HomePage } from '../home/home';
import { TimelinePage } from '../timeline/timeline';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MapaPage;
  tab3Root = CheckinPage;
  tab4Root = TimelinePage;


  constructor(private afAuth: AngularFireAuth,private toast: ToastController) {

  }

  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data => {
        if(data && data.email && data.uid){
            this.toast.create({
              message: 'welcome to APP_NAME, ${data.email}',
              duration: 3000
            }).present();

        }else{
          this.toast.create({
            message: 'Could not find authentication ',
            duration: 3000
          });
        }
    });
  }

}
