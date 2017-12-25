import { Component } from '@angular/core';
import * as $ from 'jquery';
import { environment } from '../environments/environment';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular入门实战';

  constructor(){
    console.log("微信号是"+environment.weixinNumber);
  }
}
