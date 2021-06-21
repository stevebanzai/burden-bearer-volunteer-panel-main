
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { outputs } from '@syncfusion/ej2-angular-calendars/src/calendar/calendar.component';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-bible',
  templateUrl: './bible.component.html',
  styleUrls: ['./bible.component.css']
})
export class BibleComponent implements OnInit {
  bibleBooks: any
  SelectedTestament: any


  bookName: any;
  showBible = true;
  chapterList = false;
  pageCountSchema: number = 10
  recordsLimit: number = 0
  SearchRecordLimit = 0;
  verseText: any;
  chapterListData: any = [];
  counter: any;
  chapterCount: number = 0
  countLimit: any = 9; //next page increse
  SearchHeader = false;
  PrevButton = false;
  nextButton = true

  showMessageBox = false;
  message: any

  book: any;
  bookFullName: any
  strong: any;
  chapter: any;
  version = "ESV";
  chapternext: number = +1;
  isbible = true;
  strongs = false;
  strongsList: any;
  versesList = [];
  sts = new Array();
  selectedVerse: string = "";
  selectedVerseMessage: string = "";
  collapse: boolean = false;
  @Output() isbiblecom = new EventEmitter();
  form: any = {};
  newTestament: boolean = false;
  oldTestament: boolean = false;
  collpsemenu: boolean = false;
  public show: boolean = false;
  public buttonName: any = 'Show';
  isShowDiv = true;
  public show1: boolean = false;
  public buttonName1: any = 'Show';
  isShowDiv1 = true;
  public show2: boolean = false;
  public buttonName2: any = 'Show';
  isShowDiv2 = true;
  searchQuery = "";
  searchResults: any;
  preResult: any;
  optResults = new Array();
  BibleVerses: any
  number: boolean = false;
  number1: boolean = false;
  hideVerses: boolean = true;
  hideSearch: boolean = true;
  number3: boolean = true;

  i: any;
  verse: any;
  word: any;
  heading: boolean = false;
  headingsearch: boolean = false;
  element: any[] = [];
  value: any;
  registerForm: any;
  isShown: boolean = false; // hidden by default
  father_id: any;
  meaning: any;
  favid: any;
  ArrowHideShow: boolean = false;
  constructor(private apiService: AuthService) {
    this.counter = 0;
  }
  ngOnInit() {
    this.favid = localStorage.getItem('favid');
    // this.recordsLimit = 0

  }
  togglecloseb() {
    this.isbiblecom.emit(false);
  }
  toggleTestament(tab: number) {
    this.SearchHeader = false
    this.oldTestament = true
    this.showBible = true;
    this.searchQuery = ""
    console.log(tab);
    if (tab == 1) {
      // this.oldTestament = !this.oldTestament;
      // this.newTestament = false;
      this.chapterList = false;
      this.SelectedTestament = "OT"

    }
    if (tab == 2) {
      // this.newTestament = !this.newTestament;
      // this.oldTestament = false;
      this.chapterList = false
      this.SelectedTestament = "NT"
    }
    this.getbiblebooks()
    this.updateToggle()
    this.bibleVerseOutput.emit(false);
    this.openCrossRef.emit(false);
  }
  toogelehide() {
    this.number = !this.number;
    this.number = true
    this.number1 = false
    this.isShowDiv1 = true

  }
  showTestimentToggle: boolean = true
  toggle() {
    this.showTestimentToggle = !this.showTestimentToggle
    // this.show = !this.show;
    // if(this.oldTestament == true){
    //   this.oldTestament = false;
    //   this.newTestament = false
    // }
    // else{
    //   this.oldTestament = true;
    // }
    // if(this.newTestament == true){
    //   this.oldTestament = false;
    //   this.newTestament = false
    // }
    // else{
    //   this.newTestament = true
    // }



    // CHANGE THE NAME OF THE BUTTON.
    //   if(this.show)  {
    //   this.number3=false
    //     this.buttonName = "Hide";
    //   }
    //   else{
    //     this.buttonName = "Show";
    //     this.number3=true
    // }
  }
  toogelheader() {
    this.SearchHeader = false;
    this.number1 = !this.number1;
    this.number1 = true
    this.number = false;
    this.isShowDiv1 = false
    this.number3 = false;
  }
  toggleDisplayDiv() {
    this.isShowDiv = this.isShowDiv;
  }
  toggleOtNt() {
    this.hideVerses = false
    this.collpsemenu = !this.collpsemenu;
    this.collpsemenu = false
    this.number1 = false
    this.oldTestament = false;

  }
  toggleSearch(tab: number) {
    console.log(tab + "   " + this.hideVerses + "  " + this.hideSearch);
    if (tab === 1) {
      this.hideVerses = true;
      this.hideSearch = false;
    } else if (tab === 2) {
      this.hideVerses = true;
      this.hideSearch = false;

    }
  }

