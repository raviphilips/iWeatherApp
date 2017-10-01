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
  photos: object;
	location: {
		city: string;
		state: string;
	};

 position: {
  lat: string;
  lon: string;
 
}


swiper: any;


  constructor(
    public navCtrl: NavController, 
    private weatherProvider: WeatherProvider,
    private storage: Storage,
    private geolocation: Geolocation,
   
   ) {}



  ionViewWillEnter(){


  // Location from LocalStorage

      this.storage.get('location').then((val) => {
        if(val != null){
          this.location =JSON.parse(val);
        } else {
          this.location = {
              city: 'Miami',
              state: 'FL'
        }
       }

  //Location from LocalStorage  calling function

 	    this.weatherProvider.getWeather(this.location.city, this.location.state)
        .subscribe(weather => {
   	    this.weather = weather.current_observation;
      });

     });

 //Postion from GPS

       this.storage.get('position').then((val) =>{
         if(val != null){
           this.position = JSON.parse(val);
         } else {
           this.position ={
              lat : "37.776289",
               lon: "-122.395234"
           
         }
       }

 //Postion from GPS calling function
   
      this.weatherProvider.getLocalWeather(this.position.lat, this.position.lon)
        .subscribe(weather => {
          this.weather = weather.current_observation;

          console.log(weather);
        });




  });//


 this.weatherProvider.getFlickr(this.position.lat, this.position.lon)
         .subscribe(value =>{
           this.photos = value;
           console.log(value);



      var mySwiper = new swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false,
        effect: 'fade'
    });


/*

.map((val) => {
       if (val.stat === 'ok'){
         return val.photos.photo.map((photo: any) =>{

           let farmId = val.farm;
           let serverId = photo.server;
           let id = photo.id;
           let secret = photo.secret;
           return {

             urlf1: `https://farm'+farmId+'.staticflickr.com/'+serverId+'/'+id+'_'+secret+'_b.jpg`,

             title: photo.title
             
           }

         })
       } else { return []};


     });

           
 
*/




 });


}//ionViewWillEnter()

}// end of HomePage
 

