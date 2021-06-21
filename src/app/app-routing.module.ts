import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
// import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { ChatRouteComponent } from './routes/chat-route/chat-route.component';

import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { FlagsRoutingComponent } from './routes/flags/flags.component';
import { JourneyrouteComponent } from './routes/journeyroute/journeyroute.component';
import { RegisterationComponent } from './routes/registeration/registeration.component';
import { ReportsMetricsComponent } from './routes/reports-metrics/reports-metrics.component';
import { UploadsComponent } from './routes/uploads/uploads.component';
import { UserlistComponent } from './routes/userlist/userlist.component';

const routes: Routes = [{ path: 'dashboard', component: DashboardComponent },
{ path: '', component: LoginComponent },
{ path: 'chat', component: ChatRouteComponent },
// {path : 'admin', component : AdminDashboardComponent },
{ path: 'reports', component: ReportsMetricsComponent },
{ path: 'flags', component: FlagsRoutingComponent },
{ path: 'registration', component: RegisterationComponent },
{ path: 'uploads', component: UploadsComponent },
{ path: 'journey', component: JourneyrouteComponent },
{ path: 'userList', component: UserlistComponent }
];

// const routes : Routes =[
//   {    path : 'dashboard', component : DashboardComponent  },
// ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
