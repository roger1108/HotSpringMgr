import { Component, OnInit, SimpleChanges } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { ProductService, Product, Comment, HotSpringIntro } from '../shared/product.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from '../../../node_modules/_rxjs@5.5.6@rxjs/Observable';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  formModel: FormGroup;

  product: Product;

  comments: Comment[];
  
  hotSpringIntros: HotSpringIntro[];

  hotSpringIntro: Observable<HotSpringIntro>;

  newRating:number = 5;

  newComment:string = "";

  newIntroPic:string = "";

  isCommentHidden = true;

  constructor(private routeInfo: ActivatedRoute,
    private productService: ProductService) { 

      let fb  = new FormBuilder();
      this.formModel = fb.group({
        url: ['', Validators.minLength(1)],
        imgUrl: ['', Validators.minLength(1)]
      });
    }

  ngOnInit() {
    let productId:number = this.routeInfo.snapshot.params["productId"];
   // this.product = this.productService.getProduct(productId);
      this.productService.getProduct(productId).subscribe(
        product => this.product = product
      );
   // this.comments = this.productService.getCommentsForProductId(productId);
   /*
      this.productService.getCommentsForProductId(productId).subscribe(
        comments => this.comments = comments
      );
      */
      this.productService.getHotSpringIntroForProductId(productId).subscribe(
        hotSpringIntros => this.hotSpringIntros = hotSpringIntros
      );


      // this.productService.addHotSpringIntroEvent.subscribe(
      //   params => {
      //     console.log(params);
      //     this.hotSpringIntro =this.productService.addHotSpringIntro(params);          
      //   }
      // );

  }

  addComment() {
    // let comment = new Comment(0,this.product.id, new Date().toISOString(), "some one" , this.newRating, this.newComment);
    // this.comments.unshift(comment);

    // let sum = this.comments.reduce((sum,comment) => sum + comment.rating, 0);
    // this.product.rating = sum / this.comments.length; 

    // this.newComment = null;
    // this.newRating = 5;
    // this.isCommentHidden = true;

    let hotSpringIntro = new HotSpringIntro(0,this.product.id, this.newComment, this.newIntroPic , "", this.newRating);
    this.hotSpringIntros.unshift(hotSpringIntro);
    let sum = this.hotSpringIntros.reduce((sum,hotSpringIntro) => sum + hotSpringIntro.rating, 0);
    this.product.rating = sum / this.hotSpringIntros.length; 

    //console.log(this.formModel.value);
    //this.productService.addHotSpringIntroEvent.emit(this.formModel.value);
    
     this.productService.addHotSpringIntro(hotSpringIntro).subscribe( data=>console.log(data),
      error=>window.alert("error"),
      () => {
      console.log('ok');
      this.productService.updateRatingOfHotSpring(this.product.id,this.product.rating).subscribe();
      }
     )




    this.newComment = null;
    this.newRating = 5;
    this.isCommentHidden = true;
  }

}
