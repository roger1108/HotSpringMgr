import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { ProductComponent } from './product/product.component';
import { StarsComponent } from './stars/stars.component';;
import { CarouselComponent } from './carousel/carousel.component';
import { FooterComponent } from './footer/footer.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import {Routes, RouterModule} from "@angular/router";
import { ProductService } from './shared/product.service';
import { FilterPipe } from './pipe/filter.pipe';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ProductAddComponent } from './product-add/product-add.component';
import { HotSpringReserveComponent } from './hot-spring-reserve/hot-spring-reserve.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'hotSpringFindById/:productId', component: ProductDetailComponent},
  {path: 'hotSpringResFindById/:productId', component: HotSpringReserveComponent}
  
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    ProductComponent,
    StarsComponent,
    CarouselComponent,
    FooterComponent,
    ProductDetailComponent,
    HomeComponent,
    FilterPipe,
    ProductAddComponent,
    HotSpringReserveComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [ProductService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { 
  title='测试Angular';

  // test(){
  //     $("xxx").show( );
  // }
}
