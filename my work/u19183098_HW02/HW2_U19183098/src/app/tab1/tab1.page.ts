import { Component } from '@angular/core';
import { ProductserviceService } from './productservice.service'
import { AlertController } from '@ionic/angular';
import { Productmodel } from '../models/productmodel';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  //make array of products below/instantiate (for the products that will be received from the database)
  Products: Productmodel[]

  //Construct product service below
  constructor(private prodservice: ProductserviceService) { }

  ionViewWillEnter(): void //to make this happen the application starts
  {
    //clear productlist used with for loop.
    this.Products = [];

    //subscribe response below to populate list
    this.prodservice.getProducts().subscribe(response => {

      //assigning what is received from the database to make a list, reads from the database with names from productmodel.ts
      var Products = response as any[]

      //to set product quantities to 1 below
      for (var i = 0; i < this.Products.length; i++) {
        this.Products[i].productQty = 1;
      }

      //for each product in the database, it must be listed and a new instance must be made (below)
      for (var a = 0; a < Products.length; a++) {
        var Product = new Productmodel(); //make a new product object
        Product.productId = response[a].productId;//get the product id
        Product.productPrice = response[a].productPrice;//get the product price
        Product.productName = response[a].productName;//get the product name
        Product.productDescription = response[a].productDescription; //get the product description

        this.Products.push(Product); //push the object to add it (will add all products because of for loop)

      }
    });

  }

  //Below: strongly receiving the product. Method for when basket button is clicked. 
  //recieve the product from tab1.page.html
  addProductToBasket(Product: Productmodel) {

    //below to check the session storage for basket items. reading session storage, fetching from database
    var Basket = JSON.parse(sessionStorage.getItem('Basket')!) as Productmodel[];

    //below to read items in basket as a list of products using an empty array 
    var ItemsinBasket = [] as Productmodel[];

    //below: check that basket is not null, if there are items, the array is populated with the items
    if (Basket != null) {
      ItemsinBasket = Basket;
    }

    //below when there are objects in basket, 1 or more 
    if (ItemsinBasket.length > 0) {
      //below: use for loop to go through all items in basket and use if to check if there is any with the same productId
      for (var i = 0; i < ItemsinBasket.length; i++) {
        if (ItemsinBasket[i].productId == Product.productId) {
          //display alert if product already in basket, return to page if it is
          alert("Item already in basket");
          return
        }
      }
      //make default quantity 1
      Product.productQty = 1;
      //add to basket list
      ItemsinBasket.push(Product);
    }
    else {
      // add item to basket
      ItemsinBasket.push(Product);

    }
    //below: update session storage every time
    sessionStorage.setItem('Basket', JSON.stringify(ItemsinBasket));
  }

  //to update the quantity of a product
  updateQTY(event) {
    var id = parseInt(JSON.stringify(event.target.name));
    var Product = this.Products.find(Product => Product.productId == id) as Productmodel;
    var qty = event.target.value;
    //find the product
    var Product = this.Products.find(Product => Product.productId == parseInt(event.target.name)) as Productmodel;
    //check that the quantity is above 0
    if (parseInt(event.target.value) <= 0) {
      alert("Please enter a quantity above zero")
    }
    //add the quantity selected
    Product.productQty = parseInt(event.target.value);
  }
}
