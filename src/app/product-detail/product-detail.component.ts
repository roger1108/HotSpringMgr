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
  
  imageUrl:string;

  product: Product;

  comments: Comment[];
  
  hotSpringIntros: HotSpringIntro[];

  //hotSpringIntro: Observable<HotSpringIntro>;

  newRating:number = 5;

  newComment:string = "";

  newIntroPic:string = "";

  name:string ="";

  description:string ="";

  isCommentHidden = true;

  constructor(private routeInfo: ActivatedRoute,
    private productService: ProductService) { 

      let fb  = new FormBuilder();
      this.formModel = fb.group({
        name: ['', Validators.minLength(1)],
        description: ['', Validators.minLength(1)],
        url: ['', Validators.minLength(1)],
        imgUrl: ['', Validators.minLength(1)]
      });
    }

  ngOnInit() {
    let productId:number = this.routeInfo.snapshot.params["productId"];
   // this.product = this.productService.getProduct(productId);
      this.productService.getProduct(productId).subscribe(
        product => {
          this.product = product;   
          this.imageUrl=this.product.imgURL;
        }
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

  deleteIntro(id:string){
    var msg = "您真的确定要删除吗？\n\n请确认！";
    if (confirm(msg)==false){
      return false;
    }

    this.productService.deleteHotSpringIntro(id).subscribe( 
      data=>{
        console.log(data);
        alert('删除成功，ok');
        let numId = +id;
        this.hotSpringIntros = this.hotSpringIntros.filter(item=>item.id!=numId);
      },
      error=>alert("删除失败，error"),
      () => {
       // this.products = this.productService.getProducts();
      }
    );
  }

  addComment() {
    // let comment = new Comment(0,this.product.id, new Date().toISOString(), "some one" , this.newRating, this.newComment);
    // this.comments.unshift(comment);

    // let sum = this.comments.reduce((sum,comment) => sum + comment.rating, 0);
    // this.product.rating = sum / this.comments.length; 

    // this.newComment = null;
    // this.newRating = 5;
    // this.isCommentHidden = true;

    let hotSpringIntro = new HotSpringIntro(0,this.product.id, this.newComment, this.newIntroPic , "", this.newRating, this.name, this.description);
   
    let sum = this.hotSpringIntros.reduce((sum,hotSpringIntro) => sum + hotSpringIntro.rating, 0);
    this.product.rating = sum / this.hotSpringIntros.length; 

    //console.log(this.formModel.value);
    //this.productService.addHotSpringIntroEvent.emit(this.formModel.value);
    
     this.productService.addHotSpringIntro(hotSpringIntro).subscribe( 
       data=>{
         alert("添加成功,ok");
         hotSpringIntro.id = data.id;
         this.hotSpringIntros.unshift(hotSpringIntro);
        },
      error=>window.alert("添加失败，error"),
      () => {
      console.log('ok');
      this.productService.updateRatingOfHotSpring(this.product.id,this.product.rating).subscribe(

      );
      }
     )

    this.newComment = null;
    this.newIntroPic = null;
    this.newRating = 5;
    this.name="";
    this.description="";
    this.isCommentHidden = true;
  }

}
