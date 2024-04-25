import { Component,HostListener } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Result_Managemnet_Application';


  @HostListener('window:popstate', ['$event'])
  onPopState() {
    //console.log('Back button pressed');
    //Here you can handle your modal
    location.reload();
  }
}


