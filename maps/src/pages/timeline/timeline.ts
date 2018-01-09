import { Component,ElementRef,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

declare var google;
var dados:any=[];
var feeds: any = [];
/**
 * Generated class for the TimelinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {
  //map: any;
  //public feeds:any=[];
  constructor(public navCtrl: NavController,public geolocation: Geolocation,public storage: Storage, public navParams: NavParams) {
  }

  ionViewDidLoad(){
    this.storage.ready().then(()=>{
      this.storage.get('locais').then((value)=>{
        if(value){
          for(let i of value){
            feeds.push(i);
          }
        }
      });
    });

    this.initMap();
  }

  initMap(){
    var markerArray = [];
    this.geolocation.getCurrentPosition().then((position) => {
        // Instantiate a directions service.
        var directionsService = new google.maps.DirectionsService;

        // Create a map and center it on Manhattan.
        let latLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        let mapOptions = {
          center: latLng,
          zoom:15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

         var map = new google.maps.Map(document.getElementById('map'),mapOptions);

         // Create a renderer for directions and bind it to the map.
         var directionsDisplay = new google.maps.DirectionsRenderer({map: map});

         // Instantiate an info window to hold step text.
         var stepDisplay = new google.maps.InfoWindow;

         var onChangeHandler = this.calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map);

         //document.getElementById('start').addEventListener('change', onChangeHandler);
        // document.getElementById('end').addEventListener('change', onChangeHandler);

       },(err) => {
      console.log(err);
    });
  }

  calculateAndDisplayRoute(directionsDisplay, directionsService,
          markerArray, stepDisplay, map) {
        // First, remove any existing markers from the map.
        for (var i = 0; i < markerArray.length; i++) {
          markerArray[i].setMap(null);
        }

        directionsService.route({
          origin: 'rua sao joao,compensa 2,manaus , amazonas',
          destination: 'rua belo horizonte,compensa 2,manaus,amazonas',
          waypoints:[{location:'avenida djalma Batista,manaus,amazonas'},{location:'avenida darcy vargas, manaus, amazonas'}],
          travelMode: 'WALKING'
        }, function(result, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
          }
        });
        //directionsDisplay.setPanel(document.getElementById("trajeto-texto"));
      }

    showSteps(directionResult, markerArray, stepDisplay, map) {
        // For each step, place a marker, and add the text to the marker's infowindow.
        // Also attach the marker to an array so we can keep track of it and remove it
        // when calculating new routes.
        var myRoute = directionResult.routes[0].legs[0];
        for (var i = 0; i < myRoute.steps.length; i++) {
          var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
          marker.setMap(map);
          marker.setPosition(myRoute.steps[i].start_location);
          this.attachInstructionText(stepDisplay, marker, myRoute.steps[i].instructions, map);
        }
      }

     attachInstructionText(stepDisplay, marker, text, map) {
        google.maps.event.addListener(marker, 'click', function() {
          // Open an info window when the marker is clicked on, containing the text
          // of the step.
          stepDisplay.setContent(text);
          stepDisplay.open(map, marker);
        });
      }
}
