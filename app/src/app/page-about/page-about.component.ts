import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-page-about',
  standalone: true,
  imports: [MatTabsModule,
            MatCardModule,],
  templateUrl: './page-about.component.html',
  styleUrl: './page-about.component.css'
})
export class PageAboutComponent {

}
