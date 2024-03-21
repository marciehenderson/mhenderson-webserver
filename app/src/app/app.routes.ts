import { Routes } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

export const routes: Routes = [
  {path: 'navigation-bar-component', component: NavigationBarComponent},
  {path: '**', component: PageNotFoundComponent},
];
