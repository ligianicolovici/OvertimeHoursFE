import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClockComponent} from './clock/clock.component';
import {RecordTableComponent} from './record-table/record-table.component';
import {RecordFormComponent} from './record-form/record-form.component';
import {MenuComponent} from './menu/menu.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: 'home',
        pathMatch: 'full',
        component: ClockComponent
      },
      {
        path: 'overview',
        pathMatch: 'full',
        component: RecordTableComponent,
      },
      {
        path: 'record/:mode',
        component: RecordFormComponent,

      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
