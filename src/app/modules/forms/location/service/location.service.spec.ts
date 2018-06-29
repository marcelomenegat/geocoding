import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LocationService } from './location.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';


describe('LocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]), HttpClientTestingModule ],
      providers: [LocationService]
    });
  });
  
  it(`should be created`, async(inject([HttpTestingController, LocationService],
    (httpClient: HttpTestingController, apiService: LocationService) => {
      expect(apiService).toBeTruthy();
  })));

  it('should get coordinates', inject(
      [HttpTestingController, LocationService],
      (httpMock: HttpTestingController, locationService: LocationService) => {
        const mock = {
          "info": {
              "statuscode": 0,
              "copyright": {
                  "text": "© 2018 MapQuest, Inc.",
                  "imageUrl": "http://api.mqcdn.com/res/mqlogo.gif",
                  "imageAltText": "© 2018 MapQuest, Inc."
              },
              "messages": []
          },
          "options": {
              "maxResults": -1,
              "thumbMaps": true,
              "ignoreLatLngInput": false
          },
          "results": [
              {
                  "providedLocation": {
                      "location": "Estrada da Falagueira 10D, Amadora PT, 7200362"
                  },
                  "locations": [
                      {
                          "street": "Estrada da Falagueira 10D",
                          "adminArea6": "",
                          "adminArea6Type": "Neighborhood",
                          "adminArea5": "Amadora",
                          "adminArea5Type": "City",
                          "adminArea4": "",
                          "adminArea4Type": "County",
                          "adminArea3": "Lisboa",
                          "adminArea3Type": "State",
                          "adminArea1": "PT",
                          "adminArea1Type": "Country",
                          "postalCode": "2700",
                          "geocodeQualityCode": "P1AAA",
                          "geocodeQuality": "POINT",
                          "dragPoint": false,
                          "sideOfStreet": "N",
                          "linkId": "PT/PAD/p0/172647",
                          "unknownInput": "",
                          "type": "s",
                          "latLng": {
                              "lat": 38.75897,
                              "lng": -9.22637
                          },
                          "displayLatLng": {
                              "lat": 38.75897,
                              "lng": -9.22637
                          },
                          "mapUrl": "http://www.mapquestapi.com/staticmap/v5/map?key=u9fpDzVlThR1GU9eGgo7Ntn9qqgrVojR&type=map&size=225,160&locations=38.75897,-9.22637|marker-sm-50318A-1&scalebar=true&zoom=15&rand=899718567"
                      }
                  ]
              }
          ]
      };
        let addressinput = 'Estrada da Falagueira 10D, Amadora PT, 7200362';

        locationService.getLocationByAddress(addressinput).subscribe((event: HttpEvent<any>) => {          
          switch (event.type) {
            case HttpEventType.Response:
              expect(event.body).toEqual(mock);
          }
        });

        const mockReq = httpMock.expectOne(locationService.apiUrl + addressinput );

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');

        mockReq.flush(mock);
        httpMock.verify();

      }
    )
  );


});

  //http://www.mapquestapi.com/geocoding/v1/address?key=u9fpDzVlThR1GU9eGgo7Ntn9qqgrVojR&location=Estrada da Falagueira 10D, Amadora PT, 7200362

