import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-work-area',
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.css']
})
export class WorkAreaComponent implements OnInit {

  iswrokarea = true;
  JourneyName: any;
  verseSection = true
  pdfSection = true
  mp3Section = true;
  showMessageBox = false;
  @Output() workAreaoutput = new EventEmitter();
  IsCollapse: boolean = false
  @Output() collapework = new EventEmitter();
  message: any;
  list: any;
  father_id: any;
  room: any;
  name: any;
  somefunction() {
    this.IsCollapse = !this.IsCollapse;
    this.collapework.emit(this.IsCollapse);
  }

  constructor(private authservice: AuthService, private chatservice: ChatService) {
    this.father_id = localStorage.getItem("father_id");
    this.getworkAreaFromBible();
  }

getworkAreaFromBible(){
  this.authservice.AddtoworkAreaBibleVerse.subscribe(data=>{
    this.getworkarea();
  })
}


  ngOnInit() {
    this.getworkarea();
    this.room = localStorage.getItem("roomId");
    this.name = localStorage.getItem("adminname");
  }

  toggleclose() {
    this.workAreaoutput.emit(false);
  }

  getworkarea() {    
    console.log('hello')
    this.authservice.workarealist(this.father_id).subscribe(data=> {
      console.log(data);
      this.list = data
    },
    error => {
      console.log(error);
    });
  }
  deleteworknote(id: any): void {
    // alert(id);
    this.authservice.WorkAreadelete(id).subscribe(
      response => {
        this.getworkarea();
        console.log(response);
        let msg = 'work note removed';
        this.showAlert(msg, '#fd2626');
      },
      error => {
        this.message = 'NO Record Found!';
        console.log(error);
      });
  }
  deleteall() {
    if (confirm("do u want to clear work area..?")) {

      this.authservice.deleteallWorkAreaNote().subscribe(
        response => {
          this.getworkarea()
          console.log(response);
          let msg = 'All work notes removed';
          this.showAlert(msg, '#fd2626');
        },
        error => {
          let msg = 'NO Record Found!';
          console.log(error);
        });
    }

  }

  toggleSection(sectionName: string) {
    if (sectionName == 'verseSection') {
      this.verseSection = !this.verseSection
    }
    if (sectionName == 'pdfSection') {
      this.pdfSection = !this.pdfSection
    }
    if (sectionName == 'mp3Section') {
      this.mp3Section = !this.mp3Section
    }
  }

  saveJourney() {
    if (this.JourneyName == undefined || this.JourneyName == '') {
      let msg = "Type a name to save your journey";
      this.showAlert(msg, '#fd2626');
    }
    else {
    

        if (this.list != 0) {
          const body = {
            JOUNEY_NAME: this.JourneyName,
            FATHER_ID: this.father_id
          };
          this.authservice.saveJorney(body).subscribe(data => {
            console.log(data)
            this.getworkarea();
            let msg = this.JourneyName +" "+ "saved successfully..!";
            this.showAlert(msg, '#87dc34');
            this.JourneyName = '';
          })
        } else {
          alert("nothing to save")
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


  @Input() DynamicInputs: number = 0
  ngOnChanges() {
    console.log(this.DynamicInputs)
    this.ngOnInit()
  }

  sendmsg(meaning: any, content_type: any, url: any) {
    var SendContent = {
      meaning: meaning,
      content_type: content_type,
      url: url
    }
    this.chatservice.SendScripture(
      { scripture: SendContent }
    );
  }


}
