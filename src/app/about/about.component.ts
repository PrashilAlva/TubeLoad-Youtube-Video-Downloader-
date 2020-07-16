import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  name:string;

  greet():void{
    alert("Thank You "+this.name+" for your Feedback!")
  }

  ngOnInit() {
  }

}
