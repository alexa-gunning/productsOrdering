import { Component } from '@angular/core';
import { OrderserviceService } from '../tab3/orderservice.service';
import { Productmodel } from '../models/productmodel';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  //empty array creeated below to use later to show items in checkout
Products: Productmodel[]
checkoutpage: boolean = false;
  constructor(private service: OrderserviceService, private toast: ToastController) {}
  ionViewWillEnter() : void {
    //clear all products for for loop
this.Products=[];
//get producs in basket
var prods = JSON.parse(sessionStorage.getItem('Basket')!) as Productmodel[];
//check that there are products in the basket
if(prods != null)
{ //show the checkout if there are products in the basket
  this.Products = prods
  this.checkoutpage = true;
}
else
{
  this.checkoutpage = false;
}
  }
  CheckoutProducts()
  {
    this.service.storeOrder(this.Products).subscribe(response => {
      if(response == null || response == 200)
      { //remove the items from the basket and display an alert that it was checked out
        sessionStorage.removeItem('Basket');
        this.toastalert()
        //close the checkout page and return
        this.checkoutpage = false;
        this.ionViewWillEnter();

        
      }

    })
  }

  DeleteProduct(Product)
{

  var Basket = JSON.parse(sessionStorage.getItem('Basket')!) as Productmodel[];
  //for loop so that it goes through the whole basket
  for (var i = 0; i < Basket.length; i++)
    {
      if(Basket[i].productId == Product.productId) //check the products with the
      {
        //find where the product is
         var place = Basket.findIndex(p => p.productId == Product.ProductId);
        //  var Name = Basket[i].productName;
         Basket.splice(place,1);
         if(Basket.length == 0)
         {
          sessionStorage.removeItem('Basket');
         }
         else
         {
          sessionStorage.setItem('Basket',JSON.stringify(Basket));
         } 
         this.ionViewWillEnter();
      }
    }  

}

async toastalert() {
  const toast = await this.toast.create({
    position: 'top',
    message: 'Checkout was completed successfully',
    duration: 1000
  });
  toast.present();

}
}