  toggleDisplayDiv1(bookNAme: any, number: any) {
    this.SearchHeader = false;
    this.PrevButton = false;
    this.nextButton = true
    this.chapterCount = 0;
    this.chapterListData = [];
    // this.recordsLimit = 0;
    this.element = [];
    this.chapterCount = number;
    console.log(this.chapterCount)
    this.chapterList = true;
    this.isShowDiv1 = !this.isShowDiv1;
    //  this.element = [];
    this.book = bookNAme;

    for (let i = 1; i <= this.chapterCount; i++) {
      let pushcount = 9
      this.element[i] = i;
      if (i <= pushcount) {
        this.chapterListData.push(i)
      }
      console.log(this.element[i]);
    }
    // this.counter = 9
  }



  toggleDisplayDiv2() {

    this.isShowDiv2 = !this.isShowDiv2;
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }
  next(): void {
    this.chapter++;
    console.log(this.chapterCount)
    if (this.chapter <= this.chapterCount) {
      this.getBibele(this.chapter)
    }
    else {
      this.chapter--
    }
    this.updateToggle()
  }
  pervious(): void {
    this.chapter--;
    if (this.chapter > 0) {
      this.getBibele(this.chapter)
    }
    else {
      this.chapter++
    }
    this.updateToggle()

  }
  selectstrong: any;

  getStrong(verse: any, text: any) {
    // alert('getStrong');
    this.showBible = false
    this.verse = verse;
    this.verseText = text
    console.log(verse)
    const versetring = JSON.stringify(verse)
    const verseSplit = versetring.substr(versetring.lastIndexOf(".") + 1);
    var str = verseSplit.replace('"', '');
    console.log(str)
    console.log(verseSplit)
    const body = {
      type: this.version,
      book: this.book,
      chapter: this.chapter,
      verse: str
    }
    console.log(body)

    this.apiService.getStrong(body).subscribe((data) => {
      this.strongsList = data;
      console.log(data)
      localStorage.setItem("version", this.version);
      this.collapse = true;

      const singlagedata = this.BibleVerses.find((x: { verse: any; }) => x.verse === verse);
      console.log(singlagedata)
      // this.selectstrong = singlagedata.text;
      console.log(this.strongsList);
      if (this.strongsList == 0) {
        this.strong = !this.strong;
      }
      else {
        this.strong = true
      }
    })
  }

  //   book: "GEN"
  // chapter: 1
  // type: "ESV"
  // verse: "1"

  getstrongsFromSearch(item: any) {
    //     key: "Isa 57:5"
    // preview: " you who burn with lust among  the oak
    console.log(item)
    const topicNumber = (item.key.substr(item.key.indexOf(' ') + 1)).replace(':', '.');
    const chapter = topicNumber.split(".")[0] //11
    const book = item.key.substr(0, item.key.indexOf(' '))
    console.log(chapter)
    this.book = book

    this.showBible = false
    this.verse = topicNumber;
    this.verseText = item.preview
    // console.log(verse)
    // const versetring = JSON.stringify(topicNumber)
    const verseSplit = topicNumber.substr(topicNumber.lastIndexOf(".") + 1);
    console.log(verseSplit) //16
    const body = {
      type: this.version,
      book: book,
      chapter: chapter,
      verse: verseSplit
    }
    console.log(body)

    this.apiService.getStrong(body).subscribe((data) => {
      this.strongsList = data;
      console.log(data)
      localStorage.setItem("version", this.version);
      this.collapse = true;

      const singlagedata = this.BibleVerses.find((x: { verse: any; }) => x.verse === topicNumber);
      console.log(singlagedata)
      this.selectstrong = singlagedata.text;
      console.log(this.strongsList);
      if (this.strongsList == 0) {
        this.strong = !this.strong;
      }
      else {
        this.strong = true
      }
    })

  }
  search() {
    this.SearchHeader = true;
    this.heading = false
    console.log(this.searchQuery)

    this.SearchRecordLimit = this.SearchRecordLimit + this.pageCountSchema
    // console.log(this.searchQuery + " " + this.version);
    this.apiService.fetchBibleData(this.searchQuery, this.version, this.pageCountSchema, this.SearchRecordLimit).subscribe((message) => {
      this.searchResults = message.json.results;
      console.log(this.searchResults)
       if (message.length != 0) {
        this.ArrowHideShow = true;
      

      }

      console.log(this.ArrowHideShow);
      this.preResult = message.jsonresponse;
      this.strongsList = message.strongs;
      this.versesList = message.verses;
      this.value = message.verses;
      console.log(this.value.value)
      let i = 0;
      this.optResults = [];
      this.searchResults.forEach((response: any) => {
        let jd: any = JSON.stringify(response);
        let data: Result = ({ "key": response.key || "", "preview": this.extractContent(response.key, this.preResult[i]) || "" });
        this.optResults.push(data);
        i++;
      });
      console.log(this.optResults)
     

      localStorage.removeItem("code")


      this.hideVerses = true;
      this.hideSearch = false;
    });
  }

