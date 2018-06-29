import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationComponent } from './location.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {  ToastrModule } from 'ngx-toastr';

describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationComponent ],
      imports: [ FormsModule, HttpClientTestingModule, ToastrModule.forRoot()  ] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent( LocationComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Location Component', () => {
    expect(component).toBeTruthy();
  });
  
  it('should have a Address Field ', () => {
    const fixture = TestBed.createComponent(LocationComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement;
    expect(app.querySelector('input').name).toEqual('address');    
  });

});
