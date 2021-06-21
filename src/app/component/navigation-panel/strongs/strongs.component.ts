
import { Component, EventEmitter, OnInit, Output ,OnDestroy} from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
@Component({
    selector: 'app-strongs',
    templateUrl: './strongs.component.html',
    styleUrls: ['./strongs.component.css']
})
export class StrongsComponent implements OnInit,OnDestroy {
    isSearch= false

    toggleAddToDiv= false;
    pagelimit =5
    isShown: boolean = false; // hidden by default
    isstrong = true;
    @Output() thistrong = new EventEmitter();
    IsCollapse: boolean = false
    @Output() collapsethis = new EventEmitter();
    strongsList: any;
    versesList: any;
    searchResults: any;
    preResult: any;
    optResults = new Array();
    strong: any;
    StrongDataList: any;
    version: any
    listversre?: String;
    listStrong?: String;
    code: any;
    listverse: any;
    word: any;
    public show: boolean = false;
    public buttonName: any = 'Show';
    isShowDiv = true;
    appType: any;
    text: any;
    verse: any;
    father_id: any;
    meaning: any;
    message: any;
    noRecords: any;
    users:any;
    topologyNodes:any;
 
    showMessageBox= false

    constructor(private apiService: AuthService) {
       

    }
    private _broadSub: any
    Sversion:any
    ngOnInit() {
        this._broadSub=    this.apiService.SelectedStrong.subscribe(data=>{
            console.log(data)
            this.code = data.Scode
            this.Sversion = data.version
            this.word = data.word
            console.log(this.code)
            this.versesRelatedToStrong()

})



        // this.code = localStorage.getItem("code");
        // const strongData :any = localStorage.getItem("strong");

        //   this.strong = JSON.parse(strongData);
        
     

        

      
        // if(this.strong != undefined || this.strong != null  ){
        //     console.log(this.strong.strong)
        //     this.isSearch = true

        // // }
        // // if (this.strong = this.strong) {
        //     this.version = localStorage.getItem("version");
        //     console.log(JSON.stringify(this.strong));
        //     console.log(this.strong.strong + " " + this.version);
        //     this.apiService.fetchStrongData(this.strong.strong, this.version,this.pagelimit).subscribe((data) => {
        //         console.log(data);
        //         this.StrongDataList = data;
        //         this.strongsList = this.StrongDataList.strongs;
        //         this.versesList = this.StrongDataList.verses;
        //         console.log(this.strongsList)
        //         let i = 0;
        //         this.optResults = [];
        //         this.strongsList.forEach((response: any) => {
        //             let data: Result = ({ "key": response || "", "preview": this.extractContent(response, this.versesList[i]) || "" });
        //             this.optResults.push(data);
        //             i++;
        //         });
        //         this.versesList.forEach((response: any) => {
        //             let jd: any = JSON.stringify(response);
        //             this.listversre = jd;
        //         });
        //         console.log(this.optResults);
        //     })
        // }

    }

    ngOnDestroy() {
        this._broadSub.unsubscribe();
    }


   
    
    versesRelatedToStrong(){
        if(this.code != null || this.code != undefined){

            this.isSearch = false
            this.apiService.fetchVerse(this.Sversion, this.code, this.pagelimit).subscribe(data => {
                console.log(data)
                if (data == false) {
                    this.message = 'No Record Found  !';
                    this.noRecords = true;
                    this.listverse = [];
                }
                else {
                    this.listverse = data;
                    this.noRecords = false;
                    this.appType = 1;
                    //this.markDate();
                }
            }, err => {
                this.noRecords = true;
                this.listverse = [];
                if (this.listverse == this.listverse) {
                    this.message = 'No Record Found  !';
    
                }
                else {
                    this.message = 'No Record Found  !';
    
                }
            });
    
        }
    }

    extractContent(key: string, text: any) {
        let res = text.replace(key, '');
        return res; //new DOMParser().parseFromString(text, "text/html") . documentElement . textContent;

    }

    toggleclose() {
        // this.isstrong = !this.isstrong;
        this.thistrong.emit(false);
    }
    hide: any;

    toggleDisplayDiv() {
        this.isShowDiv = this.isShowDiv;
    }
    onSelect(key: any) {

        // this.strong = JSON.parse(localStorage.getItem("strong") || "");
        // key
        this.version = localStorage.getItem("version");
        localStorage.setItem("value", key);
        //console.log(this.strong + this.version);

        this.thistrong.emit({ status: true, isclose: 0 });
    }

    toggleShow() {    
        this.isShown = !this.isShown;
    }
    form: any = {};

    onSubmit(book :any , verse: any, text: any) {
        this.father_id = localStorage.getItem("father_id");
        this.meaning = text;
        this.verse =book + " " + verse;
        const body ={
            verse: this.verse,
            meaning: this.meaning,
            father_id: this.father_id,
            CONTENT_TYPE : "scripture"
          }
        this.apiService.workArea(body).subscribe((data) => {
            console.log(data);
            if(data == 1){
                let msg = "successfully added to work Area";
                this.showAlert(msg, '#87dc34')
        
              }
        })
    }
    savePersonalfav(text: any, verse: any) {
        this.father_id = localStorage.getItem("father_id");
        this.meaning = text;
        this.verse = verse;
        this.apiService.PersonalFav(this.meaning, this.verse, this.father_id).subscribe((personalfav) => {
            console.log(personalfav);
        })
    }
    savejourney(text: any, verse: any) {
        this.father_id = localStorage.getItem("father_id");
        this.meaning = text;
        this.verse = verse;
        this.apiService.Journey(this.meaning, this.verse, this.father_id).subscribe((journey) => {
            console.log(journey);
        })
    }

    // viewMore(){
    //     let PL = this.pagelimit +5;
    //     this.apiService.fetchVerse(this.code, PL).subscribe(data => {
    //         this.listverse = data
    //     })
    // }

    bgColor:any;
    showAlert(msg:any, bg : any){
      
      this.bgColor = bg
      // set showloader to true to show loading div on view
      this.showMessageBox   = true;
      this.message = msg
      setTimeout(()=> {
        this.showMessageBox = false;
      }, 1500);
    
    }

    toggleAddTo(){
        this.toggleAddToDiv = !this.toggleAddTo

    }
}



export interface Result {
    key: string;
    preview: string;
}