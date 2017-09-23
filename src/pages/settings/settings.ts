import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage} from '../home/home';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  city:string;
  state:string;
  lat: number;
  lon: number;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private geolocation: Geolocation) {
   
    
      this.storage.get('location').then((val) => {
        if(val != null){
          let location =JSON.parse(val);
          this.city = location.city;
          this.state = location.state;
        } else {
          this.city = 'Miami';
          this.state = 'FL';
        }

      });

}

ionViewDidLoad(){
 console.log('ionViewDidLoad SettingsPage');
}

saveForm(){
  let location = {
    city: this.city,
    state: this.state
  }
  this.storage.set('location', JSON.stringify(location));
  this.navCtrl.push(HomePage);
}

//////////////////////////

 watchPos(){


   this.geolocation.getCurrentPosition({enableHighAccuracy: true})
   .then((res) => {
     
       var latitide = res.coords.latitude;
       var longitude = res.coords.longitude;

       
        console.log(res.coords.latitude);
        console.log(res.coords.longitude);
        console.log('geoposition loaded...');


   let position ={

   latitude : this.lat,
   longitude: this.lon
   }

  this.storage.set('position', JSON.stringify(position));
  this.navCtrl.push(HomePage);
    
   }).catch((error) => {
     console.log('Error getting location', error);
});



}

}