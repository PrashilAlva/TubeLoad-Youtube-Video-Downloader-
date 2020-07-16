import { TubeServiceService } from './../tube-service.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  link:string;
  downloadLink:string;
  loading:boolean;
  content:boolean;
  embedLink:string;
  @ViewChild('result', { static: true }) result: ElementRef;

  constructor(private tubeService:TubeServiceService) { }

  ngOnInit() {
  }

  getDownloadLink():void{
    this.result.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" }); 
    this.loading=true
    this.content=false
    let data={
      "url":this.link
    }
    this.tubeService.getDownloadLink(data).subscribe((res)=>
    {
      this.downloadLink=res['url'];
      this.embedLink=`https://www.youtube.com/embed/${this.link.substring(32)}`
      this.link=""
      this.loading=false
      this.content=true
    })
  }



}
