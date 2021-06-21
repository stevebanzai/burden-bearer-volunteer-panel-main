import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GridsterConfig, GridsterItem, CompactType, GridsterItemComponentInterface } from 'angular-gridster2';

import { ReportsmetricsComponent } from 'src/app/component/reportsmetrics/reportsmetrics.component';
import { PositionsService } from 'src/app/service/positions.service';

import * as Highcharts from 'highcharts';
import { HighchartserviceService } from 'src/app/service/highchartservice.service';
import { AuthService } from 'src/app/service/auth.service';
import { formatDate } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-reports-metrics',
  templateUrl: './reports-metrics.component.html',
  styleUrls: ['./reports-metrics.component.css']
})
export class ReportsMetricsComponent implements OnInit {

  component15 = ReportsmetricsComponent;
  options?: GridsterConfig;
  loaded = false;


  dataLoaded = false
  burdenBearing: any = 0
  Adhoc: any = 0
  Gospel: any = 0
  salvation: any = 0
  NonResponsive: any = 0
  OtherChatComment: any = 6


  allVolunteers: any
  selectedVolunteer: any = "Select One"
  selectedVolunteerWeek: any = "Select One"

  // currentDate = new Date();
  // currentDateTime = new Date();
  currentDateTime1= moment.utc().format('yyyy-MM-DD HH:mm:ss')

   currentDateTime = formatDate(new Date(), 'yyyy-MM-dd 00:00:00', 'en');

  perviousDate = new Date(this.currentDateTime);
  previousDay = this.perviousDate.setDate(this.perviousDate.getDate() - 1);
  pxDate = formatDate(this.previousDay, 'yyyy-MM-dd 00:00:00', 'en');

  currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  nextDay = new Date(this.currentDate);
  nextDate = this.nextDay.setDate(this.nextDay.getDate() + 1);
  nxDate = formatDate(this.nextDate, 'yyyy-MM-dd 00:00:00', 'en');
  // add a day


  volunteer_id: any

  constructor(private router: Router, private positionServc: PositionsService,
    private chartService: HighchartserviceService, private elRef: ElementRef, private apisrvc: AuthService) {
    console.log(this.currentDateTime)
    console.log(this.nxDate)
  }

  ngOnInit(): void {
    this.volunteer_id = localStorage.getItem("father_id")

    this.gridsterInit();
    // this.createChart()
    this.getChartDispositionData();
    this.getAllCouncellors()
    this.prevWeekDatefcn()

    this.getlastmonthsDate()

    this.GetFlaggedChats()
  }

  prevWeekDate: any

  prevWeekDatefcn() {
    var date = new Date();
    date.setDate(date.getDate() - 7);
    // var finalDate = date.getDate()+'/'+ (date.getMonth()+1) +'/'+date.getFullYear();
    var finalDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();

    console.log(finalDate)
    this.prevWeekDate = formatDate(finalDate, 'yyyy-MM-dd 00:00:00', 'en');
    console.log(this.prevWeekDate)

  }

  monthStartDate: any
  monthEndDate: any

  getlastmonthsDate() {
    var date = new Date(), year = date.getFullYear(), month = date.getMonth();
    this.monthStartDate = formatDate(new Date(year, month, 1), 'yyyy-MM-dd 00:00:00', 'en');
    // new Date(year, month, 1);
    this.monthEndDate = formatDate(new Date(year, month + 1, 0), 'yyyy-MM-dd 00:00:00', 'en');
    // new Date(year, month + 1, 0);
    //  console.log(firstDay)
    //  console.log(lastDay)
    //  console.log()   

  }




  navigate(route: any) {
    this.router.navigateByUrl(route)

  }

  gridsterInit() {
    this.options = {
      fixedRowHeight: 120,
      gridType: 'fixed',
      compactType: CompactType.None,
      margin: 5,
      outerMargin: false,
      minRows: 1,
      maxRows: 100,
      minItemRows: 1,
      maxItemRows: 50,
      defaultItemRows: 3,
      minCols: 3,
      maxCols: 90,
      maxItemCols: 100,
      fixedColWidth: 100,
      enableEmptyCellClick: false,
      minItemCols: 1,
      defaultItemCols: 1,
      maxItemArea: 250,
      minItemArea: 1,
      swap: true,
      displayGrid: 'onDrag&Resize',
      // compactType: 'none', // 'compactUp&Left',compactLeft&Up'
      pushItems: true,
      resizable: { enabled: true },
      draggable: {
        enabled: true
      },
      // itemChangeCallback: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => this.itemChange(item, itemComponent),
      // itemResizeCallback: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => this.itemResize(item, itemComponent),
    };

    // this.dashboard = [
    //   { x: 0, y: 0, cols: 3, rows: 5 }
    // ]

    // hiding the gridster untill positions are loaded
    this.loaded = false;

    this.positionServc.getPositions().subscribe((positions) => {
      //this.dashboard = positions;
      console.log(positions)
      this.loaded = true
    })
    // this.getPositionsFromLS();
  }


