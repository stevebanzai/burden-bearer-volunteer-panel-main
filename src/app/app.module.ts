import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatQueueComponent } from './component/navigation-panel/chat-queue/chat-queue.component';
import { ChatHistoryComponent } from './component/navigation-panel/chat-history/chat-history.component';
import { CrossReferenceComponent } from './component/navigation-panel/cross-reference/cross-reference.component';
import { Mp3ClipsComponent } from './component/navigation-panel/mp3-clips/mp3-clips.component';
import { BarnaStatisticsComponent } from './component/navigation-panel/barna-statistics/barna-statistics.component';
import { CalendarComponent } from './component/navigation-panel/calendar/calendar.component';
import { PdfQuotesComponent } from './component/navigation-panel/pdf-quotes/pdf-quotes.component';
import { PersonalFavsComponent } from './component/navigation-panel/personal-favs/personal-favs.component';
import { StrongsComponent } from './component/navigation-panel/strongs/strongs.component';
import { WorkAreaNotesComponent } from './component/navigation-panel/work-area-notes/work-area-notes.component';
import { WorkAreaComponent } from './component/navigation-panel/work-area/work-area.component';
import { BibleComponent } from './component/navigation-panel/bible/bible.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatComponent } from './component/chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DynamicModule } from 'ng-dynamic-component';
import { PositionsService } from './service/positions.service';
import { GridsterModule } from 'angular-gridster2';
import { DynamicIoModule } from 'ng-dynamic-component';
import { JourneyComponent } from './component/journey/journey.component';
import { ReportsmetricsComponent } from './component/reportsmetrics/reportsmetrics.component';
import { FlagsComponent } from './component/flags/flags.component';
import { VolunteerregistrationComponent } from './component/volunteerregistration/volunteerregistration.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BlankComponent } from './blank/blank.component';
import { LustDeceitCoverComponent } from './component/lust-deceit-cover/lust-deceit-cover.component';
import { Mp3pdfetcComponent } from './component/mp3pdfetc/mp3pdfetc.component';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { CalendercomComponent } from './component/navigation-panel/calendercom/calendercom.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { AngularResizedEventModule } from 'angular-resize-event';
import { PdfuploadComponent } from './pdfupload/pdfupload.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { SideMenuComponent } from './component/side-menu/side-menu.component';
import { PlayareaComponent } from './component/playarea/playarea.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { ChatRouteComponent } from './routes/chat-route/chat-route.component';
import { ReportsMetricsComponent } from './routes/reports-metrics/reports-metrics.component';
import { RegisterationComponent } from './routes/registeration/registeration.component';
import { FlagsRoutingComponent } from './routes/flags/flags.component';
import { FlagchatBoxComponent } from './routes/flags/flagchat-box/flagchat-box.component';
import { UploadsComponent } from './routes/uploads/uploads.component';


import { HighchartsChartComponent } from 'highcharts-angular';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { JourneyrouteComponent } from './routes/journeyroute/journeyroute.component';
import { HighlightPipe } from './pipes/highlight.pipe';
import { CarouselDirective } from './component/navigation-panel/personal-favs/caurousel.directive';
import { environment } from 'src/environments/environment';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserListComponent } from './component/user-list/user-list.component';
import { ReversePipe } from './component/volunteerregistration/reverse.pipe';
import { UserlistComponent } from './routes/userlist/userlist.component';
import { ToastrModule } from 'ngx-toastr';
import { TimecalculatePipe } from './pipes/timecalculate.pipe';

const config: SocketIoConfig = { url: environment.SocketUrl, options: {} };

// const config: SocketIoConfig = { url: environment.SocketUrl, options: {} };


@NgModule({
  declarations: [
    AppComponent,
    ChatQueueComponent,
    ChatHistoryComponent,
    CrossReferenceComponent,
    Mp3ClipsComponent,
    BarnaStatisticsComponent,
    CalendarComponent,
    PdfQuotesComponent,
    PersonalFavsComponent,
    StrongsComponent,
    WorkAreaNotesComponent,
    WorkAreaComponent,
    BibleComponent,
    ChatComponent,
    DashboardComponent,
    JourneyComponent,
    ReportsmetricsComponent,
    FlagsComponent,
    VolunteerregistrationComponent,
    BlankComponent,
    LustDeceitCoverComponent,
    Mp3pdfetcComponent,
    AdminDashboardComponent,
    CalendercomComponent,
    LoginComponent,
    PdfuploadComponent,
    SideMenuComponent,
    PlayareaComponent,
    ChatRouteComponent,
    ReportsMetricsComponent,
    RegisterationComponent,
    FlagsRoutingComponent,
    FlagchatBoxComponent,
    UploadsComponent,
    CarouselDirective,
    HighchartsChartComponent,

    DateAgoPipe,

    JourneyrouteComponent,

    HighlightPipe,

    UserListComponent,

    ReversePipe,

    UserlistComponent,

    TimecalculatePipe

  ],
  imports: [CKEditorModule, AngularEditorModule, CommonModule, DragDropModule,
    NgxPaginationModule,NgbModule, ToastrModule.forRoot(),
    BrowserModule, HttpClientModule, FormsModule, DynamicModule, GridsterModule, DynamicIoModule, CalendarModule, ReactiveFormsModule,
    AppRoutingModule, DragDropModule, SocketIoModule.forRoot(config)
  ],
  providers: [PositionsService,DatePipe,TimecalculatePipe],
  bootstrap: [AppComponent]
})
export class AppModule  {



 }
