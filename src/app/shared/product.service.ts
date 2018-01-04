import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable} from "rxjs";
import 'rxjs/Rx';
import { URLSearchParams } from '@angular/http';
import { EventEmitter } from '@angular/core';



@Injectable()
export class ProductService {

 
  /*private products:Product[]= [
    new Product(1, '第一个商品', 1.99, 3.5, '这是第一个商品，是我在学习慕课网Angular入门实战时创建的', ['电子产品']),
    new Product(2, '第二个商品', 2.99, 2.5, '这是第二个商品，是我在学习慕课网Angular入门实战时创建的', ['电子产品', '硬件设备']),
    new Product(3, '第三个商品', 3.99, 4.5, '这是第三个商品，是我在学习慕课网Angular入门实战时创建的', ['电子产品']),
    new Product(4, '第四个商品', 4.99, 1.5, '这是第四个商品，是我在学习慕课网Angular入门实战时创建的', ['电子产品']),
    new Product(5, '第五个商品', 5.99, 3.5, '这是第五个商品，是我在学习慕课网Angular入门实战时创建的', ['电子产品']),
    new Product(6, '第五个商品', 6.99, 2.5, '这是第六个商品，是我在学习慕课网Angular入门实战时创建的', ['电子产品'])
  ];

  private comments:Comment[]=[
    new Comment(1,1,"2017-09-26 22:22:22","张三",5,"东西不错"),
    new Comment(2,1,"2017-03-26 22:22:22","李四",3,"东西是不错"),
    new Comment(3,1,"2017-04-26 22:22:22","王五",4,"东西很不错"),
    new Comment(4,2,"2017-05-26 22:22:22","赵六",2,"东西非常不错"),
  ]
 */
 // searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();
  searchEvent: EventEmitter<HotSpringSearchParams> = new EventEmitter();
  
//addHotSpringIntroEvent: EventEmitter<HotSpringIntroParams> = new EventEmitter();

  constructor(private http:Http) { }

  getAllCategories(): string[] {
    return ["北京","天津","上海","重庆","河北","山西","辽宁","吉林","黑龙江","江苏","浙江","安徽","福建","江西","山东","河南","湖北","湖南","广州","海南","四川","贵州","云南","陕西","甘肃","青海","台湾","内蒙古","广西","西藏","宁夏","新疆","香港","澳门"];
  }

  getProducts(): Observable<Product[]>{
    //return this.products;
    //return this.http.get("/api/products").map(res => res.json());
    //console.log( this.http.get("http://localhost:8080/api/products").map(res => res.json()));
    return this.http.get("/api/hotSpringFindAll").map((res) => {
      //alert(JSON.stringify(res.json().content));
      return res.json().content;
    });
    
  }

  getProduct(id:number):Observable<Product>{
    //return this.products.find((product)=>product.id==id);
    //return this.http.get("/api/products/"+id).map(res => res.json());
    return this.http.get("/api/hotSpringFindById/"+id).map(res => res.json());
  }

  getCommentsForProductId(id:number):Observable<Comment[]>{
    //return this.comments.filter((comment:Comment)=>comment.productId==id);
    return this.http.get("/api/products/"+id+"/comments").map(res => res.json());
  }

  updateRatingOfHotSpring(id:number,rating:number):any{
    return this.http.get("/api/updateRatingOfHotSpring/"+rating+"/"+id).map(res => res.json());
  }

  getHotSpringIntroForProductId(id:number):Observable<HotSpringIntro[]>{
    //return this.comments.filter((comment:Comment)=>comment.productId==id);
    return this.http.get("/api/hotSpring/"+id+"/intro").map(res => {
      //console.log(JSON.stringify(res.json()));
      return res.json();
    });
  }

  getHotSpringReserveForProductId(id:number):Observable<HotSpringReserve[]>{
    return this.http.get("/api/hotSpring/"+id+"/reserve").map(res => {
      return res.json();
    });
  }

  // search(params:ProductSearchParams):Observable<Product[]> {
  //     return this.http.get("/api/products", {search: this.encodeParams(params)}).map(res => res.json());
  // }


  // private encodeParams(params: ProductSearchParams) {
  //   return Object.keys(params)
  //   .filter(key  => params[key])
  //   .reduce((sum:URLSearchParams, key:string) => {
  //     sum.append(key, params[key]);
  //     return sum;
  //   },new URLSearchParams());
  // }

  search(params:HotSpringSearchParams):Observable<Product[]> {
    return this.http.get("/api/hotSprings", {search: this.encodeParams(params)}).map(res => res.json());
  }

  addHotSpringIntro(params:HotSpringIntro):Observable<HotSpringIntro> {
    return this.http.post("/api/addHotSpringIntro",null, {search: this.encodeHotSpringAddParams(params)}).map(res => res.json());
  }

  addHotSpringReserve(params:HotSpringReserve):Observable<HotSpringReserve> {
    return this.http.post("/api/addHotSpringReserve",null, {search: this.encodeHotSpringAddParams(params)}).map(res => res.json());
  }

  addHotSpring(params:Product):Observable<any> {
    return this.http.post("/api/addHotSpring",null,{search: this.encodeHotSpringAddParams(params)}).map(res => res.json());
  }

  deleteHotSpring(id:String):Observable<any> {
    return this.http.get("/api/deleteHotSpring/"+id).map(res => res.json());
  }

  deleteHotSpringIntro(id:String):Observable<any> {
    return this.http.get("/api/deleteHotSpringIntro/"+id).map(res => res.json());
  }

  deleteHotSpringReserve(id:String):Observable<any> {
    return this.http.get("/api/deleteHotSpringReserve/"+id).map(res => res.json());
  }

  private encodeParams(params: HotSpringSearchParams) {
    return Object.keys(params)
    .filter(key  => params[key])
    .reduce((sum:URLSearchParams, key:string) => {
      sum.append(key, params[key]);
      return sum;
    },new URLSearchParams());
  }




  private encodeHotSpringAddParams(params: any) {
    return  Object.keys(params)
    .filter(key  => params[key])
    .reduce((sum:URLSearchParams, key:string) => {
      sum.append(key, params[key]);
      return sum;
    },new URLSearchParams());
  }




}

export class ProductSearchParams {
    constructor(public title:string,
                public price: number,
                public category:string
    ){}
}

export class HotSpringSearchParams {
  constructor(public name:string,
              public province:string
  ){}
}



// export class Product {
//   constructor(public id: number,
//               public title: string,
//               public  price: number,
//               public rating: number,
//               public desc: string,
//               public categories: Array<string>) {
//   }
// }

export class Product {
  constructor(public id:number,
              public name:string,
              public rating :number,
              public nation:string,
              public province:string,
              public city:string,
              public county:string,
              public address:string,
              public description:string,
              public imgURL:string,
              public extend:string ) {

              }
}


export class Comment{
  constructor(public id:number,
              public productId:number,
              public timestamp:string,
              public user:string,
              public rating:number,
              public content:string){
  }
}

export class HotSpringIntro{
  constructor(public id:number,
              public hotSpringId:number,
              public url:string,
              public imageUrl: string,
              public extend: string,
              public rating: number,
              public name: string,
              public description:string){

  }
}

export class HotSpringReserve{
  constructor(public id:number,
              public hotSpringId:number,
              public startPrice:number,
              public name:string,
              public url:string,
              public priority: number){

  }
}
