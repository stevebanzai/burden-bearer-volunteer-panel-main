import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-pdf-quotes',
  templateUrl: './pdf-quotes.component.html',
  styleUrls: ['./pdf-quotes.component.css']
})
export class PdfQuotesComponent implements OnInit {

  ispdf = true;
  @Output() pdfComp = new EventEmitter();

  show = true
  newTestament: boolean = false;
  oldTestament: boolean = false;
  chapterList = false;
  SearchHeader = false;
  PrevButton = false;
  nextButton= true;
  bookFullName:any
  // counter :any;
  chapterCount : number = 0
  showBible= true;
  chapterListData:any =[];
  element: any[] = [];
isShowDiv1 = true;
book: any;
number: boolean = false;
number1: boolean = false;
number3: boolean = true;
version ="ESV"
chapter: any;
heading: boolean = false;
isShown: boolean = false; 
countLimit :any =9; //next page increse
uploadTab = false;


uploadTestament:any
uploadBook :any 
uploadChapter : any
uploadFile : any;
uploadPdfname : any

volunteerId:any

  
  constructor(private authSrvc : AuthService) { }

  ngOnInit() {
    this.volunteerId= localStorage.getItem("father_id")
  }

  togglecloseb(){

   this.pdfComp.emit(false);
 }

 toggle() {
  this.show = !this.show;
 }

 SelectedTestament :any 

