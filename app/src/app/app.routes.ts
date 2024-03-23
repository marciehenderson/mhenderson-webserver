import { Routes } from '@angular/router';
import { PageAboutComponent } from './page-about/page-about.component';
import { PageHomeComponent } from './page-home/page-home.component'

export const routes: Routes = [
  {path: 'about', component: PageAboutComponent},
  {path: '', component: PageHomeComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];
