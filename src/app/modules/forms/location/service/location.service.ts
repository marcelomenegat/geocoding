import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public apiUrl: string;
  
  constructor(private http: HttpClient) { 
    this.apiUrl = this.setApiUrl(environment.MAPQUEST_API_KEY);
  }
  
  getLocationByAddress<T>(address:string): Observable<T> {    
    return this.http.get<T>(this.apiUrl + address);       
  }

  //Set Map Resquest APi URL with the client KEY set in Env paramaters.
  private setApiUrl(mapKey): string {    
    return 'http://www.mapquestapi.com/geocoding/v1/address?key=' + mapKey + '&location=';
  }
  


}
