import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html'
})
export class CheckinPage {
  public feeds:any=[];
  constructor(public navCtrl: NavController,public navParams: NavParams,public storage: Storage, private alertCtrl: AlertController) {
  	//feeds = this.mapa.mostraLugar();
  }

  ionViewDidLoad(){
    this.storage.ready().then(()=>{
      this.storage.get('locais').then((value)=>{
        if(value){
          for(let i of value){
            this.feeds.push(i);
            //console.log(feeds);
          }
        }
      });
    });

  }

  public mostrarDados(local:any){
    let alert = this.alertCtrl.create({
      title:"<strong>Local:</strong>" + local.nome,
      subTitle:"<strong>Descrição:</strong>" + local.descricao,
      buttons:['OK']
    });
    alert.present();
  }

}
