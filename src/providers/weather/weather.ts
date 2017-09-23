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
 urlg;

 
  constructor(public http: Http, private geolocation: Geolocation) {

    console.log('Hello WeatherProvider Provider');
    this.url ='http://api.wunderground.com/api/'+this.apiKey+'/conditions/q';
    this.urlg ='http://api.wunderground.com/api/'+this.apiKey+'/geolookup/conditions/q';


  }

  getWeather(city, state){
  	return this.http.get(this.url+'/'+state+'/'+city+'.json')
  	 .map(res => res.json());
  }
  
  getLocalWeather(lat, lon){
   return this.http.get(this.url+'/'+lat+','+lon+'.json')
     .map(res => res.json());
  
}
}