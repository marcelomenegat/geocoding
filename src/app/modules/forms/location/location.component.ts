import { Component, OnInit } from '@angular/core';
import { LocationService } from './service/location.service';
import { ToastrService } from 'ngx-toastr';

import * as _ from 'lodash';
import { FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  addressData =
    {
      address: '',
      latitude: '',
      longitude: ''
    };

  constructor(private locService: LocationService,
              private toastr: ToastrService) { }

  ngOnInit() {  }

  getLocByAddress(): void {
    let geoCodingData: any[];
    this.addressData.longitude = '';
    this.addressData.latitude = '';

    
      if (this.addressData.address === '') {
        this.faultGetLocationByAddress(0, 'The field Addres must be informed to get the Latitude / Longitude', 'warning');
      } else {
        this.locService.getLocationByAddress<any>(this.addressData.address)
          .subscribe((locData: any[]) => geoCodingData = locData,
            error => {
              // process errors
              this.faultGetLocationByAddress(error.error, error.message, 'error');
            },
            () => {
              //Process Success
              this.resultGetLocationByAddress(geoCodingData);
            }
          );
      }
  }
  

  private resultGetLocationByAddress(geoCodingData): void {
    let infData;
    let locationsData;

    if (!_.isEmpty(geoCodingData)) {

      //Get info object
      infData = geoCodingData['info'];

      if (infData.statuscode !== 0) {
        this.faultGetLocationByAddress(infData.statuscode, infData.messages, 'error');
      } else {

        if (geoCodingData['results'][0].locations.length > 1) {
          // If the request has returned more than one match, so show and error. 
          this.faultGetLocationByAddress(0, 'Please check if your address, any match was found!', 'warning');
        } else {

          locationsData = geoCodingData['results'][0].locations[0];
          // Set Lat/Lng into form fields
          this.addressData.longitude = locationsData.displayLatLng.lng
          this.addressData.latitude = locationsData.displayLatLng.lat

        }

      }

    } else {
      // the request do not returned any match       
      this.faultGetLocationByAddress(0, 'The request do not return any lat/lng match!', 'error');
    }

  }

  // Show erros to users
  private faultGetLocationByAddress(errorCode, errorMessage, errorType): void {
    switch (errorType) {
      case 'error':
        this.toastr.error(errorMessage, 'Error!');
        break;
      case 'warning':
        this.toastr.warning(errorMessage, 'Alert!');
        break;
      case 'info':
        this.toastr.info(errorMessage, 'Information!');
        break;
    }

  }


}


//