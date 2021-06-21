import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GridsterItem, GridsterItemComponentInterface } from 'angular-gridster2';
import { AuthService } from 'src/app/service/auth.service';
import { PositionsService } from 'src/app/service/positions.service';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit {
  isjourny = true
  father_id: any;
  savedJourneysList: any;
  SelectedJourney: any;
  SelectedJourneyName: any
  AllJData: any;
  @Output() thisjourney = new EventEmitter();
  constructor(private http: HttpClient, private auth: AuthService) {
    this.auth.pdfFlag(false);
    this.auth.journeyDataFlag(false);
   }

  toggleclosebtn() {
    alert('hello');
    this.isjourny = !this.isjourny;
    this.thisjourney.emit({ status: false, isclose: 1 });
  }

  public show: boolean = false;
  public buttonName: any = 'Show';
  isShowDiv = true;
  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
  }

  ngOnInit() {
    this.father_id = localStorage.getItem("father_id");
    this.Savedjourneys();
    this.getAllJourneyData()
    // hiding the gridster untill positions are loaded

  }

  // onSelect(){
  //   this.thisjourney.emit({status:true,isclose:0});
  // //  alert("hello")
  // }
  jList: boolean = false

  Savedjourneys() {
    // this.http.get('http://localhost:8080/api/auth/savedJourneyScriptures/' + this.father_id )
    this.auth.getSavedJourneys(this.father_id)
      .subscribe(data => {
        this.savedJourneysList = data;
        this.SelectedJourneyName = this.savedJourneysList[0]?.JOUNEY_NAME;
        this.SelectedJourney = this.savedJourneysList[0];
        this.SelectedJourneyName = this.savedJourneysList[0]?.JOUNEY_NAME;
        console.log('savedJourneysList', data);
      })
  }

  // @Output() journeyOutput = new EventEmitter(); 

  getJourneyname(journey: any) {
    this.SelectedJourney = journey
    this.SelectedJourneyName = journey.JOUNEY_NAME;
    // this.journeyOutput.emit({journey : journey, status : 1 })
    this.auth.SelectedJourneyItems.next(journey)
    this.auth.pdfFlag(true);
    this.auth.journeyDataFlag(true);
  }

  getAllJourneyData() {
    this.auth.allJourneyData(this.father_id)
      .subscribe(data => {
        this.AllJData = data
        console.log('AllJData', this.AllJData);
   
        this.getcounts()
      })
  }

  AllJournetDataArray: JOURNEYarray[] = []


  getcounts() {
    let pdfobj: any
    let mp3Obj: any
    let ScriptObj: any
    for (let i = 0; i < this.savedJourneysList?.length; i++) {
      const journeyId = this.savedJourneysList[i].id;
      console.log(journeyId)
      const journeyItems = this.AllJData.filter((x: any) => x.JOURNEY_REFRENCE == journeyId);
      console.log(journeyItems)
      let mp3count = 0
      let pdfCount = 0
      let scripCount = 0
      for (let j = 0; j < journeyItems?.length; j++) {
        if (journeyItems[j].CONTENT_TYPE == 'mp3') {
          mp3count = mp3count + 1
        }
        if (journeyItems[j].CONTENT_TYPE == 'pdf') {
          pdfCount = pdfCount + 1
        }
        if (journeyItems[j].CONTENT_TYPE == 'scripture') {
          scripCount = scripCount + 1
        }

      }
      this.AllJournetDataArray.push({ pdf: pdfCount, mp3: mp3count, scriptures: scripCount })

      // this.AllJournetDataArray.push(journeyItems)

      // for(let j = 0 ; j < this.AllJData.length ; j++){
      //   if(journeyId == this.AllJData[j].JOURNEY_REFRENCE){
      //     if(this.AllJData[j].CONTENT_TYPE == 'pdf' || this.AllJData[j].CONTENT_TYPE == 'mp3' || this.AllJData[j].CONTENT_TYPE == 'scripture'){
      //        pdfobj = this.AllJData[i]
      //     }
      //     // if(this.AllJData[j].CONTENT_TYPE == 'mp3'){
      //     //   mp3Obj = this.AllJData[i]
      //     // }
      //     // if(this.AllJData[j].CONTENT_TYPE == 'scripture'){
      //     //  ScriptObj = this.AllJData[i]
      //     // }
      //     this.AllJournetDataArray.push({pdf: pdfobj,mp3:mp3Obj, scriptures: ScriptObj   })
      //   }
      // }
    }
    console.log(this.AllJournetDataArray)
    this.jList = true
  }

  NewJourneyName: any
  renamejourney(newJName: string) {
    // console.log(newJName)
    const body = {
      id: this.SelectedJourney.id,
      JOUNEY_NAME: newJName
    }
   // console.log(body)
    this.auth.RenameJourney(body).subscribe(data => {
      if (data == "1") {
        this.Savedjourneys()
        this.NewJourneyName = undefined
        this.IsRename = false;
        // const renamedItem= this.savedJourneysList.find((x:any)=> x.JOURNEY_NAME == newJName)
        // console.log(renamedItem)
        // this.auth.SelectedJourneyItems.next(renamedItem)
      }
    })
  }

  IsRename: boolean = false
  IsDublicate: boolean = false;
  ToggleRenamDuplicateWA(tab: string) {
    if (tab == 'rename') {
      this.IsRename = true
      this.IsDublicate = false
    }
    if (tab == 'dup') {
      this.IsRename = false
      this.IsDublicate = true
    }

  }
  deleteJourney(){
    
    if(this.SelectedJourney.id){
    this.auth.Journeydelete(this.SelectedJourney.id).subscribe(data => {
      if (data.status == "1") {
        this.Savedjourneys();
      }
    });
  } else {
    alert();
  }
}
  closeRenameDup() {
    this.IsRename = false
    this.IsDublicate = false

  }
  dublicateJourney(name: any, actionName: string) {
    console.log(this.SelectedJourney)
    const body = {
      father_id: this.father_id,
      jRef: this.SelectedJourney.id,
      Name: name,
      action: actionName
    }

    this.auth.dublicateJourney(body).subscribe(data => {
      //console.log(data)
      if (data == "1") {
        this.closeRenameDup()
        this.Savedjourneys()
        this.getcounts()

      }
    })
  }

}

export interface JOURNEYarray {
  pdf: any,
  mp3: any,
  scriptures: any
}