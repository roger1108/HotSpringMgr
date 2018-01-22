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
 private products: Product[];

 // private keyword:string;

  private titleFilter:FormControl =new FormControl();
  
  private imageUrl= 'http://placehold.it/320x150';

  constructor(private productService:ProductService) { 
    // this.titleFilter.valueChanges
    //   .debounceTime(500)  
    //   .subscribe(value=>this.keyword =value);
     
  }

  getStockInfo(value:string){
    //console.log(value);
   // this.keyword = value;
  }

  ngOnInit() {
      this.productService.getProducts().subscribe(
        products => this.products = products
      );
      this.productService.searchEvent.subscribe(
        params => { this.productService.search(params).subscribe(
          products => this.products = products
        )}
      );
      this.productService.addEvent.subscribe(
        params => {
          //alert(JSON.stringify(params) );
          this.products = this.products.filter(item => item.id != params.id);
          this.products.unshift(params);
        }
      );
  }

  updateHotSpring(productId:number){
    let editProduct = this.products.filter(item => item.id == productId)[0];
    this.productService.updateEvent.emit(editProduct);

  }

  deleteHotSpring(productId:string){
    var msg = "您真的确定要删除吗？\n\n请确认！";
    if (confirm(msg)==false){
      return false;
    }

    this.productService.deleteHotSpring(productId).subscribe( 
      data=>{
        console.log(data);
        alert('删除成功，ok');
        let numProductId = +productId;
        this.products = this.products.filter(item=>item.id!=numProductId);
      },
      error=>alert("删除失败，error"),
      () => {
       // this.products = this.productService.getProducts();
      }
    );

    
  }

}


