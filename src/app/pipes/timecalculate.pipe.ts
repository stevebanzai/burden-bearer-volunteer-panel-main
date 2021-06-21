import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timecalculate'
})
export class TimecalculatePipe implements PipeTransform {

  transform(value: any, lastTime?: any): any {



    var date1 = new Date(value);
    var date2 = new Date(lastTime);
    var diff = date2.getTime() - date1.getTime();
    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 *60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;
    return (hh + ":" + mm + ":" + ss);



















    // if (value) {
    //     const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
    //     if (seconds < 29) // less than 30 seconds ago will show as 'Just now'
    //         return 'Just now';
    //     const intervals:any = {
    //         'year': 31536000,
    //         'month': 2592000,
    //         'week': 604800,
    //         'day': 86400,
    //         'hour': 3600,
    //         'minute': 60,
    //         'second': 1
    //     };
    //     let counter;
    //     for (const i in intervals) {
    //         counter = Math.floor(seconds / intervals[i]);
    //         if (counter > 0)
    //             if (counter === 1) {
    //                 return counter + ' ' + i + ' ago'; // singular (1 day ago)
    //             } else {
    //                 return counter + ' ' + i + 's ago'; // plural (2 days ago)
    //             }
    //     }
    // }
    // return value;
}

}
