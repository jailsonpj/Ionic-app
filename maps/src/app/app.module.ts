import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MapaPage } from '../pages/mapa/mapa';
import { CheckinPage } from '../pages/checkin/checkin';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPageModule } from '../pages/login/login.module';
import { TimelinePageModule } from '../pages/timeline/timeline.module';
import { RegisterPageModule} from '../pages/register/register.module';
import {Geolocation} from '@ionic-native/geolocation';
import {IonicStorageModule} from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule} from 'angularfire2';
//import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyBwiKu5S725gWy0xLg0U4EPwFwNFLiZgNE",
    authDomain: "mapteste-19437.firebaseapp.com",
    databaseURL: "https://mapteste-19437.firebaseio.com",
    projectId: "mapteste-19437",
    storageBucket: "mapteste-19437.appspot.com",
    messagingSenderId: "643278029679"
}

@NgModule({
  declarations: [
    MyApp,
    MapaPage,
    CheckinPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    LoginPageModule,
    RegisterPageModule,
    TimelinePageModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapaPage,
    CheckinPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