  extractContent(key: string, text: any) {
    let res = text.replace(key, '');
    return res; //new DOMParser().parseFromString(text, "text/html") . documentElement . textContent;

  }

  toggleStrong(index: any) {
    let query = this.optResults[index].key;
    this.sts = this.strongsList.filter(function (element: any) {
      return element.verse == query;
    });
    this.selectedVerse = query;

    this.selectedVerseMessage = this.optResults[index].preview;
    this.collapse = true;
  }
  updateToggle() {
    this.collapse = false;
    this.showBible = true
  }
  onSelect(strong: any) {
    this.isbiblecom.emit({ status: true, isclose: 0 });
    localStorage.setItem("version", this.version);
    localStorage.setItem("strong", JSON.stringify(strong));
  }

  getBibele(Chapter: any) {
    this.SearchHeader = false
    this.oldTestament = false;
    this.newTestament = false;
    this.chapterList = false;
    this.collapse = false;

    this.chapter = Chapter;
    // console.log(start)
    console.log(Chapter)
    let RecordLimit = 0
    this.apiService.getBible(this.SelectedTestament, this.version, this.book, this.chapter, RecordLimit).subscribe((message) => {
      this.BibleVerses = message;
      console.log(message)
      if (  this.BibleVerses.length != 0) {
        this.ArrowHideShow = true;

      }
      console.log(this.BibleVerses);
      this.hideVerses = false;
      this.hideSearch = true;
      this.heading = true;

      // this.oldTestament = !this.oldTestament;
      // this.newTestament = !this.newTestament
      // this.chapterList = false;

    })
  }

  changeBibleversion() {
    console.log(this.version)
    let RecordLimit = 0
    this.apiService.getBible(this.SelectedTestament, this.version, this.book, this.chapter, RecordLimit).subscribe((message) => {
      this.BibleVerses = message
    })

  }

  @Output() bibleVerseOutput = new EventEmitter();

  onVerse(code: any, word: string) {
    // this.isbiblecom.emit({ status: false, isclose: 1 });
    localStorage.setItem("code", code);
    localStorage.removeItem('strong');

    this.apiService.SelectedStrong.next({ Scode: code, version: this.version, word: word })
    this.bibleVerseOutput.emit(true)
  }

  get f() { return this.registerForm.controls; }

