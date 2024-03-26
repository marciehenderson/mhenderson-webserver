import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-page-contact',
  standalone: true,
  imports: [MatCardModule,
            MatDividerModule,
            MatListModule,
            MatIconModule,
           ],
  templateUrl: './page-contact.component.html',
  styleUrl: './page-contact.component.scss'
})
export class PageContactComponent {

}
