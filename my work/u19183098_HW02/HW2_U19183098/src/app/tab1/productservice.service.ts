import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Listener } from 'selenium-webdriver';


@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  api = 'api/Product/' //what API import will look like

  constructor(private http: HttpClient ) { } //Initialise constructor 

  public getProducts() //get the products from the API
  {
    
   return this.http.get(environment.API + this.api + "getProductList"); //get request to fetch URL information

  }
 

}
