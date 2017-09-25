import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';

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
 lat: string;
 lon: string;


  constructor(public http: Http, private storage: Storage, private geolocation: Geolocation) {

    console.log('Hello WeatherProvider Provider');
    this.url ='http://api.wunderground.com/api/'+this.apiKey+'/conditions/q';
    this.urlg ='http://api.wunderground.com/api/'+this.apiKey+'/geolookup/conditions/q';


  }

  getWeather(city, state){
  	return this.http.get(this.url+'/'+state+'/'+city+'.json')
  	 .map(res => res.json());
  }




getLocalWeather(lat, lon){
   this.geolocation.getCurrentPosition({enableHighAccuracy: true})
   .then((res) => {
                  
       let position ={
         lat: res.coords.latitude,
         lon: res.coords.longitude
   }
     console.log(res);
     
      this.storage.set('position', JSON.stringify(position));
   
   }).catch((error) => {
     console.log('Error getting location', error);


});
    return this.http.get(this.url+'/'+lat+','+lon+'.json')
     .map(res => res.json());


}

   
     
     
};

