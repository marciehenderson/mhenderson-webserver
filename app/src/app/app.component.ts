// all imported modules
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
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
            MatButtonToggleModule,
            MatListModule,
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

  // app constructor
  constructor() {
    // initialize attrinutes
    this.title = 'Marcie Henderson';
    // theme element class (dark-theme, light-theme)
    this.themeClass = 'dark-theme';
    // theme mode flag (true = dark, false = light)
    this.themeMode = true;
    // theme label (Dark Theme, Light Theme)
    this.themeLabel = 'bedtime';

    // check local storage variables
    var themeLocal = localStorage.getItem('theme') || '{}';

    // initialize app theme based on local storage variables or system preference
    if(themeLocal === 'light-theme'){
      this.themeMode = false;
      this.themeClass = 'light-theme';
      this.themeLabel = 'sunny';
    }
    else{
      localStorage.setItem('theme', 'dark-theme');
      // check for system preference, otherwise use default dark theme
      if(window.matchMedia('(prefers-color-scheme:light)').matches){
        localStorage.setItem('theme', 'light-theme');
        this.themeMode = false;
      }
    }
  }

  // callback for theme switcher
  updateThemeMode(): void {
    // selects theme class and label based on mode flag
    if(this.themeClass !== 'dark-theme'){
      this.themeClass = 'dark-theme';
      this.themeLabel = 'bedtime';
    }
    else{
      this.themeClass = 'light-theme';
      this.themeLabel = 'sunny';
    }
    localStorage.setItem('theme', this.themeClass);
  }
}
