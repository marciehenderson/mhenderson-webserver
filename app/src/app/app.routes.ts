import { Routes } from '@angular/router';
import { PageAboutComponent } from './page-about/page-about.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageContactComponent } from './page-contact/page-contact.component';

export const routes: Routes = [
  {path: 'contact', title: 'Marcie Henderson - Contact', component: PageContactComponent},
  {path: 'about', title: 'Marcie Henderson - About', component: PageAboutComponent},
  {path: '', title: 'Marcie Henderson - Home', component: PageHomeComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];
