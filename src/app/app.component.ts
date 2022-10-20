import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'etestProject';

  constructor()
  {
    //create operator credentials
    if(!localStorage.getItem("operator"))
      localStorage.setItem("operator", '{"username": "admin", "password": "admin"}');      
  }
}
