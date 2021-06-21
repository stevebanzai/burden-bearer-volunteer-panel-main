import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, } from '@angular/core';

import { AuthService } from 'src/app/service/auth.service';
import { ChatService } from 'src/app/service/chat.service';


@Component({
  selector: 'app-calendercom',
  templateUrl: './calendercom.component.html',
  styleUrls: ['./calendercom.component.css']
})
export class CalendercomComponent implements OnInit {
  public dateValue: Date = new Date();
  sechudleselect = false;
  message: any;
  noRecords: boolean = false;
  records: boolean = false;
  cArgs: any;
  listall: any;
  errorMessage = '';
  scheduledate: any;
  father_id: any
  time1: any;
  appType: any;
  iscalender = true;
  UserRoomList: any
  isSuccessful:any
  public todayString = new Date();
  listedDates: SelectedDays[] = [];
  scheduled: any;
  public show: boolean = false;
  public buttonName: any = 'Show';
  schedule_time = "00";
  schedule_minutes = "00";
  minute = "00";
  am = "";
  registerForm: any;
  isShowDiv = true;
  timing = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  minutes = ['00', '15', '30', '45'];
  ampm = ['AM', 'PM']
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  form: any = {
    schedule_minutes: "00",
    ampmvalue: "",
    schedule_time: "00"
  };

  constructor(private authService: AuthService, private http: HttpClient, private cd: ChangeDetectorRef,
    private chatSrvc: ChatService) {
  }
  @Output() thiscalandercom = new EventEmitter();
  ngOnInit() {
    console.log(this.dateValue.getDate());
    this.getallsearch();
    this.getSchedule();

  }

  ScheduleDate(e: any) {
    //console.log(e);
    this.todayString = e.value;
    let date = ((this.todayString.getMonth() + 1) + "/" + this.todayString.getDate() + "/" + this.todayString.getFullYear());
    this.scheduledate = date;
    this.form.schedule_date = this.scheduledate;
    this.father_id = localStorage.getItem("father_id");
    this.authService.search(this.scheduledate, this.father_id).subscribe(

      data => {
        if (data.message == false) {
          this.message = 'No Record Found  !';
          this.noRecords = true;
          this.records = false;
          this.UserRoomList = [];
        }
        else {
          console.log(data);
          this.UserRoomList = data;
          this.noRecords = false;
          this.records = true;
          this.appType = 1;
          //this.markDate();
        }
      },
      err => {
        this.records = false;
        this.noRecords = true;
        this.UserRoomList = [];
        if (this.UserRoomList == this.UserRoomList) {
          this.message = 'No Record Found  !';

        }
        else {
          this.message = 'No Record Found  !';
        }

      });

  }