  // data = [{
  //         name: 'ItSolutionStuff.com',
  //         data: [500, 700, 555, 444, 777, 877, 944, 567, 666, 789, 456, 654]
  //      },
  //     //  {
  //     //     name: 'Nicesnippets.com',
  //     //     data: [677, 455, 677, 877, 455, 778, 888, 567, 785, 488, 567, 654]
  //     //  }
  //     ];

  highcharts = Highcharts;
  defaultOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'CHAT DISPOSITIONS'
    },
    // tooltip: {
    //     pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    // },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          // style: {
          //     color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          // }
        },
        showInLegend: true
      }
    },
    series: [{
      name: 'Brands',
      colorByPoint: true,
      data: [{
        name: 'Burden Bearing',
        y: 0
      }, {
        name: 'Ad-hoc spiritual conversation',
        y: 0
      }, {
        name: 'Gospel presentation',
        y: 0
      }, {
        name: 'Assurance of salvation',
        y: 0
      }, {
        name: 'Non-responsive/Bounce',
        y: 0
      }, {
        name: 'Other',
        y: 0
      }]
    }]
  }


  // Burden Bearing
  // Ad-hoc spiritual conversation 
  // Gospel presentation
  // Assurance of salvation
  // Non -responsive/Bounce
  // Other




  getChartDispositionData() {
    this.apisrvc.getDispositionData("Burden Bearing").subscribe(data => {
      this.burdenBearing = data
      if (data) {
        this.apisrvc.getDispositionData("Ad-hoc spiritual conversation").subscribe(data1 => {
          this.Adhoc = data1
          if (data1) {
            this.apisrvc.getDispositionData("Gospel presentation").subscribe(data2 => {
              this.Gospel = data2
              if (data2) {
                this.apisrvc.getDispositionData("Assurance of salvation").subscribe(data3 => {
                  this.salvation = data3
                  if (data3) {
                    this.apisrvc.getDispositionData("Non-responsive").subscribe(data4 => {
                      this.NonResponsive = data4
                      if (data4) {
                        this.apisrvc.getDispositionData("others").subscribe(data => {
                          this.OtherChatComment = data
                          this.dataLoaded = true
                          this.defaultOptions.series = [{
                            name: 'Brands',
                            colorByPoint: true,
                            data: [{
                              name: 'Burden Bearing',
                              y: this.burdenBearing.length
                            }, {
                              name: 'Ad-hoc spiritual conversation',
                              y: this.Adhoc.length
                            }, {
                              name: 'Gospel presentation',
                              y: this.Gospel.length
                            }, {
                              name: 'Assurance of salvation',
                              y: this.salvation.length
                            }, {
                              name: 'Non-responsive/Bounce',
                              y: this.NonResponsive.length
                            }, {
                              name: 'Other',
                              y: this.OtherChatComment.length
                            }]
                          }]

                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });







  }

  // getChartDispositionData(){
  //   this.apisrvc.getDispositionData("Burden Bearing").subscribe(data => {
  //     this.burdenBearing = data
  //   });
  //    this.apisrvc.getDispositionData("Ad-hoc spiritual conversation").subscribe(data => {
  //     this.Adhoc= data
  //   });
  //    this.apisrvc.getDispositionData("Gospel presentation").subscribe(data => {
  //     this.Gospel = data
  //   });
  //    this.apisrvc.getDispositionData("Assurance of salvation").subscribe(data => {
  //     this.salvation = data
  //   });
  //    this.apisrvc.getDispositionData("Non-responsive").subscribe(data => {
  //     this.NonResponsive =data
  //   });
  //    this.apisrvc.getDispositionData("others").subscribe(data => {
  //     this.OtherChatComment =data
  //   });
  //   this.dataLoaded = true

  // }



  getAllCouncellors() {
    this.apisrvc.getAllCouncellors().subscribe(data => {
      this.allVolunteers = data
      console.log(this.allVolunteers);
    })
  }

  CurrentDayChatRecords: any
  timeAray: any[] = [];
  // RoomExitTimeArray:any=[]

  getTodaysChat() {
  
    console.log(this.selectedVolunteer)
    this.BBStatToday = true;
    this.BBStatweek = false;
    this.BBStatMonth = false;
    this.timeAray = []
    this.apisrvc.getcurrentDayAllChatRecords(this.pxDate, this.currentDateTime1, this.selectedVolunteer).subscribe(data => {
      this.CurrentDayChatRecords = data;
      console.log(this.CurrentDayChatRecords)
      console.log(this.CurrentDayChatRecords[1].element);

      for (let i = 0; i < this.CurrentDayChatRecords.length; i++) {
        const createdTime = new Date(this.CurrentDayChatRecords[i].createdAt) // Parses a ISO 8601 Date
        const updatedTime = new Date(this.CurrentDayChatRecords[i].updatedAt) // Parses a ISO 8601 Date
        const chatstartTimeOnly = this.addZero(createdTime.getUTCHours()) + '.' + this.addZero(createdTime.getUTCMinutes())
        const chatEndTimeOnly = this.addZero(updatedTime.getUTCHours()) + '.' + this.addZero(updatedTime.getUTCMinutes())
        console.log(chatstartTimeOnly);
        console.log(chatEndTimeOnly)
        // const totalChattTime:number = this.timeStringToFloat(chatEndTimeOnly) -  this.timeStringToFloat(chatstartTimeOnly)
        const totalChattTime = parseFloat(chatEndTimeOnly) - parseFloat(chatstartTimeOnly)
        const tCt = (totalChattTime)
        console.log("chatb result",tCt)
        this.timeAray.push(tCt)
        // this.createdDayTimeArray.push(createdTime.getUTCHours() + ':' + createdTime.getUTCMinutes())
        // this.RoomExitTimeArray.push(createdDate.getUTCHours() + ':' + createdDate.getUTCMinutes())
      }
      this.sumArray()
    })

    console.log(this.timeAray)
  }

  addZero(i: any) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  timeStringToFloat(time: any) {
    var hoursMinutes = time.split(/[.:]/);

    var hours = parseInt(hoursMinutes[0], 10);

    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;

    return parseFloat(hours + "." + minutes)
    // return hours + minutes / 60;
  }


  averageTime() {
    var sum = this.timeAray.reduce((acc: any, cur: any) => acc + cur, 0);
    console.log(sum)
  }

  averageChatTime: number = 0
  sumArray() {
    let sum = 0
    console.log(this.timeAray.length)
    for (let i = 0; i < this.timeAray.length; i++) {
      sum = sum + this.timeAray[i]
      console.log(this.timeAray[i])
    }
    console.log(sum)

    this.averageChatTime = sum / this.timeAray.length
  }



  getWeeklyChatRecords() {
    this.BBStatToday = false;
    this.BBStatweek = true;
    this.BBStatMonth = false;
    this.timeAray = []
    console.log(this.selectedVolunteer);
    this.apisrvc.getcurrentDayAllChatRecords(this.prevWeekDate, this.currentDateTime, this.selectedVolunteer).subscribe(data => {
      this.CurrentDayChatRecords = data;
      console.log(this.CurrentDayChatRecords);
      // const d = new Date('1970-01-01T09:30:00.000Z') // Parses a ISO 8601 Date
      // console.log(d.getUTCHours() + ':' + d.getUTCMinutes());
      for (let i = 0; i < this.CurrentDayChatRecords.length; i++) {
        const createdTime = new Date(this.CurrentDayChatRecords[i].createdAt); // Parses a ISO 8601 Date
        const updatedTime = new Date(this.CurrentDayChatRecords[i].updatedAt); // Parses a ISO 8601 Date
        const chatstartTimeOnly = this.addZero(createdTime.getUTCHours()) + '.' + this.addZero(createdTime.getUTCMinutes());
        const chatEndTimeOnly = this.addZero(updatedTime.getUTCHours()) + '.' + this.addZero(updatedTime.getUTCMinutes());
        console.log(chatstartTimeOnly);
        console.log(chatEndTimeOnly);
        // const totalChattTime:number = this.timeStringToFloat(chatEndTimeOnly) -  this.timeStringToFloat(chatstartTimeOnly)
        const totalChattTime = parseFloat(chatEndTimeOnly) - parseFloat(chatstartTimeOnly);
        const tCt = (totalChattTime);
        console.log(tCt);
        this.timeAray.push(tCt);
        // this.createdDayTimeArray.push(createdTime.getUTCHours() + ':' + createdTime.getUTCMinutes())
        // this.RoomExitTimeArray.push(createdDate.getUTCHours() + ':' + createdDate.getUTCMinutes())
      }
      this.sumArray();
    })


  }


  getMonthlyChatRecords() {
    this.BBStatToday = false;
    this.BBStatweek = false;
    this.BBStatMonth = true;

    this.timeAray = []
    console.log(this.selectedVolunteer)
    this.apisrvc.getcurrentDayAllChatRecords(this.monthStartDate, this.monthEndDate, this.selectedVolunteer).subscribe(data => {
      this.CurrentDayChatRecords = data
      console.log(this.CurrentDayChatRecords)
    
      for (let i = 0; i < this.CurrentDayChatRecords.length; i++) {
        const createdTime = new Date(this.CurrentDayChatRecords[i].createdAt); // Parses a ISO 8601 Date
        const updatedTime = new Date(this.CurrentDayChatRecords[i].updatedAt); // Parses a ISO 8601 Date
        const chatstartTimeOnly = this.addZero(createdTime.getUTCHours()) + '.' + this.addZero(createdTime.getUTCMinutes());
        const chatEndTimeOnly = this.addZero(updatedTime.getUTCHours()) + '.' + this.addZero(updatedTime.getUTCMinutes());
        console.log(chatstartTimeOnly);
        console.log(chatEndTimeOnly);
        // const totalChattTime:number = this.timeStringToFloat(chatEndTimeOnly) -  this.timeStringToFloat(chatstartTimeOnly)
        const totalChattTime = parseFloat(chatEndTimeOnly) - parseFloat(chatstartTimeOnly);

        const tCt = (totalChattTime);
      
        this.timeAray.push(tCt);
        // this.createdDayTimeArray.push(createdTime.getUTCHours() + ':' + createdTime.getUTCMinutes())
        // this.RoomExitTimeArray.push(createdDate.getUTCHours() + ':' + createdDate.getUTCMinutes())
      }
      this.sumArray();
    })

    console.log(this.timeAray);
  }
  BBStatToday: boolean = true
  BBStatweek: boolean = false
  BBStatMonth: boolean = false


  toggleBBStatsTabs(selectedDuration: number) {
    this.selectedVolunteer = ""

    if (selectedDuration == 1) {
      this.BBStatToday = true;
      this.BBStatweek = false;
      this.BBStatMonth = false;
      alert(1)
    }
    if (selectedDuration == 7) {
      this.BBStatToday = false;
      this.BBStatweek = true;
      this.BBStatMonth = false;
      console.log(this.allVolunteers)
    }
    if (selectedDuration == 30) {
      this.BBStatToday = false;
      this.BBStatweek = false;
      this.BBStatMonth = true;
    }

  }


  flaggedChats: any

  dailyFlagtab = true
  weeklyflagTab = false
  monthlyflagtab = false
  GetFlaggedChats() {

    this.dailyFlagtab = true
    this.weeklyflagTab = false
    this.monthlyflagtab = false

    this.apisrvc.getFaggedchats(this.currentDateTime, this.nxDate).subscribe(data => {
      this.flaggedChats = data
      console.log(this.flaggedChats)
    })
  }

  getweeklyFlaggedChats() {
    this.dailyFlagtab = false
    this.weeklyflagTab = true
    this.monthlyflagtab = false

    this.apisrvc.getFaggedchats(this.prevWeekDate, this.currentDateTime).subscribe(data => {
      this.flaggedChats = data
      console.log(this.flaggedChats)
    })
  }

  getMonthlylyFlaggedChats() {
    this.dailyFlagtab = false
    this.weeklyflagTab = false
    this.monthlyflagtab = true

    this.apisrvc.getFaggedchats(this.monthStartDate, this.monthEndDate).subscribe(data => {
      this.flaggedChats = data
      console.log(this.flaggedChats)
    })
  }
  iscollapsed = false
  toggleSidebar() {
    this.iscollapsed = !this.iscollapsed
  }

}
