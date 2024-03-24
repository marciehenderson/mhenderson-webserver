import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [MatCardModule,
            MatDividerModule,
            MatIconModule,
            MatButtonModule,
           ],
  templateUrl: './page-home.component.html',
  styleUrl: './page-home.component.scss'
})
export class PageHomeComponent {
  // page home attributes
  iconName:string;

  // page home constructor
  constructor() {
    this.iconName = "wifi_protected_setup";
  }

  // sentiment change function
  updateRandomIcon():string {
    let options = [ "favorite", "sunny", "dark_mode", "ac_unit", "bug_report", "celebration", "cloud", "coffee"];
    let name = options[Math.floor(Math.random() * 8)];
    if(name === this.iconName){
      name = this.updateRandomIcon();
    }
    this.iconName = name;
    return name;
  }
}
