import { Routes } from '@angular/router';
import { PageAboutComponent } from './page-about/page-about.component'

export const routes: Routes = [
  {path: 'about', component: PageAboutComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];
