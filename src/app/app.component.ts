import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MockdataService } from './services/mockdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KLM Web';
  airlineCode:string = "";
  lvLoadingData:boolean = false;
  gvMockDataError = {};
  userCountryDataError = {};
  
  gvCompleteMockData:{
    iata_codes: Array<{IATA:string,airport:string,country:string}>,
    temperature: Array<{IATA:string,degreesCelcius:number,lastUpdatedAt:string}>
  }={iata_codes:[],temperature:[]};

  lvCodeSearchData:{
    iata: string,
    airport: string,
    country: string,
    temperature: number | string,
    updated_at: string
  } = {iata:"",airport:"",country:"",temperature:0,updated_at:""};

  userCountryData:{
    currency: string,
    countryname: string,
    countrycode: number,
    isocode_alpha2: string,
    isocode_alpha3: string,
  } = {currency:"EUR",countryname:"Netherlands",countrycode: 31, isocode_alpha2: "NL", isocode_alpha3:"NLD"};

	constructor(private _router:Router,private _mockdataService:MockdataService){}
  ngOnInit() {

    // fetching current country data
		this._mockdataService.getCountryDetail()
		.subscribe(
      (response:any) => {
        if(response){
          this.userCountryData = response;
        }
      },
      (error:any) => {
        this.userCountryDataError = error.error.errors;
      }
		)

    // getting iata data
		this._mockdataService.getAirlineData()
		.subscribe(
      (response:any) => {
        if(response){
          this.gvCompleteMockData = response;
        }
      },
      (error:any) => {
        this.gvMockDataError = error.error.errors;
      }
		)
	}

  fnGetAirlineCodeData(airlineCode:string): void{
    console.log(airlineCode);
    this.lvCodeSearchData.airport = "";
    this.lvCodeSearchData.country = "";
    this.lvCodeSearchData.iata = airlineCode;
    this.lvCodeSearchData.temperature = "";
    this.lvCodeSearchData.updated_at = "";
    this.lvLoadingData = true;
    setTimeout(() => {
      this.lvLoadingData = false;
      if(this.gvCompleteMockData && this.gvCompleteMockData.iata_codes){
        this.gvCompleteMockData.iata_codes.forEach((ithIataCode) => {
          if(ithIataCode.IATA === airlineCode){
            this.lvCodeSearchData.iata = ithIataCode.IATA;
            this.lvCodeSearchData.airport = ithIataCode.airport;
            this.lvCodeSearchData.country = ithIataCode.country;
          }
        });
      }

      if(this.gvCompleteMockData && this.gvCompleteMockData.temperature){
        this.gvCompleteMockData.temperature.forEach(iThTemperature => {
          if(iThTemperature.IATA === airlineCode){
            this.lvCodeSearchData.temperature = iThTemperature.degreesCelcius;
            this.lvCodeSearchData.updated_at = iThTemperature.lastUpdatedAt;
          }
        });
      }
    }, 1000);
	}

	fnKeyDownEvent(pEvent:any,pAirlineCode:string): void{
		const key = pEvent;
		if(pEvent.which === 13){
			console.log(pEvent.which);
      this.fnGetAirlineCodeData(pAirlineCode);
      // this._router.navigate(['/menu']);
		}
	}
}