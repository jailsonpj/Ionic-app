import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

declare var google;
let lista = [];
let listas = {lati: {},long: {},local1: {},fazendo1: {},hora: {h: {},m: {},s: {}} };

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation,private alertCtrl: AlertController, private storage: Storage) {

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
            
            listas.local1 = data.local;
            listas.fazendo1 = data.fazendo;
            //listas.hora = Date.prototype.setUTCDate();
            
            this.storage.set(data.local,lista.push(listas));
            
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
  	this.loadMap();
  }

  loadMap(){
  		this.geolocation.getCurrentPosition().then((position) => {


  			let latLng = new google.maps.LatLng(position.coords.latitude, 	position.coords.longitude);
  		  
        listas.lati = position.coords.latitude;
        listas.long = position.coords.longitude;
        let data = new Date;
        listas.hora.h = data.getHours();
        listas.hora.m = data.getMinutes();
        listas.hora.s = data.getSeconds();

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
}
