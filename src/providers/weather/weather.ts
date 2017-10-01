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
 apiKeyF = 'a7c9d3b8fec031156e43d9cb658e90cf';
 url;
 urlf;
 urlf1;
 lat: string;
 lon: string;


  constructor(public http: Http, private storage: Storage, private geolocation: Geolocation) {

    console.log('Hello WeatherProvider Provider');
    this.url ='http://api.wunderground.com/api/'+this.apiKey+'/conditions/q';
    this.urlf ='https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+this.apiKeyF+'&tags=scenery%2Clandscape%2Cnature&lat=';

    //https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=86a50f9515065def7725667df1f10fba&tags=scenery%2Clandscape%2Cnature&lat=37.776289&lon=-122.395234&per_page=5&format=json&nojsoncallback=1

//https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=86a50f9515065def7725667df1f10fba&tags=scenery%2Clandscape%2Cnature&lat=37.776289&lon=-122.395234&per_page=5&format=json&nojsoncallback=1&api_sig=193bc577fe89bdc7f8469309bb8fb2f0
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


} //end of getLocalWeather()



   getFlickr(lat, lon){

     return this.http.get(this.urlf+lat+'&lon='+lon+'&per_page=5&format=json&nojsoncallback=1')
     .map(res => res.json())
     .map((val) => {
       if (val.stat === 'ok'){
         return val.photos.photo.map((photo: any) =>{

           let farmId = photo.farm;
           let serverId = photo.server;
           let id = photo.id;
           let secret = photo.secret;
           return {

             urlf1: 'https://farm'+farmId+'.staticflickr.com/'+serverId+'/'+id+'_'+secret+'_b.jpg',

             title: photo.title
             
           }

         })
       } else { return []};


     });
   }// end of getFlickr

   
     
     
};


//https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2857aa64af90318d0c811415f1925103&lat=37.776289&lon=-122.395234&format=json&nojsoncallback=1&api_sig=1db0042eac2e6d2ff0967caa0d26288d


//https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2857aa64af90318d0c811415f1925103&lat=37.776289&lon=-122.395234&format=json&nojsoncallback=1&auth_token=72157687189903083-cd23d27c0f0042af&api_sig=1f183cdd67e5d8d7c89a095e6b808a83
//https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=86a50f9515065def7725667df1f10fba&tags=scenery%2Clandscape%2Cnature&per_page=5&format=json&nojsoncallback=1&auth_token=72157660940134908-c59753e5553680ef&api_sig=9d8d2f15d2913913f0bebe3356f101cd

//https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=86a50f9515065def7725667df1f10fba&tags=scenery%2Clandscape%2Cnature&lat=37.776289&lon=-122.395234&per_page=5&format=json&nojsoncallback=1&api_sig=193bc577fe89bdc7f8469309bb8fb2f0