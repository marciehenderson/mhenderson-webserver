import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            RouterLink,
            RouterLinkActive,
            CommonModule,
            MatIconModule,
            MatButtonModule,
            MatToolbarModule,
            MatMenuModule,
            MatSidenavModule,
            MatSlideToggleModule,
            FormsModule,
           ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title:string;
  themeClass:string;
  themeMode:boolean;
  themeLabel:string;
  constructor() {
    this.title = 'Marcie Henderson';
    this.themeClass = 'dark-theme';
    this.themeMode = true;
    this.themeLabel = 'Dark Theme';

    var themeLocal = localStorage.getItem('theme') || '{}';

    if(themeLocal === 'light-theme'){
      this.themeMode = false;
      this.themeClass = 'light-theme';
      this.themeLabel = 'Light Theme';
    }
    else{
      localStorage.setItem('theme', 'dark-theme');

      if(window.matchMedia('(prefers-color-scheme:light)').matches){
        localStorage.setItem('theme', 'light-theme');
        this.themeMode = false;
      }
    }
  }

  updateThemeMode(): void {
    if(this.themeMode){
      this.themeClass = 'dark-theme';
      this.themeLabel = 'Dark Theme';
    }
    else{
      this.themeClass = 'light-theme';
      this.themeLabel = 'Light Theme';
    }
    localStorage.setItem('theme', this.themeClass);
  }
}
