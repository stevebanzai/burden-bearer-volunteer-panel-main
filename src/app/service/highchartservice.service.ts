// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class HighchartserviceService {

//   constructor() { }
// }


import { ElementRef, Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
  
@Injectable({
  providedIn: 'root'
})
export class HighchartserviceService {

//   charts = [];
//   defaultOptions = {
//     chart: {
//         plotBackgroundColor: null,
//         plotBorderWidth: null,
//         plotShadow: false,
//         type: 'pie'
//     },
//     title: {
//         text: 'Browser market shares in January, 2018'
//     },
//     tooltip: {
//         pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
//     },
//     plotOptions: {
//         pie: {
//             allowPointSelect: true,
//             cursor: 'pointer',
//             dataLabels: {
//                 enabled: true,
//                 format: '<b>{point.name}</b>: {point.percentage:.1f} %',
//                 style: {
//                     color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
//                 }
//             },
//             showInLegend: true
//         }
//     },
//     series: [{
//         name: 'Brands',
//         colorByPoint: true,
//         data: [{
//             name: 'Chrome',
//             y: 61.41
//         }, {
//             name: 'Internet Explorer',
//             y: 11.84
//         }, {
//             name: 'Firefox',
//             y: 10.85
//         }, {
//             name: 'Edge',
//             y: 4.67
//         }, {
//             name: 'Safari',
//             y: 4.18
//         }, {
//             name: 'Other',
//             y: 2.61
//         }]
//     }]
// }

  constructor() {
  }
  
  // createChart(container :any, options?: Object) {
  //   let opts = this.defaultOptions;
  //   console.log(opts)
  //   let e = document.createElement("div");
  //   console.log(e)
    
  //   container.appendChild(e);
    
  //   if(opts.chart) {
  //    // opts.chart['renderTo'] = e;
  //   }
  //   Highcharts.chart(container, opts);
  // }

  burdenBearing:any =0
  Adhoc:any =0
  Gospel:any =0
  salvation:any=0 
  NonResponsive:any=0 
  OtherChatComment:any =0

  highcharts = Highcharts;
  defaultOptions = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares in January, 2018'
    },
    tooltip: {
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
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
}

}

