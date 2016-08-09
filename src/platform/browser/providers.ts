/*
 * These are globally available services in any component or any other service
 */

// Angular 2
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// Angular 2 Http
import { HTTP_PROVIDERS } from '@angular/http';
// Angular 2 Router
import { provideRouter, RouterConfig }  from '@angular/router';
// components
import * as components from 'components';
import { CanDeactivateGuard } from 'services';

export const routes = [
  // { path: '', redirectTo: '/login-min' },
  { path: 'login-min', component: components.LoginMinComponent },
  { path: 'register', component: components.RegisterComponent },
  { path: 'forget-pwd', component: components.ForgetPwdComponent },
  { path: 'init-store', component: components.InitStoreComponent },

  { path: 'survey-pc', component: components.SurveyPcComponent },
  { path: 'survey-mobile', component: components.SurveyMobileComponent },
  { path: 'dashbroad',component: components.DashbroadComponent,
    children: [
      { path: 'my-account', component: components.MyAccountComponent },
      { path: 'modify-store', component: components.ModifyStoreComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'add-store', component: components.AddStoreComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'modify-pwd', component: components.ModifyPwdComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'employee-add', component: components.EmployeeAddComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'employee-edit', component: components.EmployeeEditComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'employee-list', component: components.EmployeeListComponent },
      { path: 'customer-add', component: components.CustomerAddComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'customer-edit', component: components.CustomerEditComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'customer-detail', component: components.CustomerDetailComponent },
      { path: 'customer-list', component: components.CustomerListComponent },
      { path: 'search-list', component: components.SearchListComponent },
      { path: 'report/week/business', component: components.ReportWeekBusinessComponent },
      { path: 'report/week/satisfaction', component: components.ReportWeekSatisfactionComponent },
      { path: 'business-add', component: components.BusinessAddComponent },
      { path: 'business-list', component: components.BusinessListComponent }
    ]
   }
];


import { MissionService,AuthGuard,AuthService } from 'services';

/*
* Application Providers/Directives/Pipes
* providers/directives/pipes that only live in our browser environment
*/
export const APPLICATION_PROVIDERS = [
  // new Angular 2 forms
  disableDeprecatedForms(),
  provideForms(),

  provideRouter(routes),
  provideWebpack(asyncRoutes),
  providePrefetchIdleCallbacks(prefetchRouteCallbacks),
  MissionService,
  AuthGuard,
  AuthService,
  ...HTTP_PROVIDERS,
  { provide: LocationStrategy, useClass: HashLocationStrategy },
];

export const PROVIDERS = [

  ...APP_ROUTE_PROVIDERS,
  ...APPLICATION_PROVIDERS,
  CanDeactivateGuard
];
