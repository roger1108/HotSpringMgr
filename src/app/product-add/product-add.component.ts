
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ProductService, Product, Comment, HotSpringIntro } from '../shared/product.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from '../../../node_modules/_rxjs@5.5.6@rxjs/Observable';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

    formModel: FormGroup;
  
    product: Product;

    name:string;

    description:string;

    province:string;

    city:string;

    county:string;

    address:string;

    imgUrl:string;
  
    isCommentHidden = true;
  
    constructor(private productService: ProductService) { 
  
        let fb  = new FormBuilder();
        this.formModel = fb.group({
          name: ['', Validators.minLength(1)],
          description: ['', Validators.minLength(1)],
          province: ['', Validators.minLength(1)],
          city: ['', Validators.minLength(1)],
          county: ['', Validators.minLength(1)],
          address: ['', Validators.minLength(1)],
          imgUrl: ['', Validators.minLength(1)]
        });
      }
  
    ngOnInit() {

    }

    onAdd(){
      let product = new Product(null, this.name, 3 , "中华人民共和国", this.province, this.city, 
        this.county, this.address, this.description,this.imgUrl,"");
    

      this.productService.addHotSpring(product).subscribe( 
        data=>{console.log(data);alert('ok')},
        error=>alert("error")
        //() => alert('ok')
      )
      this.product=null;
      this.name=null;   
      this.description=null;  
      this.province=null; 
      this.city=null;
      this.county=null;
      this.address=null;
      this.imgUrl=null;  
      this.isCommentHidden = true;
    }

}
