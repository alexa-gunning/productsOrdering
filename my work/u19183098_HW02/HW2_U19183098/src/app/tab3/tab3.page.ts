import { Component } from '@angular/core';
import { OrderserviceService } from './orderservice.service';
import { ProductserviceService } from '../tab1/productservice.service';
import { ordermodel } from './../models/ordermodel';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

//instantiate an order array 
order: ordermodel[];

//construct the order service
  constructor(private service: OrderserviceService) {}

  ionViewWillEnter() : void {
    
    this.order = [];

    //subscribe this response to populate the order array (below), assigned from the database.
    this.service.getOrders().subscribe(response =>
      
      {
        var order = response as any[]

        for(var i = 0; i <order.length; i++){
          var products = new ordermodel()
          products.orderId = response[i].orderId;
          products.date = this.Date(response[i].date);
          this.order.push(products); //a new order is added
        }
      });
  }
  Date(date:string) //to return the date in the correct format without the time
  {
    return date.split("T")[0];
  }

}
