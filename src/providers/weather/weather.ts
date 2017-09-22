import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation, GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {
 apiKey = 'f809352d886d44bc';
 url;
 
  constructor(public http: Http, private geolocation: Geolocation) {

    console.log('Hello WeatherProvider Provider');
    this.url ='http://api.wunderground.com/api/'+this.apiKey+'/conditions/q';


  }

  getWeather(city, state){
  	return this.http.get(this.url+'/'+state+'/'+city+'.json')
  	 .map(res => res.json());
  }
  
  getLocalWeather(){
   this.geolocation.getCurrentPosition({
     enableHighAccuracy: true
   })
   .then((res) => {



     console.log(res);
    console.log(res.coords.latitude);
    console.log(res.coords.longitude);
    console.log('geoposition loaded...');
    
   }).catch((error) => {

     console.log('Error getting location', error);
});
}
}