  stringToDate(_date: any, _format: any, _delimiter: any) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    //let dt : SelectedDays = {day:dayIndex,month:monthIndex,year: yearIndex};
    //this.listedDates.push(dt);
    return formatedDate;
  }

  getSchedule() {
    let date = ((this.todayString.getMonth() + 1) + "/" + this.todayString.getDate() + "/" + this.todayString.getFullYear());
    this.scheduledate = date;
    this.form.schedule_date = this.scheduledate;
    this.father_id = localStorage.getItem("father_id");
    this.authService.getSchedule(this.father_id).subscribe(
      data => {
        let dates = data.dates;
        let days = [];
        let counts: any[] = [];

        for (let i = 0; i < dates.length; i++) {
          counts[dates[i]] = 1 + (counts[dates[i]] || 0);
        /*  console.log(counts[dates[i]]);
          console.log(dates[i]);
        */  days.push({ date: dates[i], count: counts[dates[i]] });
        }

        days.forEach((value: any, index) => {

          var mdt = new Date(value.date);
          var d = mdt.getDate();
          var m = mdt.getMonth() + 1;
          var y = mdt.getFullYear();
          let calDay: SelectedDays = { day: d, month: m, year: y, count: value.count };
          this.listedDates.push(calDay);
        });
        this.scheduled = days;

        localStorage.setItem("CALDATA", JSON.stringify(this.listedDates));
        this.customDates(this.cArgs);

      },
      err => {


      });

  }

  toggleclose() {
    this.thiscalandercom.emit(false);
  }

  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
  }

  onSelect() {
    this.thiscalandercom.emit(false);
  }

  get f() { return this.registerForm.controls; }

  // onSubmit(){
  //   this.form.schedule_date = this.scheduledate;
  //   //this.minute = this.form.schedule_minutes;
  //   //this.am = this.form.ampmvalue;

  //   this.form.schedule_time = this.schedule_time + ":" + this.schedule_minutes + " " + this.am;


  //   this.father_id = localStorage.getItem("father_id");
  //   this.form.father_id = this.father_id;

  //   let roomID = localStorage.getItem("roomId");
  //   if(roomID != null || roomID != "NaN" || roomID != undefined || roomID != ''){
  //     this.form.SCHEDULED_USERID = roomID
  //   }
  //   this.chatSrvc.sendSchedule(this.form)
  // }


  onSubmit() {
    this.form.schedule_date = this.scheduledate;
    //this.minute = this.form.schedule_minutes;
    //this.am = this.form.ampmvalue;

    this.form.schedule_time = this.schedule_time + ":" + this.schedule_minutes + " " + this.am;
    this.father_id = localStorage.getItem("father_id");
    this.form.father_id = this.father_id;

    let roomID = localStorage.getItem("roomId");
    if (roomID != null || roomID != "NaN" || roomID != undefined || roomID != '') {
      this.form.SCHEDULED_USERID = roomID
    }
    console.log(this.form.SCHEDULED_USERID);

    /*console.log(this.form);

this.UserRoomList.push({schedule_time : this.form.schedule_time, schedule_name: this.form.schedule_name});

this.form.schedule_time = "00";
this.form.schedule_minutes = "00";
this.form.ampmvalue = "";*/

    /*
    var mdt = new Date(this.form.schedule_date);
    var d = mdt.getDate();
    var m = mdt.getMonth() + 1;
    var y = mdt.getFullYear();

    let calDay: SelectedDays = { day: d, month: m, year: y, count: 1 };
    this.listedDates.push(calDay);*/

    this.authService.schedule(this.form).subscribe(
      data => {
        this.chatSrvc.sendSchedule(this.form)
        console.log(data)
        this.UserRoomList.push({ schedule_time: this.form.schedule_time, schedule_name: this.form.schedule_name });

        var mdt = new Date(this.form.schedule_date);
        var d = mdt.getDate();
        var m = mdt.getMonth() + 1;
        var y = mdt.getFullYear();
        console.log(mdt);
        let calDay: SelectedDays = { day: d, month: m, year: y, count: 1 };
        console.log(calDay);
        // this.listedDates.push(calDay);

        this.form.schedule_time = "00";
        this.form.schedule_minutes = "00";
        this.form.ampmvalue = "";
        this.schedule_time = "00";
        this.schedule_minutes = "00";
        this.am = "";
        this.form.schedule_name = "";
        this.form.schedule_email = "";

        this.form.comments = "";
        this.getSchedule();
        this.getallsearch();
        this.noRecords = false;
        this.records = true;
        alert("appoiment successfully!");

      },
      err => {
        this.message = 'No Appointment Today!';
      }
    );
  }

  markDate(): void {
    let args = this.cArgs;
    let span: HTMLElement;
    console.log(args.date.getDate() + "   " + this.todayString.getDate());
    span = document.createElement('span');
    span.setAttribute('class', 'e-icons highlight-day');

    if (+args.date.getDate() === 8 && +args.date.getMonth() == 1) {

      //console.log("called inside");
      args.element.appendChild(span);
      if (this.appType === 1) {
        args.element.className = 'single';

        span.setAttribute('class', 'e-icons highlight-day single');
      } else if (this.appType === 1) {
        args.element.className = 'single';
      } else {
        span.setAttribute('class', 'e-icons highlight-day double');
        args.element.className = 'double';
      }

    }

  }

  getallsearch() {
    this.authService.getSchedule(this.father_id).subscribe(data => {
      this.listall = data;
      this.customDates(this.cArgs);
      this.cd.detectChanges();
    })
  }

  customDates(args: any): void {
    this.listedDates = JSON.parse(localStorage.getItem("CALDATA") || '');
    // console.log(this.listedDates);
    this.cArgs = args;
    let span: HTMLElement;
    this.listedDates.forEach(element => {

      if (+args.date.getDate() === element.day && +args.date.getMonth() + 1 === element.month && +args.date.getYear() + 1900 === element.year) {
        //  console.log(JSON.stringify(element) + "  " + +args.date.getYear());
        let spans = args.element.getElementsByTagName("span");
        if (args.element.classList.contains('e-other-month')) {

        } else {
          if (element.count == 1) {
            args.element.classList.add('e-highlightsingle');
          } else {
            args.element.classList.add('e-highlightdouble');
          }
        }
      } else {

      }
    });
  }

}

export interface SelectedDays {
  day: number,
  month: number,
  year: number,
  count: number,
}
