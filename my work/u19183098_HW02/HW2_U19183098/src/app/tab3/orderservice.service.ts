import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Productmodel } from '../models/productmodel';

@Injectable({
  providedIn: 'root'
})
export class OrderserviceService {

 API = 'api/Order/'

  constructor(private http: HttpClient) { }
//to add the order to the database
  public storeOrder(Products:Productmodel[])
  {
    var OrderVM = { "basketProducts" : Products }
    return this.http.post( environment.API + this.API + "createOrder" , OrderVM);
  }

  //to get the orders from the database
  public getOrders()
  {
    return this.http.get( environment.API + this.API + "getOrders");
  }

}
