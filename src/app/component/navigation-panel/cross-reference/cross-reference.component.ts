import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-cross-reference',
  templateUrl: './cross-reference.component.html',
  styleUrls: ['./cross-reference.component.css']
})
export class CrossReferenceComponent implements OnInit, OnDestroy {


  iscorss = true;
  @Output() crossComp = new EventEmitter();

  constructor(private apiService: AuthService) { }
  strong: any;
  version: any;
  reference: any;
  strongsList: any;
  versesList: any;
  searchResults: any;
  preResult: any;
  optResults = new Array();
  StrongDataList: any;
  listversre?: String;
  listStrong?: String;
  CrossDataList: any;
  value: any;
  father_id:any
  private _broadSub: any
  ngOnInit() {
    this.father_id = localStorage.getItem("father_id");
    this._broadSub = this.apiService.SelectedCrossRefData.subscribe(data=> {
  console.log(data)
  this.version = data.main
      const bookRef = data.division + "." + data.topic_no;
      console.log(bookRef)
      this.getCr(this.version, bookRef)
  // this.CRdata()
})



    // this.strong = JSON.parse(localStorage.getItem("strong") || "");
    // this.version = localStorage.getItem("version");
    this.value = this.strong.value; //localStorage.getItem("value")


    console.log(this.version + "  " + this.value + "  " + this.reference);
  
  }

  getCr(version:any, bookref:any){
    this.apiService.fetchCroessData(version, bookref).subscribe(data => {
      console.log(data)
      this.CrossDataList = data;
      this.strongsList = this.CrossDataList.strongs;
      this.versesList = this.CrossDataList.verses;
      console.log(this.strongsList)
      let i = 0;
      this.optResults = [];
      this.strongsList.forEach((response: any) => {
        let data: Result = ({ "key": response || "", "preview": this.extractContent(response, this.versesList[i]) || "" });
        this.optResults.push(data);
        i++;
      });
  
      this.versesList.forEach((response: any) => {
        let jd: any = JSON.stringify(response);
        this.listversre = jd;
      });
  
      console.log(this.optResults);
    })
  }

  ngOnDestroy(){
    this._broadSub.unsubscribe();
  }

CRdata(){
  this.apiService.fetchCroessData(this.version, this.value).subscribe((data) => {
    console.log(data);
    this.CrossDataList = data;
    console.log(this.CrossDataList)
    this.strongsList = this.CrossDataList.strongs;
    this.versesList = this.CrossDataList.verses;
    console.log(this.strongsList)
    let i = 0;
    this.optResults = [];
    this.strongsList.forEach((response: any) => {
      let data: Result = ({ "key": response || "", "preview": this.extractContent(response, this.versesList[i]) || "" });
      this.optResults.push(data);
      i++;
    });

    this.versesList.forEach((response: any) => {
      let jd: any = JSON.stringify(response);
      this.listversre = jd;
    });

    console.log(this.optResults);

  })
}


  extractContent(key: string, text: any) {
    let res = text.replace(key, '');
    return res; //new DOMParser().parseFromString(text, "text/html") . documentElement . textContent;

  }

  toggleclose() {
    //this.iscorss = !this.iscorss;
    this.crossComp.emit(false);
  }
  isShown: boolean = false; // hidden by default
  toggleShow() {
    this.isShown = !this.isShown;

  }


  @Output() addedToWorkArea :any = new EventEmitter();
  // onSubmit(ss:any) {
  //  console.log(ss)
  //   // this.father_id = localStorage.getItem("father_id");
  //   // this.meaning = text;
  //   // this.verse =book + " " + verse;
  //   const body ={
  //     verse: ss.key,
  //     meaning: ss.preview,
  //     father_id: this.father_id,
  //     CONTENT_TYPE : "scripture"
  //   }
  //   this.apiService.workArea(body).subscribe((data) => {
  //     console.log(data);
  //     if(data == 1){
  //       let msg = "successfully added to work Area";
  //       this.showAlert(msg, '#87dc34')
  //       // this.apiService.workarealist(this.father_id)
  //       this.addedToWorkArea.emit(1)

  //     }
  //   })
  // }
  onSubmit(bookVerse :any, text: any) {
   
    this.father_id = localStorage.getItem("father_id");
    // this.meaning = text;
    //  this.verse =bookVerse
    const body ={
      verse: bookVerse,
      meaning: text,
      father_id: this.father_id,
      CONTENT_TYPE : "scripture"
    }
    this.apiService.workArea(body).subscribe((data) => {
      console.log(data);
      if(data == 1){
        let msg = "successfully added to work Area";
        this.showAlert(msg, '#87dc34')
        // this.apiService.workarealist(this.father_id)
        this.addedToWorkArea.emit(1)

      }
    })
  }
  
  bgColor:any;
  showMessageBox= false
  message:any
  showAlert(msg:any, bg : any){
    
    this.bgColor = bg
    // set showloader to true to show loading div on view
    this.showMessageBox   = true;
    this.message = msg
    setTimeout(()=> {
      this.showMessageBox = false;
    }, 1500);
  
  }

}
export interface Result {
  key: string;
  preview: string;
}