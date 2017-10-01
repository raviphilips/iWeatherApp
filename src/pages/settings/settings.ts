import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage} from '../home/home';
import { Geolocation } from '@ionic-native/geolocation';
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  city:string;
  state:string;
  lat: string;
  lon: string;
  


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







}