  @Output() addedToWorkArea: any = new EventEmitter();
  onSubmit(bookVerse: any, text: any) {
    this.father_id = localStorage.getItem("father_id");
    this.meaning = text;
    this.verse = bookVerse
    const body = {
      verse: this.verse,
      meaning: this.meaning,
      father_id: this.father_id,
      CONTENT_TYPE: "scripture"
    }
    this.apiService.workArea(body).subscribe((data) => {
      console.log(data);
      if (data == 1) {
        let msg = "Work area added successfully.";
        this.showAlert(msg, '#87dc34')
        // this.apiService.workarealist(this.father_id)
        // this.addedToWorkArea.emit(1)
        this.apiService.AddtoworkAreaBibleVerse.next({ body })

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



  // changedPageLOadSchema(param:any){
  //   console.log(param)
  //   // let pagelimit = 0
  //   // if(param == 'viewMore'){
  //   //   // console.log(this.recordLimit)
  //   //   let rL = this.recordsLimit + this.pageCountSchema;

  //   //   this.recordsLimit = rL;
  //   //    console.log( this.recordsLimit)
  //   //    console.log(rL)
  //   //    console.log(this.pageCountSchema)
  //   // }\

  //   if(this.pageCountSchema == 10){
  //     this.pageCountSchema =10;
  //     console.log(1000)
  //   }
  //   if(this.pageCountSchema == 20){
  //     this.pageCountSchema =20;
  //     console.log(2000)

  //   }
  //   if(this.pageCountSchema == 50){
  //     this.pageCountSchema =50;
  //     console.log(5000)

  //   }

  //     this.recordsLimit = this.pageCountSchema;


  // if(this.chapter > 0){
  //   console.log(this.chapter)
  //   this.apiService.getBible(this.version, this.book, this.chapter, this.pageCountSchema,this.recordsLimit ).subscribe((message) => {
  //     this.BibleVerses = message;
  //     console.log(this.BibleVerses);
  //     this.hideVerses = false;
  //     this.hideSearch = true;
  //     this.heading = true;
  //   })
  // }else{
  //   alert()
  // }
  // }
  // changedPageLOadSchema1(){
  //   if(this.pageCountSchema == 10){
  //     this.pageCountSchema =10;
  //     console.log(1000)
  //   }
  //   if(this.pageCountSchema == 20){
  //     this.pageCountSchema =20;
  //     console.log(2000)

  //   }
  //   if(this.pageCountSchema == 50){
  //     this.pageCountSchema =50;
  //     console.log(5000)

  //   }
  //   this.recordsLimit = this.recordsLimit + this.pageCountSchema;
  //   console.log(this.recordsLimit)
  //   if(this.chapter > 0){
  //     this.apiService.getBible(this.version, this.book, this.chapter, this.pageCountSchema,this.recordsLimit ).subscribe((message) => {
  //       this.BibleVerses = message;
  //       console.log(this.BibleVerses);
  //       this.hideVerses = false;
  //       this.hideSearch = true;
  //       this.heading = true;
  //     })
  //   }
  // }


  nextChapters() {
    this.PrevButton = true
    let arrayCount = this.chapterListData[this.chapterListData.length - 1];
    console.log(arrayCount)
    let last_index = arrayCount - 1;

    console.log("lindex", last_index)
    console.log("AC", arrayCount)
    console.log("CL", this.countLimit)
    if (this.countLimit >= this.chapterCount) {
      this.nextButton = false
      // this.countLimit = 9
      // alert();
    } else {
      this.chapterListData = [];
      for (let i = arrayCount + 1; i < arrayCount + 10; i++) {
        this.chapterListData.push(this.element[i])
        if (i == this.countLimit) break;
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

  prevChapters() {
    let arrayCount = this.chapterListData[this.chapterListData.length - 1]; //50
    let firstIndex = this.chapterListData[0]      //41
    let reductionLimit = firstIndex - 9 //41
    console.log("AC", arrayCount,)
    console.log("FI", firstIndex)
    console.log("RL", reductionLimit)

    // this.chapterListData = this.element.slice(arrayCount - reductionLimit +1, firstIndex)
    // console.log(this.chapterListData)
    // let arrayCount = this.chapterListData[this.chapterListData.length -8];
    // this.chapterListData =[];
    if (reductionLimit == 1) {
      this.PrevButton = false
      this.nextButton = true;
    }
    if (reductionLimit < 1) {

      // alert();
    } else {
      this.chapterListData = [];
      for (let i = reductionLimit; i < this.element[firstIndex]; i++) {
        this.chapterListData.push(this.element[i]);
      }
    }


  }

  bgColor: any;
  showAlert(msg: any, bg: any) {

    this.bgColor = bg
    // set showloader to true to show loading div on view
    this.showMessageBox = true;
    this.message = msg
    setTimeout(() => {
      this.showMessageBox = false;
    }, 1500);

  }
  @Output() togglecomponentBody = new EventEmitter();
  compbodyToggle = false;
  togleComponentbody() {
    this.compbodyToggle = !this.compbodyToggle
    if (this.compbodyToggle == false) {
      this.togglecomponentBody.emit(true)
    } else {
      this.togglecomponentBody.emit(false)
    }
  }

  allbibleChapters: any
  getbiblebooks() {
    this.apiService.getBibleBooksChapters(this.SelectedTestament).subscribe(data => {
      this.allbibleChapters = data
      console.log(this.allbibleChapters)
    })
  }

  //  nextBook(){
  //   console.log(this.book)
  //   const nextbook = this.allbibleChapters.find((x:any) => x.BOOK_ABBR == (this.book).toUpperCase());
  //   console.log(nextbook);
  //   // if(nextbook.id)  
  //  }


  bookChapters(book: string) {
    this.chapterListData = []
    this.chapterList = true
    const bookData = this.allbibleChapters.find((x: any) => x.BOOK_ABBR == book)
    console.log(bookData)
    this.book = bookData.BOOK_ABBR
    this.bookFullName = bookData.BOOK
    this.chapterCount = bookData.CHAPTER_COUNT
    for (let i = 1; i <= bookData.CHAPTER_COUNT; i++) {
      // let pushcount = 9
      this.element[i] = i;
      //  if(i <= pushcount){
      this.chapterListData.push(i)
      //  }      
      // console.log(this.element[i]);
    }
  }

  nextBook() {
    let currentBookIndex = this.allbibleChapters.find((x: any) => x.BOOK == this.bookFullName);
    let nextBookIndex = this.allbibleChapters.find((y: any) => y.id == currentBookIndex.id + 1)
    console.log(nextBookIndex)
    if (nextBookIndex != undefined) {
      this.SelectedTestament = nextBookIndex.TESTAMENT
      this.book = nextBookIndex.BOOK_ABBR
      this.bookFullName = nextBookIndex.BOOK,
        this.chapterCount = nextBookIndex.CHAPTER_COUNT;
      this.chapter = 1
      let RecordLimit = 0
      this.apiService.getBible(this.SelectedTestament, this.version, this.book, this.chapter, RecordLimit).subscribe((message) => {
        this.BibleVerses = message;
      })
    }
    this.updateToggle()
  }

  previousBook() {
    let currentBookIndex = this.allbibleChapters.find((x: any) => x.BOOK == this.bookFullName);
    let previousBookIndex = this.allbibleChapters.find((y: any) => y.id == currentBookIndex.id - 1)
    if (previousBookIndex != undefined) {
      this.SelectedTestament = previousBookIndex.TESTAMENT
      this.book = previousBookIndex.BOOK_ABBR
      this.bookFullName = previousBookIndex.BOOK
      this.chapterCount = previousBookIndex.CHAPTER_COUNT;
      this.chapter = 1
      let RecordLimit = 0
      this.apiService.getBible(this.SelectedTestament, this.version, this.book, this.chapter, RecordLimit).subscribe((message) => {
        this.BibleVerses = message;
      })
    }
    this.updateToggle()
  }

  @Output() openCrossRef = new EventEmitter();
  openCrossrefTab(bibleVerseData: any) {
    console.log(bibleVerseData)
    this.apiService.SelectedCrossRefData.next(bibleVerseData)
    this.openCrossRef.emit(true)
  }

  // chapter_no: 1
  // content: "And God said,  “Let there be light,” and there was light."
  // createdAt: null
  // division: "Gen"
  // id: 245446
  // main: "ESV"
  // testament: "OT"
  // topic_no: 1.3

  openCrossrefTabFromSearch(item: any) {
    //   key: "Psa 68:30"
    // preview: " Rebuke 
    console.log(item)
    const topicNumber = (item.key.substr(item.key.indexOf(' ') + 1)).replace(':', '.');
    const data = {
      chapter_no: 1,
      content: item.preview,
      division: item.key.substr(0, item.key.indexOf(' ')),
      main: this.version,
      testament: this.SelectedTestament,
      topic_no: topicNumber
    }
    this.openCrossrefTab(data)
  }


  cr(book: string, verse: any, text: any) {
    console.log(verse)
    const topicNumber = (verse.substr(verse.indexOf(' ') + 1)).replace(':', '.');
    // console.log(verse.substr(0,verse.indexOf(' ')))
    const data = {
      chapter_no: 1,
      content: text,
      division: book,
      main: this.version,
      testament: this.SelectedTestament,
      topic_no: topicNumber
    }
    console.log(data)
    this.openCrossrefTab(data)
  }

  crb(book: string, verse: any, text: any) {
    console.log(book)
    console.log(verse)
    const verseString = JSON.stringify(verse)
    const topicNumber = verseString.split(".")[1];
    console.log(topicNumber)
    const data = {
      chapter_no: verseString.split(".")[0],
      content: text,
      division: book,
      main: this.version,
      testament: this.SelectedTestament,
      topic_no: verseString.split(".")[1]
    }
    console.log(data)
    this.openCrossrefTab(data)
  }
  addtofavlist(main: any, topic_no: any, chapter_no: any, content: any) {
    const body = {
      verse: topic_no,
      meaning: content,
      father_id: localStorage.getItem("father_id"),
      chapter: chapter_no,
      bookName: main,
      personalFavRefId: this.favid
    }

    if (this.favid == null) {
      alert('please select  Favorites List item');
    } else {
      this.apiService.addToPersonalFav(body).subscribe(data => {
        this.message = "Item successfully"
      })
    }

  }
}




export interface Result {
  key: string;
  preview: string;
}