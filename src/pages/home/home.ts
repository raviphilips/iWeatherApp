import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage} from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	weather: any;
	location: {
		city: string;
		state: string;
	};

 position: {
  lat: string;
  lon: string;
 
}
  constructor(
    public navCtrl: NavController, 
    private weatherProvider: WeatherProvider,
    private storage: Storage,
    private geolocation: Geolocation,

   ) {

  }

  ionViewWillEnter(){


  

      /*this.storage.get('location').then((val) => {
        if(val != null){
          this.location =JSON.parse(val);
        } else {
          this.location = {
              city: 'Miami',
              state: 'FL'
        }
       }
      
 	    this.weatherProvider.getWeather(this.location.city, this.location.state)
        .subscribe(weather => {
   	    this.weather = weather.current_observation;
      });

     });*/

       this.storage.get('position').then((val) =>{
         if(val != null){
           this.position = JSON.parse(val);
         } else {
           this.position ={
              lat : "37.776289",
               lon: "-122.395234"
           
         }
       }
   
      this.weatherProvider.getLocalWeather(this.position.lat, this.position.lon)
        .subscribe(weather => {
          this.weather = weather.current_observation;
        });

  });

}




   }
 

