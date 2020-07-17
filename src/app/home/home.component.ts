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
      if(this.link.startsWith("https://youtu.be")){
        this.embedLink=`https://www.youtube.com/embed/${this.link.substring(17)}`
      }
      else if(this.link.startsWith("https://m.youtube")){
        alert("Mobile Browser links are not Supported")
        location.reload()
      }
      else{
        this.embedLink=`https://www.youtube.com/embed/${this.link.substring(32)}`
      }
      console.log(this.embedLink)
      this.link=""
      this.loading=false
      this.content=true
    })
  }



}
