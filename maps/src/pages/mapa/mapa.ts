import { Component,ElementRef,ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


declare var google;
var listas: any = [];
let lista = {
  nome:String,
  descricao: String,
  lati: 0,
  longi: 0,
  hora: 0,
  minuto: 0,
  segundo: 0,
  dia: 0,
  mes: 0,
  ano:0
};

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})
export class MapaPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController,public geolocation: Geolocation,private alertCtrl: AlertController, private storage: Storage) {

  }


  presentPrompt() {
  		let alert = this.alertCtrl.create({
    	title: 'Onde vc está?',
    	inputs: [
      	{
        	name: 'local',
        	placeholder: 'Local'
      	},
      	{
        	name: 'fazendo',
        	placeholder: 'O que você está fazendo?',

      	}
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Registrar',
        handler: data => {

          lista.nome = data.local;
          lista.descricao = data.fazendo;
          listas.push(lista);
          this.storage.set('locais',listas);
          this.alertaConfirmacao();

          console.log(listas);
          console.log(lista);
            // logged in!
          console.log('Registrar clicked');

        }
      }
    ]
  });
  alert.present();
}


  ionViewDidLoad(){
    this.storage.ready().then(() => {
      this.storage.get('locais').then((value) => {
        if(value) {
          for(let i of value) {
            listas.push(i);
          }
        }
      });
    });


  	this.loadMap();
  }

  loadMap(){
  		this.geolocation.getCurrentPosition().then((position) => {


  			let latLng = new google.maps.LatLng(position.coords.latitude, 	position.coords.longitude);

        lista.lati = position.coords.latitude;
        lista.longi = position.coords.longitude;
        let data = new Date;
        lista.hora = data.getHours();
        lista.minuto = data.getMinutes();
        lista.segundo = data.getSeconds();
        lista.dia = data.getDate();
        lista.mes = data.getMonth()+1;
        lista.ano = data.getFullYear();

  			let mapOptions = {
  				center: latLng,
  				zoom: 15,
  				mapTypeId: google.maps.MapTypeId.ROADMAP
  			}
  			this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  		},(err) => {
  			console.log(err);
  		});
  	}


  	addMarker(){
  		this.geolocation.getCurrentPosition().then((position) => {


  			let latLng = new google.maps.LatLng(position.coords.latitude, 	position.coords.longitude);
  			let marker = new google.maps.Marker({
  				map:this.map,
  				animation: google.maps.Animation.DROP,
  				position: latLng

  			});
  			let content = "<h4>Local Atual!</h4>"

  			this.addInfoWindow(marker,content);

  		},(err) => {
  			console.log(err);
  		});
  	}

  	addInfoWindow(marker,content){
  		let infoWindow = new google.maps.InfoWindow({
  			content: content
  		});
  		google.maps.event.addListener(marker,'click',() => {
  			infoWindow.open(this.map,marker);
  			this.presentPrompt();
  		});
  	}

    private alertaConfirmacao() {
      let alert = this.alertCtrl.create({
        title: 'Gravado',
        subTitle: 'Local registrado',
        buttons: ['OK']
      });
      alert.present();
    }



}
