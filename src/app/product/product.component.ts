import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../shared/product.service';
import { FormControl } from '@angular/forms';
import 'rxjs/Rx';
import { Observable} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
 // private products: Array<Product>;
 private products: Observable<Product[]>;

 // private keyword:string;

  private titleFilter:FormControl =new FormControl();
  
  private imageUrl= 'http://placehold.it/320x150';

  constructor(private productService:ProductService) { 
    // this.titleFilter.valueChanges
    //   .debounceTime(500)  
    //   .subscribe(value=>this.keyword =value);
     
  }

  getStockInfo(value:string){
    console.log(value);
   // this.keyword = value;
  }

  ngOnInit() {
      this.products = this.productService.getProducts();
  }

}


