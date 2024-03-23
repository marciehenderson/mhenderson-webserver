import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './page-home.component.html',
  styleUrl: './page-home.component.scss'
})
export class PageHomeComponent {

}
