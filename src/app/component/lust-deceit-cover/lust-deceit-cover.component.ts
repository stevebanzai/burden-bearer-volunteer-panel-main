import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-lust-deceit-cover',
  templateUrl: './lust-deceit-cover.component.html',
  styleUrls: ['./lust-deceit-cover.component.css']
})
export class LustDeceitCoverComponent implements OnInit {
  isDisplay = false;
  @Output() thislustdecit = new EventEmitter();
  toggleclosebtn(){
    this.thislustdecit.emit(false);
  }
  IsCollapse: boolean = false
  @Output() collapshaeder = new EventEmitter();

  somefunction() {
    this.IsCollapse = !this.IsCollapse;
    this.collapshaeder.emit(this.IsCollapse);
  }

JourneyData : any
JourneyScripts:any
SelectedJorney :any
showDelete = false


  constructor(private auth : AuthService , private router : Router) {
    this.auth.pdfDisplay.subscribe(message => {
      console.log('isDisplay dpf', message);
      this.isDisplay = message;
    });
    this.auth.SelectedJourneyItems.subscribe(data => {
      this.SelectedJorney = data
      this.JourneyScriptsData(this.SelectedJorney)
    });

   }

  ngOnInit(): void {
  }
  // onSelect() {
  //   this.thislustdecit.emit({status:true,isclose:0});
  // }

  JourneyScriptsData(journey : any){
    this.auth.getSelectedJourneydata(journey.FATHER_ID, journey.id).subscribe(jD => {
      this.JourneyData = jD
      this.JourneyScripts = this.JourneyData.filter((x:any) => x.CONTENT_TYPE == 'scripture') 
      console.log(jD)
      })
  }

toggleDelete(){
  this.showDelete = !this.showDelete
}

deleteJourneyItem(script:any){
  console.log(script)
  this.auth.WorkAreadelete(script.id).subscribe(data => {
    if(data.message == "Work area note  was deleted successfully!"){
     this.JourneyScriptsData(this.SelectedJorney)
    }
   
  })
}

}