 toggleTestament(tab: number) {
  this.oldTestament= true
  this.showBible= true;
  console.log(tab);
  if (tab == 1) {
    // this.oldTestament = !this.oldTestament;
    // this.newTestament = false;
    this.chapterList = false

    this.SelectedTestament ="OT"
  }
  if (tab == 2) {
    // this.newTestament = !this.newTestament;
    // this.oldTestament = false;
    this.chapterList = false

    this.SelectedTestament ="NT"
  }

  this.getbiblebooks();
}
allbibleChapters:any
getbiblebooks(){
  this.authSrvc.getBibleBooksChapters(this.SelectedTestament).subscribe(data=>{
  this.allbibleChapters = data  
  console.log(this.allbibleChapters)
  })
}


toggleDisplayDiv1(bookNAme: any,number:any) {
  this.SearchHeader = false;
  this.PrevButton = false;
  this.nextButton = true
  this.chapterCount = 0;
  this.chapterListData=[];
  // this.recordsLimit = 0;
  this.element =[];
  this.chapterCount = number;
   console.log(this.chapterCount)
  this.chapterList = true;
  this.isShowDiv1 = !this.isShowDiv1;
//  this.element = [];
  this.book = bookNAme;
 
  for (let i = 1; i <= this.chapterCount; i++) {
     let pushcount = 9
    this.element[i] = i;
    if(i <= pushcount){
      this.chapterListData.push(i)
    }      
     console.log(this.element[i]);
  }
  // this.counter = 9
}

toogelheader() {
  this.SearchHeader = false;
  this.number1 = !this.number1;
  this.number1 = true
  this.number = false;
  this.isShowDiv1 = false
  this.number3=false;
}
pervious(): void {
  if (this.chapter >= 1) {
    this.chapter--;
  }

}
toggleShow() {
  this.isShown = !this.isShown;
}

next(): void {
  this.chapter++;
}

prevChapters(){
  let arrayCount = this.chapterListData[this.chapterListData.length -1]; //50
  let firstIndex = this.chapterListData[0]      //41
  let reductionLimit = firstIndex - 9 //41
  console.log("AC", arrayCount, )
  console.log("FI",firstIndex)
   console.log("RL" ,reductionLimit)
 
  // this.chapterListData = this.element.slice(arrayCount - reductionLimit +1, firstIndex)
  // console.log(this.chapterListData)
  // let arrayCount = this.chapterListData[this.chapterListData.length -8];
  // this.chapterListData =[];
  if(reductionLimit == 1){
    this.PrevButton = false
    this.nextButton= true;
  }
  if(reductionLimit < 1){
  
    // alert();
  }else{
    this.chapterListData = [];
    for(let i = reductionLimit;i < this.element[firstIndex] ;i++ ){
      this.chapterListData.push(this.element[i]);
    }
  }
 
   
}
nextChapters(){
  this.PrevButton = true
  let arrayCount = this.chapterListData[this.chapterListData.length -1];
  let last_index = arrayCount - 1;
  
  console.log("lindex",last_index)
  console.log("AC",arrayCount)
  console.log("CL",this.countLimit)
 if(this.countLimit >= this.chapterCount){
   this.nextButton = false
  // this.countLimit = 9
  // alert();
 }else{
  this.chapterListData =[];
  for(let i=arrayCount+1;i<arrayCount +10;i++){
    this.chapterListData.push(this.element[i])
    if(i == this.countLimit) break;
    console.log(this.chapterListData)
  }
  this.countLimit = arrayCount + 9 // 0 9 18 27 36 45 54
 }
  
 

  // for(let i=this.counter+1;i<this.element.length;i++)
  // {
  // this.chapterListData.push(this.element[i]);
  // if(i%9==0) break;
  // }
  // this.counter+=9;
  
}

toggleUpload(){
  this.uploadTab =!this.uploadTab;
}

handleFileInput(file : FileList){
this.uploadFile = file.item(0);
console.log(this.uploadFile)
}

// saveFile(){
//   this.authSrvc.postFile(this.uploadTestament, this.uploadBook, this.uploadChapter, this.uploadPdfname, this.uploadFile)

// }
bookChapters(book:string){
  this.chapterListData =[]
  this.chapterList = true
 const bookData = this.allbibleChapters.find((x:any )=> x.BOOK_ABBR == book )
 console.log(bookData)
 this.book = bookData.BOOK_ABBR
 this.bookFullName =bookData.BOOK
 this.chapterCount =  bookData.CHAPTER_COUNT
 for (let i = 1; i <= bookData.CHAPTER_COUNT; i++) {
   let pushcount = 9
  this.element[i] = i;
  if(i <= pushcount){
    this.chapterListData.push(i)
  }      
   // console.log(this.element[i]);
}
}

// changeBibleversion(){
//   console.log(this.version)
//   let RecordLimit = 0
//   this.authSrvc.getBible(this.SelectedTestament, this.version, this.book, this.chapter,RecordLimit).subscribe((message) => { 
//     this.BibleVerses = message
//   })

// }
collapse: boolean = false;
BiblePdfs:any
hideVerses: boolean = true;
hideSearch: boolean = true;

getPdf(Chapter: any) {
  this.SearchHeader= false
  this.oldTestament = false;
  this.newTestament = false;
  this.chapterList = false;
  this.collapse = false;

  this.chapter = Chapter;
  // console.log(start)
  console.log(Chapter)
  let RecordLimit = 0
  let headers = new Headers();
  //let headers = new HttpParams();
// headers.append('Content-Type', 'text');
// headers.append('VERSION', this.version);
// headers.append('TESTAMENT', this.SelectedTestament);
// headers.append('BOOK', this.book);
// headers.append('CHAPTER', this.chapter);
// headers.append('FATHER_ID', this.volunteerId);

  this.authSrvc.getPdfQuotes(this.version,this.SelectedTestament, this.book,this.chapter, this.volunteerId).subscribe(message => {
    this.BiblePdfs = message;
    console.log(this.BiblePdfs);
    this.hideVerses = false;
    this.hideSearch = true;
  this.heading = true;

    // this.oldTestament = !this.oldTestament;
    // this.newTestament = !this.newTestament
    // this.chapterList = false;

  })
}


@Output() pdfQutoesOutput :any = new EventEmitter();
onSubmit(book :any,chapter: any, pdfLabel: any, path:any) {
 
  // this.father_id = localStorage.getItem("father_id");
  // this.meaning = text;
  let verse =book + " " + chapter;
  const body ={
    verse: verse,
    meaning: pdfLabel,
    father_id: this.volunteerId,
    CONTENT_TYPE : "pdf",
    URL : path
  }

  this.authSrvc.workArea(body).subscribe((data) => {
    console.log(data);
    if(data == 1){
      let msg = "successfully added to work Area";
       this.showAlert(msg, '#87dc34')
      // this.apiService.workarealist(this.father_id)
      this.pdfQutoesOutput.emit(1)

    }
  })
}


bgColor:any;
showMessageBox :boolean = false
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
