import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MockdataService {
	constructor(private _httpClient:HttpClient) { }
	getAirlineData(): Observable<any>{
		return this._httpClient.get("https://api.npoint.io/41ba03db8384083f1687")
	}

	getCountryDetail(): Observable<any>{
		return this._httpClient.post("https://testapi.twirll.com/twconfigs/getcountryinfo.json?access_token=6105d90f54bf03c6132be66aab9b01b31aa09e3e01b5400d9adf8d8917a7699e",{})
	}
}