import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductService, Product, HotSpringReserve } from '../shared/product.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from '../../../node_modules/_rxjs@5.5.6@rxjs/Observable';

@Component({
  selector: 'app-hot-spring-reserve',
  templateUrl: './hot-spring-reserve.component.html',
  styleUrls: ['./hot-spring-reserve.component.css']
})
export class HotSpringReserveComponent implements OnInit {

  formModel: FormGroup;

  product: Product;

  hotSpringReserves: HotSpringReserve[];

  priority:number =0;

  name:string;

  url:string;

  price:number =0;


  isCommentHidden = true;

  constructor(private routeInfo: ActivatedRoute,
    private productService: ProductService) {

    let fb = new FormBuilder();
    this.formModel = fb.group({
      name:['', Validators.minLength(1)],
      price:['', Validators.minLength(1)],
      priority:['', Validators.minLength(1)],
      url: ['', Validators.minLength(1)]
    });
  }

  ngOnInit() {
    let productId: number = this.routeInfo.snapshot.params["productId"];
    this.productService.getProduct(productId).subscribe(
      product => this.product = product
    );

    this.productService.getHotSpringReserveForProductId(productId).subscribe(
      hotSpringReserves => this.hotSpringReserves = hotSpringReserves
    );
  }

  deleteIntro(id: string) {

    var msg = "您真的确定要删除吗？\n\n请确认！";
    if (confirm(msg) == false) {
      return false;
    }
    this.productService.deleteHotSpringReserve(id).subscribe(
      data => {
        console.log(data);
        alert('删除成功，ok');
        let numId = +id;
        this.hotSpringReserves = this.hotSpringReserves.filter(item => item.id != numId);
      },
      error => alert("删除失败，error"),
      () => {
      }
    );
  }

  addReserve() {
    let hotSpringReserve = new HotSpringReserve(null, this.product.id, this.price, this.name,this.url, this.priority);
    this.productService.addHotSpringReserve(hotSpringReserve).subscribe(
      data => {
        alert("新增成功,ok");
        hotSpringReserve.id = data.id;
        this.hotSpringReserves.unshift(hotSpringReserve);
      },
      error => {
        window.alert("error"+JSON.stringify(error));
        console.log(error);
      },
      () => {
      }
    )

    this.url = null;
    this.price =0;
    this.priority =0;
    this.name =null;
    this.isCommentHidden = true;
  }

}